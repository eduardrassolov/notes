export function formatTime(dateTime) {
  if (!dateTime) return "";

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return new Date(dateTime).toLocaleDateString("en-US", options);
}
