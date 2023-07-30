import { URL, ARCHIVE_ALL, DELETE_ALL } from "../config.js";
import { state } from "./model.js";
import { filterNotes } from "./model.js";

export const loadNotes = async () => {
  try {
    const res = await fetch(URL);
    const allNotes = await res.json();
    if (!res.status) throw new Error(`${data.message} (${res.status})`);

    state.allNotes = [...allNotes];

    // filterNotes("all");
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
    state.allNotes.push(newNote);
  } catch (err) {
    console.error(err);
  }
};
export const deleteNote = async (id) => {
  try {
    //TODO change filter !==
    if (id === DELETE_ALL) return (state.allNotes = []);

    state.allNotes = state.allNotes.filter((note) => note.id != id);
  } catch (err) {
    console.error(err);
  }
};
export const updateNote = async (
  id,
  { newName, newCategory, newContent, newMention }
) => {
  try {
    state.allNotes = state.allNotes.map((item) => {
      console.log(item);
      if (item.id == id) {
        console.log("item", item);
        item.name = newName;
        item.category = newCategory;
        item.content = newContent;
        item.mentioned[item.mentioned.length - 1] === newMention
          ? ""
          : item.mentioned.push(newMention);
      }
      return item;
    });
  } catch (err) {
    console.error(err);
  }
};
