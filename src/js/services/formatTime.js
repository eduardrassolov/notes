export function formatTime(dateTime, options) {
  if (!dateTime) return "";
  return new Date(dateTime).toLocaleDateString("en-US", options);
}
