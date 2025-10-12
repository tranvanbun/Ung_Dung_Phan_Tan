export const createPaymentLink = async (orderId, amount) => {
  // Giả lập tạo link thanh toán
  const paymentUrl = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?orderId=${orderId}&amount=${amount}`;
  return paymentUrl;
};
