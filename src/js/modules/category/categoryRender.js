import {getUrlGetParam} from '../service.js';
import {categoryTitle} from './categoryGetElements.js';
import {loadCategoryName} from './categoryGetData.js';


export const renderCategoryTitle = async () => {
  const categoryId = getUrlGetParam();
  categoryTitle.textContent = await loadCategoryName(categoryId);
};
