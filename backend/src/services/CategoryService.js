const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");

const createCategory = (newCategory) => {
  return new Promise(async (resolve, reject) => {
    const { name } = newCategory;
    try {
      const checkCategory = await Category.findOne({
        name: name,
      });
      if (checkCategory !== null) {
        resolve({
          status: "ERR",
          message: "category already exists",
        });
      }
      const createdCategory = await Category.create({
        name,
      });
      if (createdCategory) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdCategory,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateCategory = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkCategory = await Category.findOne({
        _id: id,
      });
      if (checkCategory === null) {
        resolve({
          status: "ERR",
          message: "category is not defined",
        });
      }

      const updatedCategory = await Category.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedCategory,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkCategory = await Category.findOne({
        _id: id,
      });
      console.log("checkCategory", checkCategory);
      if (checkCategory === null) {
        resolve({
          status: "ERR",
          message: "category is not defined",
        });
      }

      await Category.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "delete category success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyCategory = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Category.deleteMany(ids);
      resolve({
        status: "OK",
        message: "delete categories success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allCategory = await Category.find().sort({
        createdAt: -1,
        updatedAt: -1,
      }); // sắp xếp theo thời gian giảm dần, nghĩa là mới nhât --> cập nhật gần nhất
      resolve({
        status: "OK",
        message: "Success",
        data: allCategory,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  deleteManyCategory,
};
