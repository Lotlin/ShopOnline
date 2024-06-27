import {renderGoodPage} from './cardRender.js';
import {addCartBtnControl} from './cardControl.js';
import {headerInit} from '../header/headerInit.js';
import {footerInit} from '../footer/footerInit.js';

export const cardInit = async () => {
  await renderGoodPage();
  addCartBtnControl();
  headerInit();
  footerInit();
};
