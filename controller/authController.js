const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { User } = require("../model/user");
const JWT = require("jsonwebtoken");

// register
const register = asyncHandler(async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  const userEmail = await User.findOne({ email: email });
  const userNumber = await User.findOne({ phoneNumber: phoneNumber });
  if (userEmail) {
    return res.status(500).json({ message: "الايميل موجود بالفعل" });
  }
  if (userNumber) {
    return res.status(500).json({ message: "الرقم موجود بالفعل" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const createUser = new User({
    ...req.body,
    password: hashPassword,
  });
  const saveUser = await createUser.save();
  res.status(200).json({ message: "لقد عملت حساب بنجاح", saveUser });
});

// login
const login = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    return res.status(500).json({ message: "رقم الهاتف ليس موجود" });
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status(500).json({ message: "كلمة المرور غير صحيحة" });
  }
  const token = JWT.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.SECRET_JWT
  );
  res.status(200).json({
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
    token: token,
  });
});

module.exports = {
  register,
  login,
};
