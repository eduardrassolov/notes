import addNoteView from "./views/addNoteView";
import notesView from "./views/notesView";
import {
  controllOpenAdd,
  controlOpenEdit,
} from "./controller/modalController.js";
import {
  controlArchiveNote,
  controlArchiveAellNote,
  controlDeleteNote,
  controlFilterNotes,
  controlGetNotes,
  controlDeleteAllNotes,
} from "./controller/controller";

export const BTN_DELETE_ALL = document.querySelector(".btn-delete-all");
export const BTN_ARCHIVE_ALL = document.querySelector(".btn-archive-all");
export const DD_FILTER = document.querySelector(".note-filter");

/**
 * Initialize the app
 * @returns {void}
 */

function init() {
  notesView.addHandlerRender(controlGetNotes);

  notesView.addHandlerBtn(controlOpenEdit, ".btn-edit");
  notesView.addHandlerBtn(controlDeleteNote, ".btn-del");
  notesView.addHandlerBtn(controlArchiveNote, ".btn-archive");

  addNoteView.addHandlerBtn(controllOpenAdd);

  BTN_DELETE_ALL.addEventListener("click", controlDeleteAllNotes);
  BTN_ARCHIVE_ALL.addEventListener("click", controlArchiveAellNote);
  DD_FILTER.addEventListener("change", controlFilterNotes);
}

init();
