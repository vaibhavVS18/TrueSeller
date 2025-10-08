import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./db/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cartRoutes from "./routes/cart.routes.js";

dotenv.config();

connect();
const app = express();

app.use(
  cors({
    origin: "https://trueseller.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


//    -> Keep backend alive with activa
// if (process.env.BACKEND_URL) {
//   websiteActiva(process.env.BACKEND_URL, 13); // every 13 minutes
// }

app.get("/", (req, res)=>{
    res.send("hello");
})

app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
} )