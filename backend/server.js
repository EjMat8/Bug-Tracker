const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("😠UNCAUGHT EXCEPTION😠");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: path.join(process.cwd(), "config.env") });

const app = require("./app");

const PORT = process.env.PORT || 3001;
const DB = process.env.DB.replace("<password>", process.env.DB_PASS);

mongoose
  .connect(DB)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("db err", err.message);
  });
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("😥UNHANDLED REJECTION😥");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
