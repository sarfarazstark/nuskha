import icons from 'url:../../img/icons.svg';

export default class View {
  _parentElement = document.querySelector('.recipe');
  _data;
  _errorMessage;
  _message;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markUp = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newMarkUp = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkUp);

    const newElement = Array.from(newDOM.querySelectorAll('*'));

    const currElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElement.forEach((newEl, i) => {
      const currEl = currElement[i];

      // Updates changed text
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(currEl))
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
     <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
        <div>
          <svg>
             <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
        <div>
          <svg>
             <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
