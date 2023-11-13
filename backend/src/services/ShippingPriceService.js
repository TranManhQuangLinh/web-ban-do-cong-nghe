const ShippingPrice = require("../models/ShippingPriceModel");

const createShippingPrice = (newShippingPrice) => {
  return new Promise(async (resolve, reject) => {
    const { maxOrderAmount } = newShippingPrice;
    try {
      const checkShippingPrice = await ShippingPrice.findOne({
        maxOrderAmount: maxOrderAmount,
      });
      if (checkShippingPrice !== null) {
        resolve({
          status: "ERR",
          message: "maxOrderAmount already exists",
        });
      }
      const createdShippingPrice = await ShippingPrice.create(newShippingPrice);
      if (createdShippingPrice) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdShippingPrice,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateShippingPrice = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkShippingPrice = await ShippingPrice.findOne({
        _id: id,
      });
      if (checkShippingPrice === null) {
        resolve({
          status: "ERR",
          message: "shippingPrice is not defined",
        });
      }

      const checkAmountShippingPrice = await ShippingPrice.findOne({
        maxOrderAmount: data.maxOrderAmount,
      });
      // console.log(checkAmountShippingPrice);
      if (
        checkAmountShippingPrice !== null &&
        checkShippingPrice.name !== data.name
      ) {
        resolve({
          status: "ERR",
          message: "maxOrderAmount already exists",
        });
      }

      const updatedShippingPrice = await ShippingPrice.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        }
      );
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedShippingPrice,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteShippingPrice = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkShippingPrice = await ShippingPrice.findOne({
        _id: id,
      });
      console.log("checkShippingPrice", checkShippingPrice);
      if (checkShippingPrice === null) {
        resolve({
          status: "ERR",
          message: "shippingPrice is not defined",
        });
      }

      await ShippingPrice.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "delete shippingPrice success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyShippingPrice = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await ShippingPrice.deleteMany(ids);
      resolve({
        status: "OK",
        message: "delete categories success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllShippingPrices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allShippingPrices = await ShippingPrice.find().sort({
        createdAt: -1,
        updatedAt: -1,
      }); // sắp xếp theo thời gian giảm dần, nghĩa là mới nhât --> cập nhật gần nhất
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allShippingPrices,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsShippingPrice = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const shippingPrice = await ShippingPrice.findOne({
        _id: id,
      });
      if (shippingPrice === null) {
        resolve({
          status: "ERR",
          message: "shippingPrice is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: shippingPrice,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createShippingPrice,
  updateShippingPrice,
  deleteShippingPrice,
  deleteManyShippingPrice,
  getAllShippingPrices,
  getDetailsShippingPrice,
};
