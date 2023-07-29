"use strict";
import { async } from "regenerator-runtime";
import * as model from "./model.js";
import notesView from "./views/notesView.js";
import addNoteView from "./views/addNoteView.js";

async function controlGetNotes() {
  try {
    await model.loadNotes();
    notesView.render(model.state.notes);
  } catch (err) {
    console.error(err);
  }
}
async function controlDeleteNote(id) {
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
  try {
    await model.createNote(note);
    notesView.render(model.state.notes);
  } catch (err) {
    console.error(err);
  }
}

function init() {
  notesView.addHandlerRender(controlGetNotes);
  notesView.addHandlerBtn(controlDeleteNote, ".btn-del");
  notesView.addHandlerBtn(controlArchiveNote, ".btn-archive");

  addNoteView.addHandlerSubmit(controlAddNote);
}
init();
