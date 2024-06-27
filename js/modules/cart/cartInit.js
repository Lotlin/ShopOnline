import {
  getCountOfLocalStorageCartItems, getLocalStorageCartItems,
} from '../service.js';
import {cartControl} from './cartControl.js';
import {renderCart} from './cartRender.js';
import {headerInit} from '../header/headerInit.js';
import {footerInit} from '../footer/footerInit.js';

export const cartInit = () => {
  const cartItems = getLocalStorageCartItems();

  renderCart(getCountOfLocalStorageCartItems(cartItems), cartItems);
  cartControl();
  headerInit();
  footerInit();
};
