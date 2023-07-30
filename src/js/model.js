import { ARCHIVE_ALL, DELETE_ALL, URL, filterArchived } from "./config.js";

export const state = {
  allNotes: [],
  notes: [],
  filter: filterArchived.active,
  archivedNotes: 0,
  selectedNote: {},
};

export const loadNotes = async () => {
  try {
    const res = await fetch(URL);
    const allNotes = await res.json();

    if (!res.status) throw new Error(`${data.message} (${res.status})`);

    state.allNotes = [...allNotes];

    filterNotes();
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
    if (id === DELETE_ALL) return (state.notes = []);

    state.notes = state.notes.filter((note) => note.id != id);
  } catch (err) {
    console.error(err);
  }
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
//TODO refactor params
export const updateNote = async (
  id,
  { newName, newCategory, newContent, newMention }
) => {
  try {
    state.notes = state.notes.map((item) => {
      console.log(item);
      if (item.id == id) {
        console.log("item", item);
        item.name = newName;
        item.category = newCategory;
        item.content = newContent;
        item.mentioned.push(newMention);
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
