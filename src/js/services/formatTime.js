/**
 * Function to format date and time to a readable format
 * @param {string} dateTime
 * @param {object} options
 * @returns {string}
 */
export function formatTime(dateTime, options) {
  console.log(options);
  if (!dateTime) return "";
  return new Date(dateTime).toLocaleDateString("en-US", options);
}
