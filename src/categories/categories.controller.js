const categoryService = require('./categories.service');

module.exports.createCategories = async function (req, res) {
  const category = req.body;
  const createdCategory = await categoryService.createCategory(category);
  return res.status(200).json(createdCategory);
}

module.exports.getCategories = async function (req, res) {
  const categories = await categoryService.getCategories();
  return res.status(200).json(categories)
}

module.exports.getCategoryById = async function (req, res) {
  const id = req.params.id;
  const category = await categoryService.getCategoryById(id);
  return res.status(200).json(category);
}

module.exports.updateCategoryById = async function (req, res) {
  const id = req.params.id;
  const update = req.body;
  const updatedCategory = await categoryService.updateCategoryById(id, update);
  return res.status(200).json(updatedCategory);
}

module.exports.deleteCategoryById = async function (req, res) {
  const id = req.params.id;
  const deletedPost = await categoryService.deleteCategoryById(id);
  return res.status(200).json(deletedPost);
}