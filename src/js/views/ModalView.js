export default class ModalView {
  _parentElement = document.querySelector(".modal-window");
  _overlay = document.querySelector(".overlay");

  _btnOpen;
  _btnClose;

  _form;
  _entryData;

  constructor(btnName) {
    this._btnOpen = document.querySelector(btnName);
  }

  _clean() {
    this._parentElement.innerHTML = "";
  }

  open(note) {
    this._overlay.classList.remove("hidden");
    this._parentElement.classList.remove("hidden");
    this._entryData = { ...note };
    this.render();
  }
  close() {
    this._overlay.classList.add("hidden");
    this._parentElement.classList.add("hidden");
  }

  render() {
    const markup = this._generateMarkup();
    this._clean();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._init();
  }
  _generateMarkupDropDown(data, selected = null) {
    let markUp = "";
    data.forEach((value, key) => {
      markUp += `<option 
                    value="${key}" 
                    ${key === selected ? "selected" : ""}>
                    ${value}
                  </option>`;
    });
    return markUp;
  }

  _init() {
    this._btnClose = document.querySelector(".btn-close-modal");
    this._form = document.querySelector(".form-note");

    this._btnClose.addEventListener("click", this.close.bind(this));

    // set min date to date picker
    const currentDate = new Date().toISOString().split("T")[0];
    this._form
      .querySelector('input[type="date"]')
      .setAttribute("min", currentDate);
  }
}
