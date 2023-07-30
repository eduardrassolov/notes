export const URL = "../src/data/data.json";

export const formatCreate = {
  month: "long",
  day: "numeric",
  year: "numeric",
};
export const formatMention = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

export const noteCategories = new Map(
  Object.entries({
    idea: "Idea",
    task: "Task",
    random: "Random Thought",
    quote: "Quote",
  })
);

export function getValueCategory(key) {
  return noteCategories.get(key);
}
