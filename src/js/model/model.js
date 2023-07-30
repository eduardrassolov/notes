import { filterArchived, ARCHIVE_ALL } from "../config.js";

export const state = {
  allNotes: [],
  notes: [],
  filter: filterArchived.active,
  selectedNote: {},
  stats: [],
};

export const archiveNote = async (id) => {
  try {
    state.allNotes = state.allNotes.map((note) => {
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
    state.selectedNote = state.allNotes.find((note) => note.id == id);
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
