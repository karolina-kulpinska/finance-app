export const getCategoryLabel = (category) => {
  switch (category) {
    case "bills":
      return "🧾 Rachunki";
    case "shopping":
      return "🛒 Zakupy";
    default:
      return "📌 Inne";
  }
};

export const getPriorityLabel = (priority) => {
  switch (priority) {
    case "high":
      return "Wysoki";
    case "low":
      return "Niski";
    default:
      return "Normalny";
  }
};
