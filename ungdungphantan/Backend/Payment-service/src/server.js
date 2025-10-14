import express from "express";
import dotenv from "dotenv";
import paymentRoutes from "./routes/payment.routes.js";
import bankConfigRoutes from "./routes/bankConfig.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/payments", paymentRoutes);
app.use("/bank-config", bankConfigRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`💳 Payment-service đang chạy tại cổng http://localhost:${PORT}`));
