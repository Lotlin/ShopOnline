import {getUrlGetParam} from '../service.js';
import {loadCategoryName} from './categoryGetData.js';

export const getImgName = (dbImgData) => {
  let imgName = dbImgData;

  const substring1 = 'image/';
  const substring2 = '.jpg';

  imgName = imgName.replace(substring1, '');
  imgName = imgName.replace(substring2, '');

  return imgName;
};

export const isDiscounted = (good) => good.discount;

export const getCategoryName = async () => {
  const categoryId = getUrlGetParam();
  const categoryName = await loadCategoryName(categoryId);

  return categoryName;
};

