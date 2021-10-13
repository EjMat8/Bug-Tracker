const User = require("../models/userModel");
const crudFactory = require("./crudFactory");

exports.getAllUser = crudFactory.getAll(User);
exports.getUser = crudFactory.getOne(User);
