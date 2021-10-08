const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const AppError = require("./util/AppError");
const globalErrorController = require("./controllers/globalErrorController");

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(express.static(path.join(process.cwd(), "public")));

app.use("/cookies", (req, res) => {
  res.status(200).json({ cookies: req.cookies });
});
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

app.use("*", (_, res, next) => {
  return next(new AppError("Not Found", 404));
});
app.use(globalErrorController);
module.exports = app;
