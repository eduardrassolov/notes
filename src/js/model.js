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
export const createNote = async (note) => {
  try {
    console.log("in", note);
    const newNote = {
      id: crypto.randomUUID(),
      isArchived: false,
      created: new Date(),
      name: note.newName,
      category: note.newCategory,
      content: note.newContent,
      mentioned: [note.newMention],
    };

    console.log("out", newNote);
    state.notes.push(newNote);
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
export const updateNote = async (id, note) => {
  try {
    state.notes = state.notes.map((el) => {
      if (el.id == id) {
        el.name = note.name;
        el.category = note.category;
        el.content = note.content;
        el.mentioned = note.mentioned;
      }
      return el;
    });
  } catch (err) {
    console.error(err);
  }
};
