import {getDiscountedPrice} from '../service.js';
import {downPaymentFraction} from './cardData.js';

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
