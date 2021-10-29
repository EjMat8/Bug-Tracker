const User = require("../models/userModel");
const crudFactory = require("./crudFactory");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/AppError");
exports.getAllUser = crudFactory.getAll(User);
exports.getUser = crudFactory.getOne(User);
exports.updateUserRole = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user.role === "admin")
    throw new AppError("Cannot update an admin's role", 403);
  user.role = req.body.role;
  await user.save();
  res.status(200).json({ status: "success", data: { user } });
});
