function formatDateToDDMMYYYY(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 as months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function generateRandomDate() {
  const currentYear = new Date().getFullYear();
  const randomMonth = Math.floor(Math.random() * 12) + 1; // 1 to 12
  const randomDay = Math.floor(Math.random() * 31) + 1; // 1 to 31 (assuming the maximum days in a month)
  const randomHour = Math.floor(Math.random() * 24); // 0 to 23
  const randomMinute = Math.floor(Math.random() * 60); // 0 to 59
  const randomSecond = Math.floor(Math.random() * 60); // 0 to 59

  const randomDate = new Date(currentYear, randomMonth - 1, randomDay, randomHour, randomMinute, randomSecond);
  return formatDateToDDMMYYYY(randomDate)
}