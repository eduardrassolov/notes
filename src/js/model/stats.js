import { state } from "./model";
import { noteCategories } from "../config.js";

/**
 * Logic of calc stats
 */
export const calcStats = () => {
  try {
    state.stats = [];
    noteCategories.forEach((_, key) =>
      state.stats.push(calcStatsByCategory(key))
    );
  } catch (err) {
    console.error(err);
  }
};

/**
 * Logic of calc stats(active, archived) by category
 * @param {string} category
 * @returns {object}
 *
 */
const calcStatsByCategory = (category) => {
  try {
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
