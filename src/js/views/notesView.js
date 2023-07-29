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
        <tr>
            <td>${note?.name}</td>
            <td>${note?.created}</td>
            <td>${note?.category}</td>
            <td>${note?.content}</td>
            <td>${note?.mentioned}</td>
            <td class="btns-cell">
              <button class="btn-edit" value=${note.id}>E</button>
              <button class="btn-archive" value=${note.id}>A</button>
              <button class="btn-del" value=${note.id}>D</button>
            </td>
        </tr>
        `;
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
      const { value } = btn;
      handler(value);
    });
  }
}

export default new NotesView();
