const path = require("path");
const express = require("express");
const morgan = require("morgan");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));

app.use(express.static(path.join(process.cwd(), "public")));

// app.use("/api/users", userRoutes);

app.use("*", (_, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Could not find what you are looking for",
  });
  next();
});

module.exports = app;
