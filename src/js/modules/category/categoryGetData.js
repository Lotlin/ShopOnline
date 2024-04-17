import {fetchRequest} from '../service.js';
import {CATEGORIES_URL} from '../data.js';

export const loadCategoryName = async (id) => {
  const categoriesNameArr = await fetchRequest(CATEGORIES_URL, {});
  const categoryName = categoriesNameArr[id];

  return categoryName;
};
