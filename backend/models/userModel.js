const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "A name is required."],
      set: (val) =>
        val
          .toLowerCase()
          .split(" ")
          .map((el) => `${el[0].toUpperCase()}${el.slice(1)}`)
          .join(" "),
    },
    email: {
      type: String,
      unique: true,
      required: [true, "An email address is required."],
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: [true, "The password is required."],
      minlength: [8, "Password must be at least 8 characters"],
      trim: true,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "project manager", "developer"],
        message: "Invalid Role",
      },
      default: "developer",
    },
    projects: [{ type: mongoose.Schema.ObjectId, ref: "Project" }],
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

//User must include projects and tickets
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashedPass = await bcrypt.hash(this.password, 12);
  this.password = hashedPass;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("projects")) return next();
  const userProjString = this.projects.map((el) => el.toString());
  this.projects = [...new Set(userProjString)];
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.checkPassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
};
userSchema.methods.checkPassChanged = function (jwtIssued) {
  if (this.passwordChangedAt) {
    return parseInt(this.passwordChangedAt / 1000, 10) < jwtIssued;
  }
  return true;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
