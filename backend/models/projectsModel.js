const mongoose = require("mongoose");
const slugify = require("slugify");
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A project name is required"],
      unique: true,
    },
    desc: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    slug: String,
  },
  {
    timestamps: true,
  }
);

projectSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  this.slug = slugify(this.name, { lower: true });

  next();
});

projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: "createdBy",
    select: "name role",
  });
  next();
});
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
