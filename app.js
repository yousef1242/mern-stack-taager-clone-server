const express = require("express");
const dotenv = require("dotenv");
const connectMongoDB = require("./config/db");
const cors = require("cors");

const app = express();

app.use(express.json());

// dotenv
dotenv.config();

// connect DB
connectMongoDB();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

// routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/categories", require("./routes/categoryRoutes"));

app.use("/api/products", require("./routes/productRoutes"));

app.use("/api/cart", require("./routes/cartRoutes"));

app.use("/api/orders", require("./routes/orderRoutes"));

app.use("/api/withdraw", require("./routes/withdrawRoutes"));

app.listen(8080, () => {
  console.log(`server is running`);
});
