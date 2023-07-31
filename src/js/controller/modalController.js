import addNoteView from "../views/addNoteView.js";
import editNoteView from "../views/editNoteView.js";
import { controlStats } from "./controller.js";
import { createNote, updateNote } from "../model/crud.js";
import notesView from "../views/notesView.js";
import { filterNotes, getNoteById, state } from "../model/model.js";

/**
 * Controller for the open modal for new note
 */
function controllOpenAdd() {
  addNoteView.open();
  addNoteView.addHandlerSubmit(controlAddNote);
}

/**
 * Controller for the open modal for edit note
 * @param {string} id
 */
function controlOpenEdit(id) {
  getNoteById(id);
  const note = state.selectedNote;
  editNoteView.open(note);
  editNoteView.addHandlerSubmit(controlEditNote, note.id);
}

/**
 * Controller for the add new note
 * @param {object} note
 */
async function controlAddNote(note) {
  try {
    if (!note.newName.trim() || !note.newContent.trim())
      throw new Error("Please fill in all fields");

    await createNote(note);

    filterNotes(state.filter);
    notesView.render(state.notes);

    addNoteView.close();
    controlStats();
  } catch (err) {
    console.error(err);
    addNoteView.showErrorMessage(err.message);
  }
}

/**
 * Controller for the edit note
 * @param {string} id
 * @param {object} updatedNote
 */
async function controlEditNote(id, note) {
  try {
    if (!note.newName.trim() || !note.newContent.trim())
      throw new Error("Please fill in all fields");

    await updateNote(id, note);
    filterNotes(state.filter);
    notesView.render(state.notes);
    editNoteView.close();
    controlStats();
  } catch (err) {
    console.error(err);
    editNoteView.showErrorMessage(err.message);
  }
}

export { controllOpenAdd, controlOpenEdit, controlAddNote, controlEditNote };
