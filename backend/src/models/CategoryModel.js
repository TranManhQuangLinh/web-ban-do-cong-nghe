const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category381", categorySchema);

module.exports = Category;
