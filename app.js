const port = 3000;
const express = require("express");
const app = express();
app.use(express.json());

const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
