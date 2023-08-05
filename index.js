const express = require("express");
const connectDb = require("./config/dbConnection");
const validationToken = require("./middleware/validationToken");
connectDb();

const app = express();

const todoRouter = require("./routes/todoRouter");
app.use(express.json());

app.use("/validate", require("./routes/validationRouter"));
app.use("/", todoRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
