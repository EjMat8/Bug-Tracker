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
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
