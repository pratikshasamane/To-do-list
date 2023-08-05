const validationModel = require("../model/validationModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const alreadyExist = await validationModel.findOne({ email });

  if (email == alreadyExist) {
    res.status(401).json({ message: "Email already registerd" });
  }

  const newPass = await bcrypt.hash(password, 10);
  const registerUser = await validationModel.create({
    email: email,
    password: newPass,
  });

  if (registerUser) {
    res.json({
      message: "User registered!",
      _id: registerUser.id,
      email: registerUser.email,
    });
  } else {
    res.status(400).json({ message: "User data is not valid" });
  }
});

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "All fields are required!" });
  }

  const user = await validationModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accessToken });
  }
});

const current = function (req, res) {
  res.json(req.user);
};
module.exports = { login, register, current };
