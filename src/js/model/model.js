import { filterArchived } from "../config.js";

/**
 * State of the app
 * @type {object}
 * @property {array} allNotes - all notes
 * @property {array} notes - filtered notes
 * @property {string} filter - filter status
 * @property {object} selectedNote - selected note. Used for edit note.
 * @property {array} stats - stats of the notes. Used for render stats.
 */
export const state = {
  allNotes: [],
  notes: [],
  filter: filterArchived.active,
  selectedNote: {},
  stats: [],
};

/**
 * Logic of of archive/dearchive note
 * @param {string} id
 */
export const archiveNote = async (id) => {
  try {
    state.allNotes = state.allNotes.map((note) => {
      if (note.id === id) {
        note.isArchived = !note.isArchived;
      }
      return note;
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const archiveAllNotes = async () => {
  try {
    state.allNotes = state.allNotes.map((note) => {
      note.isArchived = !note.isArchived;
      return note;
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Logic of find note by id
 * @param {string} id
 */
export const getNoteById = async (id) => {
  try {
    state.selectedNote = state.allNotes.find((note) => note.id === id);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const filterNotes = async (isArchived = false) => {
  state.filter = isArchived;
  try {
    if (isArchived === "all") return (state.notes = [...state.allNotes]);

    state.notes = state.allNotes.filter(
      (note) => note.isArchived === state.filter
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};
