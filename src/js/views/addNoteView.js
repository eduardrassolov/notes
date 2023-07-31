import ModalView from "./ModalView.js";
import { noteCategories } from "../config.js";

/**
 * View for the add note
 * @extends ModalView
 * @class
 * @returns {object} New instance of AddNoteView
 * @public
 * @constructor
 * @requires ModalView
 * @requires config
 */
class AddNoteView extends ModalView {
  constructor() {
    super(".btn-add-note");
  }

  /**
   * Generate markup of modal window
   * @private
   * @returns {string} Markup of modal window
   */
  _generateMarkup() {
    return `
    <h3>Add new note:</h3>
        <form class="form-note">
          <div class="form-group">
            <label for="newName">Name:</label>
            <input
              required
              type="text"
              name="newName"
              autofocus
              placeholder="Enter name of note"
            />
          </div>

          <div class="form-group">
            <label for="newCategory">Category:</label>
            <select name="newCategory" id="newCategory" >
              ${this._generateMarkupDropDown(noteCategories)}
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
            ></textarea>
          </div>

          <div class="form-group">
            <label for="newMention">Date of mention:</label>

            <input type="date" id="newMention" name="newMention" />
          </div>

          <div class="form-footer">
            <button type="submit" class="btn btn-primary">Add</button>
            <button type="button" class="btn btn-close-modal">Cancel</button>
          </div>
        </form>`;
  }

  /**
   * Add event listener to the button for open modal window
   * @param {function} handler
   * @public
   */
  addHandlerBtn(handler) {
    this._btnOpen.addEventListener("click", handler);
  }

  /**
   * Add event listener to the form for submit event
   * @param {*} handler
   * @public
   */
  addHandlerSubmit(handler) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();

      try {
        const dataArr = [...new FormData(this)];
        const data = Object.fromEntries(dataArr);

        handler(data);
      } catch (err) {
        console.error(err);
      }
    });
  }
}

export default new AddNoteView();
