const {
  getAllProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  getAllProductsByCategory,
  getAllProductsByCountry,
  getSingleProduct,
  getAllProductsForAdmin,
} = require("../controller/productController");
const storage = require("../lib/multer");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const router = require("express").Router();

// create product
router.post(
  "/create",
  verifyToken,
  verifyTokenAndAdmin,
  storage.array("file"),
  createProduct
);

// get all products by country
router.get("/:country", getAllProductsByCountry);

// get all products for admin
router.get("/", verifyToken, verifyTokenAndAdmin, getAllProductsForAdmin);

// get single product
router.get("/single/:productId", getSingleProduct);

// get all products by category
router.get("/cat/category", getAllProductsByCategory);

// delete category
router.delete(
  "/delete/:productId",
  verifyToken,
  verifyTokenAndAdmin,
  deleteProduct
);

// update category
router.put(
  "/update/:productId",
  verifyToken,
  verifyTokenAndAdmin,
  storage.array("file"),
  updateProduct
);

module.exports = router;
