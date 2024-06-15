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

export const getGoodPrice = (priceElem, numOfElemInArr = 0) =>
  Number(priceElem.textContent.split(' ')[numOfElemInArr]);
export const getGoodImgUrl = (goodImgElem) => goodImgElem.getAttribute('src');
export const getGoodElemTextContent = (goodElem) => goodElem.textContent;

export const getGoodCardData = () => {
  const {
    titleElem,
    priceElem,
    imgELem,
    oldPriceElem,
    creditPriceElem,
  } = getGoodDataElements();

  const goodPrice = getGoodPrice(priceElem);
  const goodImage = getGoodImgUrl(imgELem);
  const goodTitle = getGoodElemTextContent(titleElem);
  const creditPrice = getGoodPrice(creditPriceElem, 3);
  let goodOldPrice = getGoodPrice(oldPriceElem);

  if (!goodOldPrice) {
    goodOldPrice = goodPrice;
  }

  return {
    goodPrice,
    goodImage,
    goodTitle,
    goodOldPrice,
    creditPrice,
  };
};
