const catchAsync = require("../util/catchAsync");
const QueryFeature = require("../util/QueryFeature");
const AppError = require("../util/AppError");

const restrictUserReadAndWrite = (query, req, { belongsToUser = null }) => {
  let editQuery = query;
  if (req.user.role === "admin") belongsToUser = "";

  let queryOption;

  if (belongsToUser === "ticket") {
    queryOption = {
      $or: [
        { createdBy: req.user._id },
        { project: { $in: req.user.projects } },
      ],
    };
  }

  if (belongsToUser === "project") {
    queryOption = {
      $or: [{ createdBy: req.user._id }, { users: req.user._id }],
    };
  }

  editQuery = query.find(queryOption);
  return editQuery;
};

exports.getAll = (Model, options = {}) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.projectid) filter = { project: req.params.projectid };

    const query = new QueryFeature(Model.find(), req.query)
      ._find()
      ._sort()
      ._fields()
      ._paginate(options);

    const editQuery = restrictUserReadAndWrite(query.query, req, options);

    const data = await editQuery.find(filter);
    res.status(200).json({ status: "success", data: { data } });
  });

exports.create = (Model, author) =>
  catchAsync(async (req, res, next) => {
    if (author) req.body.createdBy = req.user._id;
    if (req.params.projectid) req.body.project = req.params.projectid;

    const doc = await Model.create(req.body);

    if (!doc)
      return next(new AppError("Something went wrong creating project", 404));
    res.status(200).json({ status: "success", data: { doc } });
  });

exports.getOne = (Model, options = {}) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.projectid) filter = { project: req.params.projectid };

    const editQuery = restrictUserReadAndWrite(Model.find(), req, options);

    if (options.popUsers) editQuery.populate(options.popUsers);

    const doc = await editQuery.findOne({ _id: req.params.id, ...filter });

    if (!doc) return next(new AppError("Could not find doc", 404));

    res.status(200).json({ status: "success", data: { doc } });
  });

exports.update = (Model, options = {}) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.projectid) filter = { project: req.params.projectid };
    const editQuery = restrictUserReadAndWrite(Model.find(), req, options);
    const updatedDoc = await editQuery.findOneAndUpdate(
      { _id: req.params.id, ...filter },
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (!updatedDoc)
      return next(new AppError("Could not find doc to update", 404));

    res.status(200).json({ status: "success", data: { updatedDoc } });
  });

exports.delete = (Model, options = {}) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.projectid) filter = { project: req.params.projectid };
    const editQuery = restrictUserReadAndWrite(Model.find(), req, options);
    const doc = await editQuery.findOneAndDelete({
      _id: req.params.id,
      ...filter,
    });
    if (!doc) return next(new AppError("Could not find doc to delete", 404));

    res.status(204).json({ status: "success", data: null });
  });
