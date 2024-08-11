import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currPage = this._data.page;

    const numberOfPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    // Page 1, and there are other pages
    if (currPage === 1 && numberOfPages > 1) {
      return this._generateButtonMarkUp('next', currPage);
    }

    // Last page
    if (currPage === numberOfPages && numberOfPages > 1) {
      return this._generateButtonMarkUp('prev', currPage);
    }

    // Other page button
    if (currPage < numberOfPages) {
      return this._generateButtonMarkUp('both', currPage);
    }
    // Page 1 and there NO other page
    return '';
  }

  _generateButtonMarkUp(direction, currPage) {
    const next = `
       <button data-goto='${
         currPage + 1
       }' class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
              <svg class="search__icon">
                 <use href="${icons}#icon-arrow-right"></use>
             </svg>
       </button>`;

    const prev = `
       <button data-goto="${
         currPage - 1
       }" class="btn--inline pagination__btn--prev">
             <svg class="search__icon">
                 <use href="${icons}#icon-arrow-left"></use>
             </svg>
             <span>Page ${currPage - 1}</span>
       </button>
    `;

    if (direction === 'next') return next;
    if (direction === 'prev') return prev;
    if (direction === 'both') return next + prev;
    return '';
  }
}

export default new PaginationView();
