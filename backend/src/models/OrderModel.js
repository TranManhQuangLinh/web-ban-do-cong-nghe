const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product381",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User381",
      required: true,
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    shippingPrice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingPrice381",
      required: true,
    },
    totalPrice: { type: Number, required: true },
    currentStatus: { type: String, default: "Chờ xử lý" },
    updateHistory: [
      {
        status: { type: String },
        updater: { type: mongoose.Schema.Types.ObjectId, ref: "User381" },
        updatedAt: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order381", orderSchema);
module.exports = Order;
