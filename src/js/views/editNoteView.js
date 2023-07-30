import ModalView from "./ModalView.js";
import { noteCategories } from "../config.js";
import { getLastMention } from "../services/getLastDateMention.js";

/**
 * View for the edit note
 * @extends ModalView
 * @class
 * @returns {object} New instance of EditNoteView
 * @public
 * @requires ModalView
 * @requires config
 * @requires getLastMention
 */
class EditNoteView extends ModalView {
  constructor() {
    super(".btn-edit");
  }

  /**
   * Generate markup of edit modal window
   * @returns {string} Markup of edit modal window
   */
  _generateMarkup() {
    const { name, category, content, mentioned } = this._entryData;
    return `
    <h3>Edit note:</h3>
        <form class="form-note">
          <div class="form-group">
            <label for="newName">Name:</label>
            <input
            value="${name}"
              required
              type="text"
              name="newName"
              autofocus
              placeholder="Enter name of note"
            />
          </div>

          <div class="form-group">
            <label for="newCategory">Category:</label>
            <select name="newCategory" id="newCategory">
            ${this._generateMarkupDropDown(noteCategories, category)}
            </select>
          </div>

          <div class="form-group">
            <label for="newContent">Content:</label>
            <textarea
              required
              name="newContent"
              rows="4"
              id="newContent"
              placeholder="Enter content of the note"
            >${content}</textarea>
          </div>

          <div class="form-group">
            <label for="newMention">Date of mention:</label>

            <input type="date" id="newMention" name="newMention" value=${getLastMention(
              mentioned
            )} />
          </div>

          <div class="form-footer">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-close-modal">Cancel</button>
          </div>
        </form>`;
  }

  /**
   * Add handler for submit form
   * @param {function} handler Callback function for submit form
   * @param {string} id
   */
  addHandlerSubmit(handler, id) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      if (!data.newName.trim() || !data.newContent.trim())
        return alert("Please fill out all fields");

      handler(id, data);
    });
  }
}

export default new EditNoteView();
