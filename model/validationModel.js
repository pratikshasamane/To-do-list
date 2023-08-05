const mongoose = require("mongoose");

const validationSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add email"],
  },
  password: {
    type: String,
    required: [true, "Please add description"],
  },
});

module.exports = mongoose.model("validationSchema", validationSchema);
