export function getLastMention(metions) {
  if (!metions?.length) return null;
  const last = metions[metions.length - 1];

  return `${new Date(last).toISOString().split("T")[0]}`;
}
