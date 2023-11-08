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
console.log(formattedToday); // Output: "7th November 2023"
