import {renderGoodPage} from './cardRender.js';
import {addCartBtnControl} from './cardControl.js';

export const cardInit = async () => {
  await renderGoodPage();
  addCartBtnControl();
};
