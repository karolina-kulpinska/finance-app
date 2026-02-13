export const getDateRange = (filter, customStart, customEnd) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (filter) {
    case "today": {
      return {
        start: today.toISOString().split("T")[0],
        end: today.toISOString().split("T")[0],
      };
    }

    case "week": {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return {
        start: weekStart.toISOString().split("T")[0],
        end: weekEnd.toISOString().split("T")[0],
      };
    }

    case "month": {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return {
        start: monthStart.toISOString().split("T")[0],
        end: monthEnd.toISOString().split("T")[0],
      };
    }

    case "year": {
      const yearStart = new Date(today.getFullYear(), 0, 1);
      const yearEnd = new Date(today.getFullYear(), 11, 31);
      return {
        start: yearStart.toISOString().split("T")[0],
        end: yearEnd.toISOString().split("T")[0],
      };
    }

    case "custom": {
      return {
        start: customStart,
        end: customEnd,
      };
    }

    default:
      return null;
  }
};

export const isDateInRange = (dateString, range) => {
  if (!range) return true;
  const date = new Date(dateString);
  const start = new Date(range.start);
  const end = new Date(range.end);
  return date >= start && date <= end;
};
