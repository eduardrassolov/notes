import { URL } from "../config.js";
import { state } from "./model.js";

/**
 * Logic of load notes
 */
export const loadNotes = async () => {
  try {
    const res = await fetch(URL);
    const allNotes = await res.json();
    if (!res.status) throw new Error(`${res.message} (${res.status})`);

    state.allNotes = [...allNotes];
  } catch (err) {
    console.error(err);
  }
};

/**
 * Logic of create new note
 * @param {object} note
 */
export const createNote = async (note) => {
  try {
    const newNote = {
      id: crypto.randomUUID(),
      isArchived: false,
      created: new Date(),
      name: note.newName,
      category: note.newCategory,
      content: note.newContent,
      mentioned: [note.newMention],
    };
    state.allNotes.push(newNote);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Logic of delete note
 * @param {string} id
 */
export const deleteNote = async (id) => {
  try {
    state.allNotes = state.allNotes.filter((note) => note.id !== id);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteAllNotes = async () => {
  try {
    return (state.allNotes = []);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Logic of update note
 * @param {string} id
 * @param {object} updatedNote
 */
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
    throw err;
  }
};
