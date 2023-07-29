class AddNoteView {
  _modal = document.querySelector(".add-note-window");
  _form = document.querySelector(".form-note");
  _firstInput = this._modal.querySelector("input");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".btn-add-note");
  _btnClose = document.querySelector(".btn-close-modal");

  constructor() {
    this._addHandlerShow();
    this._addHandlerHide();
  }

  _addHandlerShow() {
    this._btnOpen.addEventListener("click", this.toggle.bind(this));
  }
  _addHandlerHide() {
    this._btnClose.addEventListener("click", this.toggle.bind(this));
    this._overlay.addEventListener("click", this.toggle.bind(this));
  }

  toggle() {
    this._overlay.classList.toggle("hidden");
    this._modal.classList.toggle("hidden");
    this._form.reset();
    this._firstInput.focus();
  }

  addHandlerSubmit(handler) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddNoteView();
