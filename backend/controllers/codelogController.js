const Codelog = require("../model/codelogModel");
const QueryFeatures = require("../utils/QueryFeatures");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getCodelogs = catchAsync(async (req, res, next) => {
  const { query } = new QueryFeatures(Codelog.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const data = await query;
  res.status(200).json({
    status: "success",
    results: data.length,
    data: { codelogs: data },
  });
});

exports.createCodelog = catchAsync(async (req, res, next) => {
  const newCodelog = await Codelog.create(req.body);
  res.status(201).json({ status: "success", data: { codelog: newCodelog } });
});

exports.getCodelog = catchAsync(async (req, res, next) => {
  const codelog = await Codelog.findById(req.params.id);
  if (!codelog) throw new AppError("Log does not exist", 400);
  res.status(200).json({ status: "success", data: { codelog } });
});
exports.updateCodelog = catchAsync(async (req, res, next) => {
  const updatedCodelog = await Codelog.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedCodelog) throw new AppError("Log does not exist", 400);
  res.status(200).json({
    status: "success",
    data: {
      codelog: updatedCodelog,
    },
  });
});

exports.deleteCodelog = catchAsync(async (req, res, next) => {
  const codelog = await Codelog.findByIdAndDelete(req.params.id);
  if (!codelog) throw new AppError("Log does not exist", 400);

  res.status(204).json({ status: "success", data: null });
});
