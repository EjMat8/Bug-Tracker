const path = require("path");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("😠UNCAUGHT EXCEPTION😠");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: path.join(process.cwd(), "config.env") });

const app = require("./app");

const PORT = process.env.PORT || 3001;

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
