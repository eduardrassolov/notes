"use strict";
import { async } from "regenerator-runtime";

import { loadNotes, deleteNote, createNote, updateNote } from "./model/crud.js";
import { filterNotes, getNoteById, archiveNote } from "./model/model.js";
import { state } from "./model/model.js";
import notesView from "./views/notesView.js";
import addNoteView from "./views/addNoteView.js";
import editNoteView from "./views/editNoteView.js";
import statsView from "./views/statsView.js";
import { ARCHIVE_ALL, DELETE_ALL, filterArchived } from "./config.js";
import { calcStats } from "./model/stats.js";

const BTN_DELETE_ALL = document.querySelector(".btn-delete-all");
const BTN_ARCHIVE_ALL = document.querySelector(".btn-archive-all");
const DD_FILTER = document.querySelector(".note-filter");

async function controlGetNotes() {
  try {
    await loadNotes();

    notesView.render(state.allNotes);
    controlStats();
  } catch (err) {
    console.error(err);
  }
}

async function controlDeleteNote(id) {
  try {
    await deleteNote(id);
    notesView.render(state.allNotes);
    controlStats();
  } catch (err) {
    console.error(err);
  }
}
async function controlArchiveNote(id) {
  try {
    await archiveNote(id);
    console.log("archvied");
    notesView.render(state.allNotes);
    // controlStats();
  } catch (err) {
    console.error(err);
  }
}
async function controlAddNote(note) {
  console.log("submit");
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
async function controlFilterNotes({ target }) {
  try {
    const value = target.value;
    await filterNotes(filterArchived[value]);
    notesView.render(state.allNotes);
  } catch (err) {
    console.error(err);
  }
}

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
function controlStats() {
  calcStats();
  statsView.render(state.stats);
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
