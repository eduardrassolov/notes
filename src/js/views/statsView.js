import { getValueCategory, icons } from "../config.js";

class StatsView {
  _parentElement;
  constructor() {
    this._parentElement = document.querySelector(".stats-table-content");
  }

  render(data) {
    this._data = data;
    console.log(data);
    const markup = this._generateMarkup(data);

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup(data) {
    return data
      .map((option) => {
        return `
          <tr class="row">
              <td class="cell">
                <div class="cell-name-container">
                  <img src="${icons[option.key]}"/> 
                  <span> ${getValueCategory(option.key)}<span>
                </div>   
              </td>
              <td class="cell">${option.active}</td>
              <td class="cell">${option.archived}</td>
          </tr>
        `;
      })
      .join(" ");
  }
}

export default new StatsView();
