export const getCategoryLabel = (category, t) => {
  if (!t) {
    const fallback = { bills: "Rachunki", shopping: "Zakupy", other: "Inne" };
    const name = fallback[category] || fallback.other;
    const icons = { bills: "🧾", shopping: "🛒", other: "📌" };
    return `${icons[category] || icons.other} ${name}`;
  }
  const keys = { bills: "charts.bills", shopping: "charts.shopping", other: "charts.other" };
  const icons = { bills: "🧾", shopping: "🛒", other: "📌" };
  return `${icons[category] || icons.other} ${t(keys[category] || keys.other)}`;
};

export const getPriorityLabel = (priority, t) => {
  if (!t) {
    const fallback = { high: "Wysoki", low: "Niski", normal: "Normalny" };
    return fallback[priority] || fallback.normal;
  }
  const keys = { high: "paymentCard.priorityHigh", low: "paymentCard.priorityLow", normal: "paymentCard.priorityNormal" };
  return t(keys[priority] || keys.normal);
};
