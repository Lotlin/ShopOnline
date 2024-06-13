import {addToCart, getUrlGetParam} from '../service.js';
import {getAddCartBtn, getGoodDataElements} from './cardGetElements.js';
import {
  getGoodImgUrl, getGoodPrice, getGoodElemTextContent,
} from './cardService.js';


export const addCartBtnControl = () => {
  const addCartBtn = getAddCartBtn();

  addCartBtn.addEventListener('click', () => {
    const goodId = getUrlGetParam();
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
