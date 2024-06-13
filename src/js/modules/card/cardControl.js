import {addToCart, getUrlGetParam} from '../service.js';
import {getAddCartBtn} from './cardGetElements.js';
import {getGoodCardData} from './cardService.js';

export const addCartBtnControl = () => {
  const addCartBtn = getAddCartBtn();

  addCartBtn.addEventListener('click', () => {
    const goodId = getUrlGetParam();

    const {
      goodPrice,
      goodImage,
      goodTitle,
      newPrice,
      oldPrice,
      creditPrice,
    } = getGoodCardData();

    addToCart(
        goodId,
        goodPrice,
        goodImage,
        goodTitle,
        newPrice,
        oldPrice,
        creditPrice,
    );
  });
};
