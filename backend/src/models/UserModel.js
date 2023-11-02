const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "Khách hàng", required: true },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User381", userSchema);
module.exports = User;
