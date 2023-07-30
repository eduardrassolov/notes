import { formatTime } from "../services/formatTime";
import { formatCreate, formatMention, icons } from "../config";
import { getValueCategory } from "../services/getValueCategory.js";

/**
 * View for the notes
 * @class
 * @returns {object} New instance of NotesView
 * @public
 * @requires formatTime
 * @requires config
 * @requires getValueCategory
 */
class NotesView {
  _parentElement = document.querySelector(".table-content");
  _data;

  _clean() {
    this._parentElement.innerHTML = "";
  }
  _generateMarkup() {
    return `${this._data
      .map((note) => this._generateMarkupNote(note))
      .join("")}`;
  }

  /**
   * Generate markup of each note
   * @param {object} note
   * @private
   * @returns {string} Markup of note
   */
  _generateMarkupNote(note) {
    return `
        <tr class="row">
            <td class="cell cell-name">
              <div class="cell-name-container">
                <img src="${icons[note.category]}"/> 
                <span> ${note?.name}<span>
              </div>   
            </td>

            <td class="cell cell-created"><div class="cell-name-container"><span>${formatTime(
              note?.created,
              formatCreate
            )}</span></div></td>
            
            <td class="cell cell-category">${getValueCategory(
              note.category
            )}</td>
            
            <td class="cell cell-content">${note?.content}</td>

            <td class="cell-mention">${
              note.mentioned?.length
                ? this._generateMention(note.mentioned)
                : ""
            }</td>

            <td class="cell-operation">
              <div class="btns-cell">
                <a class="btn-edit" value=${note.id}>
                  <img src="public/edit.png" alt="edit"/>
                </a>

                <a class="btn-archive" value=${note.id}>
                  <img src="public/${
                    note.isArchived ? "unArchive" : "archive"
                  }.png" alt="archive"/>
                </a>

                <a class="btn-del" value=${note.id}>
                  <img src="public/delete.png" alt="delete"/>
                </a>        
              </div>
            </td>

        </tr>
        `;
  }
  /**
   * Generate markup of each dates of mention
   * @param {array} mentions
   * @returns {string} String of mentions
   */
  _generateMention(mentions) {
    return `${mentions
      .map((mention) => formatTime(mention, formatMention))
      .join(", ")}`;
  }

  /**
   * Render notes
   * @param {object} data
   */
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();

    this._clean();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Add handler for render, when page is loaded
   * @param {function} handler
   */
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  /**
   * Add handler for click on button
   * @param {function} handler Function for handling click on button
   * @param {string} btnName  Name of button
   */
  addHandlerBtn(handler, btnName) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(btnName);
      if (!btn) return;
      const value = btn.getAttribute("value");
      handler(value);
    });
  }
}

export default new NotesView();
