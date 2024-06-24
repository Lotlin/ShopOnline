import {loadCategoryData} from './indexGetData.js';
import {categoriesLinks} from './indexGetElem.js';


export const renderCategoriesLinks = async () => {
  const categories = await loadCategoryData();

  const categoriesNum = categories.length;

  const categoriesLinksNum = categoriesLinks.length;

  for (let i = 0; i < categoriesLinksNum && i < categoriesNum; i++) {
    categoriesLinks[i].href = `category.html?id=${i}`;
  }
};
