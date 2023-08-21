const router = require("express").Router();
const { sendWithdraw, getAllWithdrawForAdmin, sendMoney } = require("../controller/withdrawController");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// send withdraw
router.post("/send", verifyToken, sendWithdraw);

// get all withdraw for admin
router.get("/", verifyToken, verifyTokenAndAdmin, getAllWithdrawForAdmin);

// send money
router.put("/send/money/:withdrawId", verifyToken, verifyTokenAndAdmin, sendMoney);

module.exports = router;
