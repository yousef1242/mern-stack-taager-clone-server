const asyncHandler = require("express-async-handler");
const { Withdraw } = require("../model/withdraw");

// add withdraw
const sendWithdraw = asyncHandler(async (req, res) => {
  const sendWithdraw = new Withdraw({...req.body});
  const saveWithdraw = await sendWithdraw.save();
  res
    .status(200)
    .json({ message: "تم ارسال طلب سحب الارباح", saveWithdraw: saveWithdraw });
});

// get all withdraw for admin
const getAllWithdrawForAdmin = asyncHandler(async (req, res) => {
  const allWithdraw = await Withdraw.find({}).sort({createdAt:-1}).populate("userId");
  res
    .status(200)
    .json(allWithdraw);
});

// send money
const sendMoney = asyncHandler(async (req, res) => {
  await Withdraw.findByIdAndUpdate(req.params.withdrawId,{
    $set : {
      isSend : true
    }
  });
  res.status(200).json({message : "تم ارسال الفلوس"})
});

module.exports = {
  sendWithdraw,
  getAllWithdrawForAdmin,
  sendMoney,
};
