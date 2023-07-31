"use strict";
import { loadNotes, deleteNote, deleteAllNotes } from "../model/crud.js";
import {
  filterNotes,
  archiveNote,
  state,
  archiveAllNotes,
} from "../model/model.js";
import notesView from "../views/notesView.js";
import statsView from "../views/statsView.js";
import { calcStats } from "../model/stats.js";
import { filterArchived } from "../config.js";

/**
 * Controller for the loadnotes
 */
async function controlGetNotes() {
  try {
    await loadNotes();
    controlStats();
    filterNotes();
    notesView.render(state.notes);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Controller for the delete note
 * @param {string} id
 */
async function controlDeleteNote(id) {
  try {
    await deleteNote(id);
    controlStats();
    filterNotes(state.filter);
    notesView.render(state.notes);
  } catch (err) {
    console.error(err);
  }
}

async function controlDeleteAllNotes() {
  try {
    await deleteAllNotes();
    controlStats();
    filterNotes(state.filter);
    notesView.render(state.notes);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Controller for the archive/deachive note
 * @param {string} id
 */
async function controlArchiveNote(id) {
  try {
    await archiveNote(id);
    controlStats();
    filterNotes(state.filter);
    notesView.render(state.notes);
  } catch (err) {
    console.error(err);
  }
}
export const controlArchiveAellNote = async () => {
  try {
    await archiveAllNotes();
    controlStats();
    filterNotes(state.filter);
    notesView.render(state.notes);
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 * @param {*} param0
 */
async function controlFilterNotes({ target }) {
  try {
    const value = target.value;
    filterNotes(filterArchived[value]);
    notesView.render(state.notes);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Controller for the calc and render stats
 */
function controlStats() {
  calcStats();
  statsView.render(state.stats);
}

export {
  controlStats,
  controlGetNotes,
  controlDeleteNote,
  controlDeleteAllNotes,
  controlArchiveNote,
  controlFilterNotes,
};
