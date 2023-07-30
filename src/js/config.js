export const URL = "../src/data/data.json";
export const DELETE_ALL = "all";
export const ARCHIVE_ALL = "all";
export const icons = {
  idea: "public/idea.png",
  task: "public/task.png",
  random: "public/random.png",
  quote: "public/quote.png",
};

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

export const filterArchived = {
  all: "all",
  archived: true,
  unarchived: false,
};

export function getValueCategory(key) {
  return noteCategories.get(key);
}
