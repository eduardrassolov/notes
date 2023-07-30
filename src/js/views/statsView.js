class StatsView {
  constructor() {
    this._parentElement = document.querySelector(".stats-table-content");
    this._data;
  }

  render(data) {
    this._data = data;
    console.log(data);
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup() {
    const markup = `
            <tr class="row">>
                <td>Number of notes</td>
                <td>1</td>  
                <td>2</td>  
            </tr>
        `;
    return markup;
  }
}
