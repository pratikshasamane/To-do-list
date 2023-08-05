const express = require("express");
const {
  register,
  login,
  current,
} = require("../controller/validationController");
const validationToken = require("../middleware/validationToken");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.get("/current", validationToken, current);

module.exports = router;
