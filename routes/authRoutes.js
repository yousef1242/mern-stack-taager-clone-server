const { register, login } = require("../controller/authController");

const router = require("express").Router();

// register
router.post("/register", register);

// login
router.post("/login", login);

module.exports = router;
