"use strict";
import { async } from "regenerator-runtime";
import * as model from "./model.js";
import notesView from "./views/notesView.js";
import addNoteView from "./views/addNoteView.js";
import editNoteView from "./views/editNoteView.js";

async function controlGetNotes() {
  try {
    await model.loadNotes();
    notesView.render(model.state.notes);
  } catch (err) {
    console.error(err);
  }
}
async function controlDeleteNote(id) {
  console.log("id", id);
  try {
    await model.deleteNote(id);
    notesView.render(model.state.notes);
  } catch (err) {
    console.error(err);
  }
}
async function controlArchiveNote(id) {
  try {
    await model.archiveNote(id);
    notesView.render(model.state.notes);
  } catch (err) {
    console.error(err);
  }
}
async function controlAddNote(note) {
  console.log("submit");
  try {
    await model.createNote(note);
    notesView.render(model.state.notes);
    addNoteView.close();
  } catch (err) {
    console.error(err);
  }
}
async function controlEditNote() {}

function controllOpenAdd() {
  addNoteView.open();
  addNoteView.addHandlerSubmit(controlAddNote);
}
function controlOpenEdit(id) {
  model.getNoteById(id);
  const note = model.state.selectedNote;
  editNoteView.open(note);
  editNoteView.addHandlerSubmit(controlEditNote);
}

function init() {
  notesView.addHandlerRender(controlGetNotes);

  notesView.addHandlerBtn(controlDeleteNote, ".btn-del");
  notesView.addHandlerBtn(controlArchiveNote, ".btn-archive");

  notesView.addHandlerBtn(controlOpenEdit, ".btn-edit");
  addNoteView.addHandlerBtn(controllOpenAdd);
}
init();
