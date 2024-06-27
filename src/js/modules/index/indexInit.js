import {renderCategoriesLinks} from './indexRender.js';
import {headerInit} from '../header/headerInit.js';
import {footerInit} from '../footer/footerInit.js';

export const init = async () => {
  renderCategoriesLinks();
  headerInit();
  footerInit();
};
