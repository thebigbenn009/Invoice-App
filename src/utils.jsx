export const calculateTotal = (state) => {
  const total = state.formData.items
    .map((item) => item.total)
    .reduce((a, b) => a + b, 0);
  return total;
};
export function formatDate(date) {
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Function to add ordinal suffix to the day (e.g., 7th, 11th, 23rd)
  function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return day + "th";
    }
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  }

  const formattedDate = `${getOrdinalSuffix(day)} ${month} ${year}`;
  return formattedDate;
}

const today = new Date();
const formattedToday = formatDate(today);

export const calculateDueDate = (paymentTerm) => {
  const currentDate = new Date();
  let dueDate = new Date(currentDate);
  switch (paymentTerm) {
    case "1 day":
      dueDate.setDate(currentDate.getDate() + 1);
      break;
    case "1 week":
      dueDate.setDate(currentDate.getDate() + 7);
      break;
    case "2 weeks":
      dueDate.setDate(currentDate.getDate() + 14);
      break;
    case "1 month":
      dueDate.setMonth(currentDate.getMonth() + 1); // Add 1 month
      break;
    default:
      break;
  }
  const formattedDate = formatDate(dueDate);
  return formattedDate;
};
console.log(calculateDueDate("2 weeks"));
