const router = require("express").Router();
const {
  addToCart,
  getAllCartForUser,
  deletetFromCart,
  deleteAllCart,
  updateProductQuantatyFromCart,
} = require("../controller/cartController");
const { verifyToken } = require("../middleware/verifyToken");

// add to cart
router.post("/add", verifyToken, addToCart);

// get all cart for user
router.get("/get", verifyToken, getAllCartForUser);

// delete from cart
router.delete("/delete/:cartId", verifyToken, deletetFromCart);

// delete all cart
router.delete("/delete", verifyToken, deleteAllCart);

// update cart product quantaty
router.put("/update/:cartId", verifyToken, updateProductQuantatyFromCart);

module.exports = router;
