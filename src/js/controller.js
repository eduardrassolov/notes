"use strict";
import { async } from "regenerator-runtime";
import * as model from "./model.js";
import notesView from "./views/notesView.js";

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

function init() {
  notesView.addHandlerRender(controlGetNotes);
  notesView.addHandlerBtn(controlDeleteNote, ".btn-del");
  notesView.addHandlerBtn(controlArchiveNote, ".btn-archive");
}
init();
