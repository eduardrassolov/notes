import { URL, filterArchived, ARCHIVE_ALL, DELETE_ALL } from "../config.js";

export const state = {
  allNotes: [],
  notes: [],
  filter: filterArchived.active,
  selectedNote: {},
  stats: [],
};

export const archiveNote = async (id) => {
  try {
    state.notes = state.notes.map((note) => {
      if (note.id == id || id === ARCHIVE_ALL) {
        note.isArchived = !note.isArchived;
      }
      return note;
    });
  } catch (err) {
    console.error(err);
  }
};
export const getNoteById = async (id) => {
  try {
    //TODO don't forget to change find !== to !===
    state.selectedNote = state.notes.find((note) => note.id == id);
  } catch (err) {
    console.error(err);
  }
};
//TODO refactor params

export const filterNotes = async (isArchived = false) => {
  console.log("status", isArchived);
  try {
    if (isArchived === "all") return (state.notes = [...state.allNotes]);

    state.notes = state.allNotes.filter(
      (note) => note.isArchived === isArchived
    );

    console.log(state.notes);
  } catch (err) {
    console.error(err);
  }
};
