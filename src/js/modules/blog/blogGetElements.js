export const blogList = document.querySelector('.blog__list');

export const pagination = document.querySelector('.pagination');
export const paginationList =
  pagination.querySelector('.pagination__list-numbers');
export const paginationRightArrow =
  pagination.querySelector('.pagination__arrow-right');
export const paginationLeftArrow =
  pagination.querySelector('.pagination__arrow-left');
export const getRenderedPaginationList = () =>
  pagination.querySelectorAll('.pagination__number');
export const getpaginationPagesNumWrapper = () =>
  pagination.querySelector('.pagination__list-numbers');
export const getRenderedPaginationLink = () =>
  pagination.querySelectorAll('.pagination__link');
