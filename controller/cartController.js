const asyncHandler = require("express-async-handler");
const { Cart } = require("../model/cart");

// add to cart
const addToCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ productId: req.body.productId });
  if (cart) {
    cart.quantaty = cart.quantaty + req.body.quantaty;
    await cart.save();
    return res.status(200).json({ message: " تم اضافة المنتج الي العربة" });
  }
  const newCart = new Cart({
    ...req.body,
    userId: req.user.id,
  });
  const saveCart = await newCart.save();
  res.status(200).json({ message: " تم اضافة المنتج الي العربة", saveCart });
});

// get all cart for user
const getAllCartForUser = asyncHandler(async (req, res) => {
  const { country } = req.query;
  const cartObj = { userId: req.user.id };
  if (country) {
    cartObj.country = country;
  }
  const cart = await Cart.find(cartObj).populate("productId");
  return res.status(200).json(cart);
});

// delete from cart
const deletetFromCart = asyncHandler(async (req, res) => {
  const cartProduct = await Cart.findById(req.params.cartId);
  if (!cartProduct) {
    return res.status(500).json({ message: "هذا المنتج ليس موجود في العربة" });
  }
  await Cart.findByIdAndDelete(req.params.cartId);
  return res.status(200).json({ message: "تم حذف المنتج من العربة" });
});

// delete all cart
const deleteAllCart = asyncHandler(async (req, res) => {
  const { country } = req.query;
  const deleteCart = {};
  if (country) {
    deleteCart.country = country;
  }
  if (req.user.id) {
    deleteCart.userId = req.user.id;
  }
  await Cart.deleteMany(deleteCart);
  res.status(200).json({ message: "تم حذف كل المنتجات من العربة" });
});

// update cart product quantaty
const updateProductQuantatyFromCart = asyncHandler(async (req, res) => {
  const cartProduct = await Cart.findById(req.params.cartId);
  if (!cartProduct) {
    return res.status(500).json({ message: "هذا المنتج ليس موجود في العربة" });
  }
  const cart = await Cart.findByIdAndUpdate(
    req.params.cartId,
    {
      $set: {
        quantaty: req.body.quantaty,
      },
    },
    { new: true }
  );
  res.status(200).json(cart);
});

module.exports = {
  addToCart,
  getAllCartForUser,
  deletetFromCart,
  deleteAllCart,
  updateProductQuantatyFromCart,
};
