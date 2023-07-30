import { state } from "./model";
import { noteCategories } from "../config.js";

const calcStatsByCategory = (category) => {
  try {
    console.log(category);
    const filteredNotes = state.allNotes.filter(
      (note) => note.category === category
    );
    const activeFilteredNotes = filteredNotes.reduce((acc, note) => {
      if (!note.isArchived) {
        acc++;
      }
      return acc;
    }, 0);

    return {
      key: category,
      active: activeFilteredNotes,
      archived: filteredNotes.length - activeFilteredNotes,
    };
  } catch (err) {
    console.error(err);
  }
};

export const calcStats = () => {
  try {
    console.log("TOTAL", state.allNotes.length);
    state.stats = [];
    noteCategories.forEach((_, key) =>
      state.stats.push(calcStatsByCategory(key))
    );
    console.log("stas", state.stats);
  } catch (err) {
    console.error(err);
  }
};
