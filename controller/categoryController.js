const asyncHandler = require("express-async-handler");
const { Category } = require("../model/category");

// create category
const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const category = await Category.findOne({ title });
  ``;
  if (category) {
    return res.status(500).json({ message: "هذه الفئة موجود بالفعل" });
  }
  const createCategory = new Category({
    title,
  });
  const saveCategory = await createCategory.save();
  res
    .status(200)
    .json({ message: "تم اضافة الصنف بنجاح", saveCategory: saveCategory });
});

// get all categories
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

// delete category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    return res.status(500).json({ message: "هذه الفئة غير موجود " });
  }
  await Category.findByIdAndDelete(req.params.categoryId);
  res.status(200).json({ message: "تم ازالة الفئة بنجاح" });
});

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
