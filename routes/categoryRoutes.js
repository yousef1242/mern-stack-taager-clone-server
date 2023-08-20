const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require("../controller/categoryController");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const router = require("express").Router();

// create category
router.post("/create", verifyToken, verifyTokenAndAdmin, createCategory);

// get all categories
router.get("/", getAllCategories);

// delete category
router.delete(
  "/delete/:categoryId",
  verifyToken,
  verifyTokenAndAdmin,
  deleteCategory
);

module.exports = router;
