const {
  getSingleUser,
  getAllUsers,
  deleteUser,
  updateUserBalance,
  withdrawUserBalance,
} = require("../controller/userController");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// get single user
router.get("/:userId", getSingleUser);

// get all users
router.get("/", verifyToken, verifyTokenAndAdmin, getAllUsers);

// send balance
router.put("/send/balance/:userId", verifyToken, verifyTokenAndAdmin, updateUserBalance);

// withdraw balance
router.put("/withdraw/balance/:userId", verifyToken, withdrawUserBalance);

// delete user
router.delete("/delete/:userId", verifyToken, deleteUser, deleteUser);

module.exports = router;
