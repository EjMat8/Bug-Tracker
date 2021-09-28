const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("unhandledException", (err) => {
  console.log("UNHANDLED EXCEPTION");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE_CONNECTION.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log("server is running");
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
