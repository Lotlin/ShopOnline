import {getDiscountedPrice} from '../service.js';
import {downPaymentFraction} from './cardData.js';
import {getGoodDataElements} from './cardGetElements.js';

export const getDownPayment = (price, discount) =>
  Math.round(getDiscountedPrice(price, discount) * downPaymentFraction);

export const getRecommendedGoodInCategory = (allGoodsInCategory, goodId) => {
  const recomendedGoodsInCategory = [];

  for (let i = 0; i < allGoodsInCategory.length; i++) {
    if (allGoodsInCategory[i].id !== goodId) {
      recomendedGoodsInCategory.push(allGoodsInCategory[i]);
    }
  }

  return recomendedGoodsInCategory;
};

export const getGoodPrice = (priceElem) =>
  Number(priceElem.textContent.split(' ')[0]);
export const getGoodImgUrl = (goodImgElem) => goodImgElem.getAttribute('src');
export const getGoodElemTextContent = (goodElem) => goodElem.textContent;

export const getGoodCardData = () => {
  const {
    titleElem,
    priceElem,
    imgELem,
    newPriceElem,
    oldPriceElem,
    creditPriceElem,
  } = getGoodDataElements();


  const goodPrice = getGoodPrice(priceElem);
  const goodImage = getGoodImgUrl(imgELem);
  const goodTitle = getGoodElemTextContent(titleElem);
  const newPrice = getGoodElemTextContent(newPriceElem);
  const oldPrice = getGoodElemTextContent(oldPriceElem);
  const creditPrice = getGoodElemTextContent(creditPriceElem);

  return {
    goodPrice,
    goodImage,
    goodTitle,
    newPrice,
    oldPrice,
    creditPrice,
  };
};
