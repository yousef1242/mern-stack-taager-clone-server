const asyncHandler = require("express-async-handler");
const { Product } = require("../model/product");
const { Order } = require("../model/order");
const { Cart } = require("../model/cart");
const cloudinary = require("../lib/cloudinary");

// create product
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product(req.body);
  const imageDevice = [];
  for (let i = 0; i < req.files.length; i++) {
    const result = await cloudinary.uploader.upload(req.files[i].path, {
      resource_type: "auto",
    });
    imageDevice.push(result.secure_url);
  }
  if (req.body.imageUrls) {
    const imageUrls = Array.isArray(req.body.imageUrls)
      ? req.body.imageUrls
      : [req.body.imageUrls];
    for (const imageUrl of imageUrls) {
      const parsedUrl = new URL(imageUrl);
      parsedUrl.searchParams.delete("resize");
      parsedUrl.searchParams.delete("ssl");
      const cleanedUrl = parsedUrl.toString();
      imageDevice.push(cleanedUrl);
    }
  }
  if (Array.isArray(req.body.size)) {
    product.sizes = req.body.size;
  } else if (req.body.size) {
    product.sizes.push(req.body.size);
  }
  product.images = imageDevice;
  const saveProduct = await product.save();
  res.status(200).json({ message: "تم اضافة المنتج بنجاح", saveProduct });
});

// get all products by country
const getAllProductsByCountry = asyncHandler(async (req, res) => {
  const products = await Product.find({ country: req.params.country }).sort({
    createdAt: -1,
  });
  res.status(200).json(products);
});

// get all products for admin
const getAllProductsForAdmin = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({
    createdAt: -1,
  });
  res.status(200).json(products);
});

// get all products by country
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  res.status(200).json(product);
});

// get all products by category
const getAllProductsByCategory = asyncHandler(async (req, res) => {
  const { country, category } = req.query;
  const cat = {};
  if (country) {
    cat.country = country;
  }
  if (category) {
    cat.category = category;
  }
  const products = await Product.find(cat).sort({
    createdAt: -1,
  });
  res.status(200).json(products);
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return res.status(500).json({ message: "هذا المنتج غير موجود " });
  }
  await Product.findOneAndDelete(req.params.productId);
  await Order.deleteMany({ "products.productId": product._id });
  await Cart.deleteMany({ productId: product._id });
  res.status(200).json({ message: "تم ازالة المنتج بنجاح" });
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(500).json({ message: "هذا المنتج غير موجود " });
  }
  const images = [];
  if (req.body.imageUrls) {
    for (let i = 0; i < req.body.imageUrls.length; i++) {
      images.push(req.body.imageUrls[i]);
    }
  }
  let size;
  if (Array.isArray(req.body.sizes)) {
    size = req.body.sizes;
  } else if (req.body.sizes) {
    size = req.body.sizes;
  }
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const result = await cloudinary.uploader.upload(req.files[i].path, {
        resource_type: "image",
      });
      images.push(result.secure_url);
    }
  }
  const updateProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        ...req.body,
        images: images,
        sizes: size,
      },
    },
    { new: true }
  );
  res.status(200).json({ message: "تم تعديل المنتج بنجاح", updateProduct });
});

module.exports = {
  createProduct,
  getAllProductsByCountry,
  deleteProduct,
  updateProduct,
  getAllProductsByCategory,
  getSingleProduct,
  getAllProductsForAdmin,
};
