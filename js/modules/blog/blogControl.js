import {
  paginationRightArrow, paginationLeftArrow, getpaginationPagesNumWrapper,
  getRenderedPaginationList, getRenderedPaginationLink,
} from './blogGetElements.js';
import {renderBlogList, renderPagination} from './blogRender.js';
import {PAGINATION_PACE} from './blogData.js';
import {loadBlogData} from './blogGetData.js';
import {
  getPaginationFirstElem, getPaginationLastElem,
  getPaginationFirstPageNum, makePaginationElemActive, makeLeftArrowDisabled,
  removeLeftArrowDisabled, makeRightArrowDisabled, removeRightArrowDisabled,
  checkIfPageNumExitInDb, isFirstPage, removePaginationElemActive,
} from './blogService.js';

const paginationRightArowControl = () => {
  paginationRightArrow.addEventListener('click', async () => {
    const DbTotalPages = (await loadBlogData()).totalPages;

    removeLeftArrowDisabled(paginationLeftArrow);

    if (checkIfPageNumExitInDb(DbTotalPages)) {
      const pageNumber = getPaginationFirstPageNum() + PAGINATION_PACE;

      renderBlogList(pageNumber);

      if (pageNumber > (DbTotalPages - PAGINATION_PACE)) {
        const leftPages = DbTotalPages - pageNumber + 1;
        await renderPagination(pageNumber, leftPages);
      } else {
        await renderPagination(pageNumber);
      }

      makePaginationElemActive(getPaginationFirstElem());

      if (!checkIfPageNumExitInDb(DbTotalPages)) {
        makeRightArrowDisabled(paginationRightArrow);
      }
    }
  });
};

const paginationLeftArowControl = () => {
  paginationLeftArrow.addEventListener('click', async () => {
    removeRightArrowDisabled(paginationRightArrow);

    const pageNumber = getPaginationFirstPageNum() - PAGINATION_PACE;

    if (pageNumber > 0) {
      await renderPagination(pageNumber);

      renderBlogList(getPaginationLastElem().textContent);

      makePaginationElemActive(getPaginationLastElem());

      if (isFirstPage) {
        makeLeftArrowDisabled(paginationLeftArrow);
        removePaginationElemActive(getPaginationFirstElem());
      }
    }
  });
};

const paginationPageNumberControl = () => {
  const paginationPagesNumWrapper = getpaginationPagesNumWrapper();
  paginationPagesNumWrapper.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target;
    const renderedPaginationElem = getRenderedPaginationList();
    const renderedPaginationLinksList = getRenderedPaginationLink();
    const totalPaginationPagesNum = renderedPaginationLinksList.length;
    for (let i = 0; i < totalPaginationPagesNum; i++) {
      if (renderedPaginationLinksList[i] === target) {
        renderBlogList(renderedPaginationElem[i].textContent);
        makePaginationElemActive(renderedPaginationElem[i]);
      } else {
        removePaginationElemActive(renderedPaginationElem[i]);
      }
    }
  });
};

export const blogControl = () => {
  paginationRightArowControl();
  paginationLeftArowControl();
  paginationPageNumberControl();
};
