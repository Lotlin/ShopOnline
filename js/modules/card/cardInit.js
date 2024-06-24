import {renderGoodPage} from './cardRender.js';
import {addCartBtnControl} from './cardControl.js';
import {renderHeaderCartItemsCount} from '../header/headerRender.js';

export const cardInit = async () => {
  await renderGoodPage();
  addCartBtnControl();
  renderHeaderCartItemsCount();
};
