const Category = require("./categories.model");

module.exports.createCategory = async function (category) {
  return Category.create(category);
};

module.exports.getCategories = async function () {
  return Category.find({});
};

module.exports.getCategoryById = async function (id) {
  return Category.findById(id);
};

module.exports.updateCategoryById = async function (id, update) {
  return Category.findByIdAndUpdate(id, update, { new: true });
};

module.exports.deleteCategoryById = async function (id) {
  return Category.findByIdAndDelete(id);
};
