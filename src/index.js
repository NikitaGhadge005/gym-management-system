import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import memberRoutes  from "./routes/memberRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import dietRoutes from "./routes/dietRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/diets", dietRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
  });
});

