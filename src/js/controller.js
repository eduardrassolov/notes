"use strict";
import { async } from "regenerator-runtime";
import * as model from "./model.js";
import notesView from "./views/notesView.js";
import addNoteView from "./views/addNoteView.js";
import editNoteView from "./views/editNoteView.js";
import { ARCHIVE_ALL, DELETE_ALL, filterArchived } from "./config.js";

const BTN_DELETE_ALL = document.querySelector(".btn-delete-all");
const BTN_ARCHIVE_ALL = document.querySelector(".btn-archive-all");
const DD_FILTER = document.querySelector(".note-filter");

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
    console.log("archvied");
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
async function controlEditNote(id, note) {
  console.log(id, note);
  try {
    await model.updateNote(id, note);
    notesView.render(model.state.notes);
    editNoteView.close();
  } catch (err) {
    console.error(err);
  }
}
async function controlFilterNotes({ target }) {
  try {
    const value = target.value;
    await model.filterNotes(filterArchived[value]);
    notesView.render(model.state.notes);
  } catch (err) {
    console.error(err);
  }
}

function controllOpenAdd() {
  addNoteView.open();
  addNoteView.addHandlerSubmit(controlAddNote);
}
function controlOpenEdit(id) {
  model.getNoteById(id);
  const note = model.state.selectedNote;

  editNoteView.open(note);
  editNoteView.addHandlerSubmit(controlEditNote, note.id);
}

function init() {
  notesView.addHandlerRender(controlGetNotes);

  notesView.addHandlerBtn(controlOpenEdit, ".btn-edit");
  notesView.addHandlerBtn(controlDeleteNote, ".btn-del");
  notesView.addHandlerBtn(controlArchiveNote, ".btn-archive");

  addNoteView.addHandlerBtn(controllOpenAdd);

  BTN_DELETE_ALL.addEventListener("click", () => controlDeleteNote(DELETE_ALL));
  BTN_ARCHIVE_ALL.addEventListener("click", () =>
    controlArchiveNote(ARCHIVE_ALL)
  );
  DD_FILTER.addEventListener("change", controlFilterNotes);
}
init();
