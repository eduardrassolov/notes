import { formatMention, noteCategories } from "../config.js";
import { formatTime } from "../services/formatTime.js";
import ModalView from "./ModalView.js";

class EditNoteView extends ModalView {
  constructor() {
    super(".btn-edit");
    // this.render();
  }
  _generateMarkup() {
    const { id, name, category, content, mentioned } = this._entryData;
    console.log(category);
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

            <input type="date" id="newMention" name="newMention" value=${this._getLastMention(
              mentioned
            )} />
          </div>

          <div class="form-footer">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-close-modal">Cancel</button>
          </div>
        </form>`;
  }
  _getLastMention(metions) {
    if (!metions.length) return null;
    const last = metions[metions.length - 1];

    return `${new Date(last).toISOString().split("T")[0]}`;
  }
  addHandlerSubmit(handler, id) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log(this._form);
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      if (!data.newName.trim() || !data.newContent.trim())
        return alert("Please fill out all fields");

      handler(data);
    });
  }
}

export default new EditNoteView();
