import axios from "axios";
export const calculateTotal = (state) => {
  const total = state.inputData.items
    .map((item) => item.total)
    .reduce((a, b) => a + b, 0);
  return total;
};
export function getCurrentDate(date) {
  // const currentDate = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

// Example usage
// const formattedDate = getCurrentDate();
// console.log(formattedDate);

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
    case "1":
      dueDate.setDate(currentDate.getDate() + 1);
      break;
    case "7":
      dueDate.setDate(currentDate.getDate() + 7);
      break;
    case "14":
      dueDate.setDate(currentDate.getDate() + 14);
      break;
    case "30":
      dueDate.setMonth(currentDate.getMonth() + 1); // Add 1 month
      break;
    default:
      break;
  }
  const formattedDate = getCurrentDate(dueDate);
  return formattedDate;
};
console.log(calculateDueDate("1"));

// Function to check if any value in an object is empty
export const hasEmptyValues = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      if (hasEmptyValues(obj[key])) {
        return true;
      }
    } else if (
      obj[key] === "" ||
      (Array.isArray(obj[key]) && obj[key].length === 0)
    ) {
      return true;
    }
  }
  return false;
};
/////GENERATING UNIQUE ID
export const generateUniqueId = (invoiceData) => {
  const existingInvoiceIds = invoiceData.map((invoice) => invoice.id);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const getRandomLetter = () => {
    return letters[Math.floor(Math.random() * letters.length)];
  };
  const getRandomNumber = () =>
    Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

  const generateId = () => {
    const id = `${getRandomLetter()}${getRandomLetter()}${getRandomNumber()}`;
    // Check if the generated ID already exists in the array
    if (existingInvoiceIds.includes(id)) {
      return generateId();
    }
    return id;
  };
  return generateId();
};

export const getCurrency = async (countryName) => {
  try {
    const { data } = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
    );

    const countryData = data[0];
    console.log(countryData.currencies);
    const currency = Object.keys(countryData.currencies)[0];
    // console.log(currency);
    const { symbol } = countryData.currencies[currency];
    // console.log(symbol);
  } catch (error) {
    console.error("Error fetching currency", error);
    return null;
  }
};
export const isEmpty = (obj) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
};
