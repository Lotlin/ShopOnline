import {footerElem} from './footerGetElemets.js';
import {
  isClickedBuyersMenu, isClickedCatalogMenu, toggleCatalogMenu,
  toggleBuyersMenu,
} from './footerService.js';

export const footerControl = () => {
  footerElem.addEventListener('click', ({target}) => {
    if (isClickedCatalogMenu(target)) {
      toggleCatalogMenu();
    }

    if (isClickedBuyersMenu(target)) {
      toggleBuyersMenu();
    }
  });
};
