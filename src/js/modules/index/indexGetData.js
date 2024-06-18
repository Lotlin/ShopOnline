import {fetchRequest} from '../service.js';
import {CATEGORIES_URL} from '../API.js';

export const loadCategoryData = async () => {
  const categoriesArr = await fetchRequest(CATEGORIES_URL, {});
  return categoriesArr;
};
