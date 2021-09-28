const AppError = require("../utils/AppError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR", err);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

const handleCastError = (err, statusCode) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, statusCode);
};

const handleDupilcateError = (err, statusCode) => {
  const message = `Duplicate key: ${Object.keys(err.keyValue)[0]}`;
  return new AppError(message, statusCode);
};
const handleValidationError = (err, statusCode) => {
  const message = `Invalid Inputs: ${Object.values(err.errors)
    .map((el) => el.message)
    .join(". ")}`;

  return new AppError(message, statusCode);
};

module.exports = (err, req, res, _) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, name: err.name, message: err.message };
    if (error.name === "CastError") error = handleCastError(err, 400);
    if (error.code === 11000) error = handleDupilcateError(err, 400);
    if (error.name === "ValidationError")
      error = handleValidationError(err, 400);

    sendErrorProd(error, res);
  }
};
