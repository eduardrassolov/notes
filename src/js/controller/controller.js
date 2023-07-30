"use strict";
import { loadNotes, deleteNote } from "../model/crud.js";
import { filterNotes, archiveNote } from "../model/model.js";
import { state } from "../model/model.js";
import notesView from "../views/notesView.js";
import addNoteView from "../views/addNoteView.js";

import { controllOpenAdd, controlOpenEdit } from "./modalController.js";

import statsView from "../views/statsView.js";
import { ARCHIVE_ALL, DELETE_ALL, filterArchived } from "../config.js";
import { calcStats } from "../model/stats.js";

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
    notesView.render(state.allNotes);
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

export { controlStats };
