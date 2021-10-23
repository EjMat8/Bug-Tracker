const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../util/catchAsync");
const nodemailer = require("nodemailer");

const AppError = require("../util/appError");

const jwtTokenSign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendTokenCookie = (user, statusCode, res) => {
  const token = jwtTokenSign(user._id);
  const cookieOp = {
    expiresIn:
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOp.secure = true;
  user.password = undefined;
  res.cookie("jwt", token, cookieOp);
  res.status(statusCode).json({ status: "success", token, data: { user } });
};
const confirmPass = (pass, passConfirm) =>
  passConfirm.trim() && pass.trim() === passConfirm.trim();

exports.signup = catchAsync(async (req, res, next) => {
  const { email, name, password, passwordConfirm = null } = req.body;

  if (!confirmPass(password, passwordConfirm))
    return next(new AppError("Password does not match!", 400));

  const newUser = await User.create({ email, name, password });

  sendTokenCookie(newUser, 201, res);
});

exports.protectRoute = (persist = false) =>
  catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.includes("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      if (!persist) return next(new AppError("You are not logged in.", 401));
      else res.status(200).json({ status: "success" });
    }

    const verifiedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(verifiedToken.id);
    if (!user) return next(new AppError("Could not find user", 401));

    if (!user.checkPassChanged(verifiedToken.iat))
      return next(
        new AppError("Password was recently changed please log in again", 401)
      );
    req.user = user;
    next();
  });

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please enter an email and a password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password)))
    return next(new AppError("Invalid Email or Password", 401));

  sendTokenCookie(user, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new AppError("User does not exist", 400));

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOp = {
    from: "Ej <ej@ej.com>",
    to: email,
    subject: "Password Reset (valid for 10 mins)",
    text: `Come here to http://localhost:3001/api/users/resetPassword/${resetToken}`,
  };

  try {
    await transporter.sendMail(mailOp);
    res
      .status(200)
      .json({ status: "success", message: "Token sent to your email" });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("Error sending email", 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password, passwordConfirm } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Token is invalid or expired"), 400);

  if (!confirmPass(password, passwordConfirm))
    return next(new AppError("Password does not match"), 400);

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res
    .status(200)
    .json({ status: "success", message: "Password was successfully changed." });
});

exports.restrictTo = (...roles) =>
  catchAsync(async (req, _, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("You have no permission to access this!", 403));
    next();
  });

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent, password, passwordConfirm } = req.body;

  if (!password.trim() || !passwordConfirm.trim() || !passwordCurrent.trim())
    return next(new AppError("Check your inputs carefully", 400));
  const user = await User.findById(req.user._id).select("+password");
  if (!confirmPass(password, passwordConfirm))
    return next(
      new AppError("New password did not match your confirmed password", 401)
    );
  const isOldPass = await user.checkPassword(passwordCurrent);
  if (!isOldPass)
    return next(new AppError("Current password does not match"), 401);
  user.password = password;
  await user.save();
  user.password = undefined;
  res.status(200).json({ status: "success", data: { user } });
});

exports.logout = (_, res) => {
  res.cookie("jwt", "qodfnaisdfn1231", {
    expiresIn: Date.now() + 10 * 1000,
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.stayLoggedIn = (req, res) => {
  res.status(200).json({ status: "success", data: { user: req.user } });
};
