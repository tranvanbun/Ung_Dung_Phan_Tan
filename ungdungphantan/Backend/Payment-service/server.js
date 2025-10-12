import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import paymentRoutes from './src/routes/payment.route.js';
const {VNPay, ignore} = require('vnpay-nodejs');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/payment", paymentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;