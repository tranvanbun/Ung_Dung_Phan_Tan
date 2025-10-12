import { createPaymentLink } from "../services/payment.service.js";

export const createPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    if (!orderId || !amount) {
      return res.status(400).json({ message: "Thiếu orderId hoặc amount" });
    }

    const url = await createPaymentLink(orderId, amount);
    res.status(200).json({ payment_url: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
