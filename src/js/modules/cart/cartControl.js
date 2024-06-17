import {cartElem} from './cartGetElements.js';
import {cartItemCountService, isCountBtnClicked} from './cartService.js';

export const countBtnControl = () => {
  cartElem.addEventListener('click', ({target}) => {
    const clickedCountdBtn = isCountBtnClicked(target);

    if (clickedCountdBtn) {
      cartItemCountService(target, clickedCountdBtn);
    }
  });
};

export const cartControl = () => {
  countBtnControl();
};
