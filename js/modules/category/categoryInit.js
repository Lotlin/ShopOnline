import {renderHeaderCartItemsCount} from '../header/headerRender.js';
import {renderCategoryPage} from './categoryRender.js';

export const init = () => {
  renderCategoryPage();
  renderHeaderCartItemsCount();
};
