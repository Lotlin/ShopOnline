export const crumbsContainer =
  document.querySelector('.crumbs__container--card');

export const cardContainer = document.querySelector('.card__container');

export const recommendetContainer =
  document.querySelector('.additional__list--card');

export const getAddCartBtn = () => document.querySelector('.card__cart-btn');

export const getGoodDataElements = () => {
  const cardElem = document.querySelector('.card');

  const titleElem = cardElem.querySelector('.card__title');
  const priceElem = cardElem.querySelector('.card__new-price');
  const imgELem = cardElem.querySelector('.card__img-img');
  const newPriceElem = cardElem.querySelector('.card__new-price');
  const oldPriceElem = cardElem.querySelector('.card__old-price');
  const creditPriceElem = cardElem.querySelector('.card__credit-price');

  return {
    titleElem,
    priceElem,
    imgELem,
    newPriceElem,
    oldPriceElem,
    creditPriceElem,
  };
};
