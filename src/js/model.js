import { URL } from "./config.js";

export const state = {
  notes: [],
  selectedNote: {},
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
//TODO refactor params
export const updateNote = async (
  id,
  { newName, newCategory, newContent, newMentioned }
) => {
  try {
    state.notes = state.notes.map((item) => {
      console.log(item);
      if (item.id == id) {
        item.name = newName;
        item.category = newCategory;
        item.content = newContent;
        item.mentioned = newMentioned;
      }
      return item;
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
