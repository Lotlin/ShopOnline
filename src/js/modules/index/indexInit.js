import {mainPageControl} from './indexControl.js';
import {renderCategoriesLinks} from './indexRender.js';

export const init = async () => {
  mainPageControl();
  renderCategoriesLinks();
};
