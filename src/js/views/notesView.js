import { formatTime } from "../services/formatTime";
import { formatCreate, formatMention, getValueCategory } from "../config";

class NotesView {
  _parentElement = document.querySelector(".table-content");
  _data;

  _clean() {
    this._parentElement.innerHTML = "";
  }
  _generateMarkup() {
    console.log(this._data);
    return `${this._data
      .map((note) => this._generateMarkupNote(note))
      .join("")}`;
  }

  _generateMarkupNote(note) {
    return `
        <tr class="row">
            <td class="cell cell-name">${note?.name}</td>
            <td class="cell cell-created">${formatTime(
              note?.created,
              formatCreate
            )}</td>
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
                <a class="btn-edit" value=${
                  note.id
                }><img src="public/edit.png" alt="edit"/></a>

                <a class="btn-archive" value=${
                  note.id
                }><img src="public/archive.png" alt="archive"/></a>

                <a class="btn-del" value=${
                  note.id
                }><img src="public/delete.png" alt="delete"/></a>        
              </div>
            </td>
        </tr>
        `;
  }
  _generateMention(mentions) {
    return `${mentions
      .map((mention) => formatTime(mention, formatMention))
      .join(", ")}`;
  }
  render(data) {
    this._data = data;

    const markup = this._generateMarkup();

    this._clean();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
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
