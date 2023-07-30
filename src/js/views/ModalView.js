/**
 * Parent class for all modal windows
 * @class
 */
export default class ModalView {
  _parentElement = document.querySelector(".modal-window");
  _overlay = document.querySelector(".overlay");

  _btnOpen;
  _btnClose;

  _form;
  _entryData;

  /**
   * Init button for open modal window
   * @param {string} btnName
   */
  constructor(btnName) {
    this._btnOpen = document.querySelector(btnName);
  }

  /**
   * init all event listeners and elements
   * @private
   */
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

  /**
   * Clean parent element
   * @private
   */
  _clean() {
    this._parentElement.innerHTML = "";
  }

  /**
   * Generate markup of dropdown element (category) for modal window
   * @private
   * @param {Map} data
   * @param {string} selected
   * @returns {string}
   */
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

  /**
   * Method render markup of modal window and init all event listeners inside
   * @private
   */
  render() {
    const markup = this._generateMarkup();
    this._clean();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._init();
  }

  /**
   * Method open modal window and render markup
   * @param {object} note
   */
  open(note) {
    this._overlay.classList.remove("hidden");
    this._parentElement.classList.remove("hidden");
    this._entryData = { ...note };
    this.render();
  }

  /**
   * Method close modal window
   */
  close() {
    this._overlay.classList.add("hidden");
    this._parentElement.classList.add("hidden");
  }
}
