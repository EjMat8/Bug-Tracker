const Project = require("../models/projectsModel");
const crudFactory = require("./crudFactory");

const AppError = require("../util/AppError");
const catchAsync = require("../util/catchAsync");

exports.getAllProject = crudFactory.getAll(Project, {
  belongsToUser: "project",
});

exports.createProject = crudFactory.create(Project, true);

exports.getOneProject = crudFactory.getOne(Project, {
  belongsToUser: "project",

  popUsers: { path: "users", select: "name email role" },
});

exports.updateProject = crudFactory.update(Project, {
  belongsToUser: "project",
});

exports.deleteProject = crudFactory.delete(Project, {
  belongsToUser: "project",
});

exports.updateUsersInProject = (remove = false) =>
  catchAsync(async (req, res, next) => {
    const updatedUsers = await Project.findById(req.params.id).select("users");

    if (!updatedUsers)
      return next(new AppError("Was not able to find to update users", 404));

    const usersIdString = updatedUsers.users.map((el) => el.toString());
    if (!remove)
      updatedUsers.users = [...new Set([...usersIdString, ...req.body.users])];
    else
      updatedUsers.users = usersIdString.filter(
        (el) => req.body.users.indexOf(el) < 0
      );

    await updatedUsers.save();
    res
      .status(remove ? 204 : 200)
      .json({ status: "success", data: { updatedUsers } });
  });
