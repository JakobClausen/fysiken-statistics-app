// Converts excel dates into readable dates
const ExcelDateToJSDate = (date) => {
  return new Date(
    Math.round((date - 25569) * 86400 * 1000)
  ).toLocaleDateString();
};
// Converts excel time into readable time
const ExcelTimeToJStime = (time) => {
  const hour = new Date((time - (25567 + 1)) * 86400 * 1000).getHours();
  let minute = new Date((time - (25567 + 1)) * 86400 * 1000).getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  const clock = `${hour}:${minute}`;
  return clock;
};

module.exports = { ExcelDateToJSDate, ExcelTimeToJStime };
