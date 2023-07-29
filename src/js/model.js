import { URL } from "./config.js";

export const state = {
  notes: [],
};

export const loadNotes = async () => {
  try {
    const res = await fetch(URL);
    const notes = await res.json();

    if (!res.status) throw new Error(`${data.message} (${res.status})`);

    state.notes = [...notes];
  } catch (err) {
    console.error(err);
  }
};
export const deleteNote = async (id) => {
  try {
    //TODO change filter !==
    state.notes = state.notes.filter((note) => note.id != id);
  } catch (err) {
    console.error(err);
  }
};
export const archiveNote = async (id) => {
  console.log(id);
  try {
    state.notes = state.notes.map((note) => {
      if (note.id == id) {
        note.isArchived = !note.isArchived;
      }
      return note;
    });
  } catch (err) {
    console.error(err);
  }
};
