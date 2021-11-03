const mongoose = require("mongoose");
const slugify = require("slugify");

const User = require("./userModel");
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.virtual("tickets", {
  ref: "Ticket",
  foreignField: "project",
  localField: "_id",
});

projectSchema.methods.saveProjectToUser = async (id, projectId) => {
  const user = await User.findById(id);
  const userProjectStrings = user.projects.map((el) => el.toString());
  user.projects = [...new Set([...userProjectStrings, projectId])];

  console.log(user.projects);
  await user.save();
};

projectSchema.pre("save", async function (next) {
  const doc = this;
  if (!this.isModified("createdBy") && !this.isModified("users")) return next();

  if (this.isModified("createdBy")) {
    await this.saveProjectToUser(this.createdBy, this.id);
  }
  if (this.isModified("users")) {
    await Promise.all(
      doc.users.map(async (el) => {
        await doc.saveProjectToUser(el, doc._id);
      })
    );
  }
  next();
});

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
projectSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: "users",
    select: "name email role",
  });
  next();
});
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
