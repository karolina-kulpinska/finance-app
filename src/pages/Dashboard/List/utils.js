export const isOverdue = (payment) => {
  if (payment.paid) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const paymentDate = new Date(payment.date);
  paymentDate.setHours(0, 0, 0, 0);
  return paymentDate < today;
};

export const getOverdueDays = (payment) => {
  if (!payment.date) return 0;
  const diff = new Date() - new Date(payment.date);
  return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)));
};
