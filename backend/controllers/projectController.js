const Project = require("../models/projectsModel");
const catchAsync = require("../util/catchAsync");

exports.getAll = catchAsync(async (req, res, next) => {
  //   const query = new QueryFeature();
  console.log(req.query);
  res.status(200).json({ message: "ok" });
});

exports.create = catchAsync(async (req, res, next) => {
  const newProject = await Project.create(req.body);
  console.log("sup");
  if (!newProject)
    return next(new AppError("Something went wrong creating project", 400));
  res.status(200).json({ status: "success", data: { project: newProject } });
});
