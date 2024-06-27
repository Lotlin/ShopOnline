import {renderBlogList, renderPagination} from './blogRender.js';
import {blogControl} from './blogControl.js';
import {footerInit} from '../footer/footerInit.js';
import {headerInit} from '../header/headerInit.js';

export const blogInit = () => {
  renderBlogList();
  renderPagination();
  blogControl();
  headerInit();
  footerInit();
};
