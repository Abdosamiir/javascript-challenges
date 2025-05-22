import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', currentPage + 1);
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', currentPage - 1);
    }

    // Other page
    if (currentPage < numPages) {
      return `
        ${this._generateMarkupButton('next', currentPage + 1)}
        ${this._generateMarkupButton('prev', currentPage - 1)}
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton(type, pageNum) {
    return `
      <button data-goto="${pageNum}" class="btn--inline pagination__btn--${type}">
        ${
          type === 'prev'
            ? `<svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
             </svg>`
            : ''
        }
        <span>Page ${pageNum}</span>
        ${
          type === 'next'
            ? `<svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
             </svg>`
            : ''
        }
      </button>
    `;
  }
}

export default new PaginationView();
