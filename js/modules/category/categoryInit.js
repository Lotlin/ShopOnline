import {renderCategoryPage} from './categoryRender.js';
import {headerInit} from '../header/headerInit.js';
import {footerInit} from '../footer/footerInit.js';

export const init = () => {
  renderCategoryPage();
  headerInit();
  footerInit();
};
