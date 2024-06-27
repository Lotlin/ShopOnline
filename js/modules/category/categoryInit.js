import {renderHeaderCartItemsCount} from '../header/headerRender.js';
import {renderCategoryPage} from './categoryRender.js';
import {headerInit} from '../header/headerInit.js';
import {footerInit} from '../footer/footerInit.js';

export const init = () => {
  renderCategoryPage();
  renderHeaderCartItemsCount();
  headerInit();
  footerInit();
};
