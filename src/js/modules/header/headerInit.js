import {headerControl} from './headerControl.js';
import {renderHeaderCartItemsCount} from './headerRender.js';

export const headerInit = () => {
  headerControl();
  renderHeaderCartItemsCount();
};
