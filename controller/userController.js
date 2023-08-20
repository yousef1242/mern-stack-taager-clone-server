const asyncHandler = require("express-async-handler");
const { User } = require("../model/user");

// get single user
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select("-password");
  if (!user) {
    return res.status(500).json({ message: "المستخدم غير موجود" });
  }
  res.status(200).json(user);
});

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.status(200).json(users);
});

const updateUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(500).json({ message: "المستخدم غير موجود" });
  }
  const updateUser = await User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        ...req.body,
      },
    },
    { new: true }
  ).select("-password");
  res.status(200).json(updateUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(500).json({ message: "المستخدم غير موجود" });
  }
  await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({ message: "تم حذف المستخدم" });
});

const updateUserBalance = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(500).json({ message: "المستخدم غير موجود" });
  }
  const { country, balance } = req.body;
  if (country === "eg") {
    await User.findByIdAndUpdate(userId, {
      $set: {
        egyptBalance: user.egyptBalance + balance,
      },
    });
    return res.status(200).json({ message: "تم ارسال الربح للمستخدم" });
  }
  if (country === "sa") {
    await User.findByIdAndUpdate(userId, {
      $set: {
        sudiaBalance: user.sudiaBalance + balance,
      },
    });
    return res.status(200).json({ message: "تم ارسال الربح للمستخدم" });
  }
  if (country === "ae") {
    await User.findByIdAndUpdate(userId, {
      $set: {
        emaratBalance: user.emaratBalance + balance,
      },
    });
    res.status(200).json({ message: "تم ارسال الربح للمستخدم" });
  }
});

const withdrawUserBalance = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(500).json({ message: "المستخدم غير موجود" });
  }
  const { curruncy, amount } = req.body;
  if (curruncy === "EGP") {
    await User.findByIdAndUpdate(userId, {
      $set: {
        egyptBalance: user.egyptBalance - amount,
      },
    });
    return;
  }
  if (curruncy === "SAR") {
    await User.findByIdAndUpdate(userId, {
      $set: {
        sudiaBalance: 0,
      },
    });
    return;
  }
  if (curruncy === "AED") {
    await User.findByIdAndUpdate(userId, {
      $set: {
        emaratBalance: user.emaratBalance - amount,
      },
    });
    return;
  }
});

module.exports = {
  getSingleUser,
  getAllUsers,
  updateUserInfo,
  deleteUser,
  updateUserBalance,
  withdrawUserBalance,
};
