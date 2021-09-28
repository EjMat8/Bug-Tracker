const mongoose = require("mongoose");
const slugify = require("slugify");

const codelogSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "A log must have a day number"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "A log must have a title"],
      trim: true,
      minLength: 8,
    },
    images: {
      type: [String],
    },
    completeTasks: {
      type: [String],
      required: [true, "A log must have a complete task"],
      trim: true,
    },
    learnings: [String],
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

codelogSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Codelog = mongoose.model("Codelog", codelogSchema);

module.exports = Codelog;
