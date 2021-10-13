const mongoose = require("mongoose");
const slugify = require("slugify");
const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please give your ticket a title"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please describe your ticket"],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A ticket must have at least one author"],
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    required: [true, "A ticket must be contained in the project"],
  },
  slug: String,
  deadline: Date,
  status: {
    type: String,
    enum: {
      values: ["Resolved", "New", "In progress"],
      message: "Invalid value",
    },
  },
  priority: {
    type: String,
    enum: {
      values: ["High", "Low", "Medium"],
      message: "Invalid value",
    },
  },
  type: {
    type: String,
    enum: {
      values: ["Issue", "Bug", "Feature Request"],
      message: "Invalid value",
    },
  },
});

ticketSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
