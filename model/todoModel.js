const mongoose = require("mongoose");

const schemas = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "validationSchema",
    },
    title: {
      type: String,
      required: [true, "Please add title"],
    },
    description: {
      type: String,
      required: [true, "Please add description"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("todolist", schemas);
