import {getCountOfLocalStorageCartItems, getLocalStorageCartItems} from '../service.js';
import {renderCart} from './cartRender.js';

export const cartInit = () => {
  const cartItems = getLocalStorageCartItems();

  renderCart(getCountOfLocalStorageCartItems(), cartItems);
};
