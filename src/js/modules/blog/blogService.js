import {getRenderedPaginationList} from './blogGetElements.js';

export const isFirstPage = (pageNumber) => pageNumber === 1;

export const makePaginationElemActive = (elem) => {
  elem.classList.add('pagination__number--active');
};

export const removePaginationElemActive = (elem) => {
  elem.classList.remove('pagination__number--active');
};

export const getPaginationFirstElem = () => getRenderedPaginationList()[0];

export const getPaginationLastElem = () =>
  getRenderedPaginationList()[getRenderedPaginationList().length - 1];

export const getPaginationFirstPageNum = () =>
  Number(getPaginationFirstElem().textContent);

export const getPaginationLastPageNum = () =>
  Number(getPaginationLastElem().textContent);

export const makeLeftArrowDisabled = (arrow) => {
  arrow.classList.add('pagination__arrow-left--disabled');
};

export const removeLeftArrowDisabled = (arrow) => {
  arrow.classList.remove('pagination__arrow-left--disabled');
};

export const makeRightArrowDisabled = (arrow) => {
  arrow.classList.add('pagination__arrow-right--disabled');
};

export const removeRightArrowDisabled = (arrow) => {
  arrow.classList.remove('pagination__arrow-right--disabled');
};

export const checkIfPageNumExitInDb = (totalPages) =>
  getPaginationLastPageNum() < totalPages;

export const getArticleLinkId = (link) => link.href.split('=').pop();
