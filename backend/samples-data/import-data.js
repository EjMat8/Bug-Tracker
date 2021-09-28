const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const CodeLog = require("../model/codelogModel");

mongoose
  .connect(
    "mongodb+srv://ej_mat:i0HkPMdOs8neVAlF@cluster0.xcnnp.mongodb.net/codeplay?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const data = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "samples-data", "data-sample.json"),
    "utf8"
  )
);

const importData = async () => {
  try {
    CodeLog.create(data);
    console.log("created data");
  } catch (e) {
    console.log("error");
  }
};

importData();
