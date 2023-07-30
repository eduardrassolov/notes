import addNoteView from "../views/addNoteView.js";
import editNoteView from "../views/editNoteView.js";
import { controlStats } from "./controller.js";
import { createNote, updateNote } from "../model/crud.js";
import notesView from "../views/notesView.js";
import { getNoteById, state } from "../model/model.js";

function controllOpenAdd() {
  addNoteView.open();
  addNoteView.addHandlerSubmit(controlAddNote);
}
function controlOpenEdit(id) {
  getNoteById(id);
  const note = state.selectedNote;
  editNoteView.open(note);
  editNoteView.addHandlerSubmit(controlEditNote, note.id);
}

async function controlAddNote(note) {
  try {
    await createNote(note);
    notesView.render(state.allNotes);
    addNoteView.close();
    controlStats();
  } catch (err) {
    console.error(err);
  }
}
async function controlEditNote(id, note) {
  console.log(id, note);
  try {
    await updateNote(id, note);
    notesView.render(state.allNotes);
    editNoteView.close();
    controlStats();
  } catch (err) {
    console.error(err);
  }
}

export { controllOpenAdd, controlOpenEdit, controlAddNote, controlEditNote };
