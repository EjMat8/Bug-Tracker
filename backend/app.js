const path = require("path");
const express = require("express");
const morgan = require("morgan");
const codelogRouter = require("./routes/codelogRouter");
const AppError = require("./utils/AppError");
const globalErrorController = require("./controllers/globalErrorController");
const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(express.static(path.join(`${process.cwd()}`, "public")));

app.use("/api/100-days", codelogRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Unknown path : ${req.originalUrl}`, 404));
});

app.use(globalErrorController);
module.exports = app;
