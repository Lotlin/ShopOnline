import {renderArticlePage} from './articleRender.js';
import {footerInit} from '../footer/footerInit.js';
import {headerInit} from '../header/headerInit.js';

export const articleInit = async () => {
  await renderArticlePage();
  headerInit();
  footerInit();
};

