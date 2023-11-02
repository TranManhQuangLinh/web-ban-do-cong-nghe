const mongoose = require("mongoose");
const shippingPriceSchema = new mongoose.Schema(
  {
    minOrderAmount: {
      type: Number,
      required: true,
    },
    maxOrderAmount: {
      type: Number,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const ShippingPrice = mongoose.model("ShippingPrice381", shippingPriceSchema);
module.exports = ShippingPrice;
