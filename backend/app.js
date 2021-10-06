const path = require("path");
const express = require("express");
const morgan = require("morgan");

const app = express();

if (process.env.NODE_ENV === "default") app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => {
  res.status(200).json({ status: "success", data: { something: "hi" } });
});

module.exports = app;
