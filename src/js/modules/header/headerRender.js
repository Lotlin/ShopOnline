import {
  createElement, getCountOfLocalStorageCartItems, getLocalStorageCartItems,
} from '../service.js';
import {
  getHeaderCountElem, header, headerItemCartElem,
} from './headerGetElements.js';

export const renderHeaderCartItemsCount = () => {
  const cartItems = getLocalStorageCartItems();
  const countItemsInCart = getCountOfLocalStorageCartItems(cartItems);

  if (!countItemsInCart) {
    const headerCountElem = getHeaderCountElem();

    if (headerCountElem) {
      headerCountElem.remove();
    }

    return;
  }

  const headerCountElem = createElement('span', {
    className: 'header__user-cart-count',
    textContent: countItemsInCart,
  });

  headerItemCartElem.append(headerCountElem);
};
