const router = require("express").Router();
const {
  createOrder,
  getAllOrdersForUser,
  getAllOrdersForAdmin,
  updateOrderStatus,
  cancelOrder,
  deleteAllOrdersAllOrders,
} = require("../controller/orderController");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// create order
router.post("/create", verifyToken, createOrder);

// get al orders for user
router.get("/get/:userId", verifyToken, getAllOrdersForUser);

// get all orders for admin
router.get("/", verifyToken, verifyTokenAndAdmin, getAllOrdersForAdmin);

// cancel order
router.put("/cancel/:orderId", verifyToken, cancelOrder);

// delete all order
router.delete("/delete/all-orders", deleteAllOrdersAllOrders);

// ypdate order status
router.put(
  "/update/status/:orderId",
  verifyToken,
  verifyTokenAndAdmin,
  updateOrderStatus
);

module.exports = router;
