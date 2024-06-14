import {burgerMenuControl} from '../header/headerControl.js';
import {renderBlogList, renderPagination} from './blogRender.js';
import {blogControl} from './blogControl.js';
import {renderHeaderCartItemsCount} from '../header/headerRender.js';

export const blogInit = () => {
  renderBlogList();
  renderPagination();
  renderHeaderCartItemsCount();
  blogControl();
  burgerMenuControl();
};
