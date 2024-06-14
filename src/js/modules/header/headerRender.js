import {createElement, getCountOfLocalStorageCartItems} from '../service.js';
import {headerItemCartElem} from './headerGetElements.js';

export const renderHeaderCartItemsCount = () => {
  const countItemsInCart = getCountOfLocalStorageCartItems();

  if (!countItemsInCart) {
    return;
  }

  const headerCountElem = createElement('span', {
    className: 'header__user-cart-count',
    textContent: countItemsInCart,
  });

  headerItemCartElem.append(headerCountElem);
};
