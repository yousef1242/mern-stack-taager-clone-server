const asyncHandler = require("express-async-handler");
const { Order } = require("../model/order");
const crypto = require("crypto");

// create order
const createOrder = asyncHandler(async (req, res) => {
  const neworder = new Order({
    ...req.body,
    userId: req.user.id,
  });
  neworder.orderNumber = crypto.randomBytes(5).toString("hex");

  if (req.body.productId && req.body.quantaty) {
    const { productId, quantaty } = req.body;

    for (let i = 0; i < productId.length && i < quantaty.length; i++) {
      neworder.products.push({
        productId: productId[i],
        quantaty: quantaty[i],
      });
    }
  } else {
    return;
  }

  const saveOrder = await neworder.save();
  res.status(200).json({ message: "لقد أتممت طلبك بنجاح", saveOrder });
});

// get al orders for user
const getAllOrdersForUser = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId })
    .sort({
      createdAt: -1,
    })
    .populate({
      path: "products",
      populate: "productId",
    });
  res.status(200).json(orders);
});

// get al orders for admin
const getAllOrdersForAdmin = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate({
    path: "products",
    populate: "productId",
  });
  res.status(200).json(orders);
});

// update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.orderId, {
    $set: {
      status: req.body.status,
    },
  });
  res.status(200).json(order);
});

// delete all orders for user
const deleteAllOrdersAllOrders = asyncHandler(async (req, res) => {
  await Order.deleteMany();
  res.status(200).json({ message: "تم حزف كل الاوردرات" });
});

// delete all orders for user
const cancelOrder = asyncHandler(async (req, res) => {
  await Order.findByIdAndUpdate(req.params.orderId, {
    $set: {
      isCancled: true,
    },
  });
  res.status(200).json({ message: "تم الغاء الطلب" });
});

module.exports = {
  createOrder,
  getAllOrdersForUser,
  getAllOrdersForAdmin,
  updateOrderStatus,
  deleteAllOrdersAllOrders,
  cancelOrder,
};
