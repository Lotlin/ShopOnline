import {burgerMenuControl} from '../header/headerControl.js';
import {renderBlogList, renderPagination} from './blogRender.js';
import {blogControl} from './blogControl.js';

export const blogInit = () => {
  renderBlogList();
  renderPagination();
  blogControl();
  burgerMenuControl();
};
