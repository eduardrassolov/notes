"use strict";
import { loadNotes, deleteNote } from "../model/crud.js";
import { filterNotes, archiveNote, state } from "../model/model.js";
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
    notesView.render(state.allNotes);
    controlStats();
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
    notesView.render(state.allNotes);
    controlStats();
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
    notesView.render(state.allNotes);
    controlStats();
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 * @param {*} param0
 */
async function controlFilterNotes({ target }) {
  try {
    const value = target.value;
    await filterNotes(filterArchived[value]);
    notesView.render(state.allNotes);
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
  controlArchiveNote,
  controlFilterNotes,
};
