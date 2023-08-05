const express = require("express");
const router = express.Router();
const {
  createList,
  updateList,
  deleteList,
  getAllList,
} = require("../controller/todoController");
const validationToken = require("../middleware/validationToken");
router.use(validationToken);

router.route("/get").get(getAllList);

router.route("/create").post(createList);
router.route("/update/:id").put(updateList);
router.route("/delete/:id").delete(deleteList);

module.exports = router;
