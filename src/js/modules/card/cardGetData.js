import {fetchRequest} from '../service.js';
import {GOODS_URL} from '../data.js';
import {loadCategoryData} from '../index/indexGetData.js';

export const getDbGoodData = async (id) => {
  const dbGoodData = await fetchRequest(`${GOODS_URL}/${id}`, {});

  return {
    id: dbGoodData.id,
    category: dbGoodData.category,
    count: dbGoodData.count,
    description: dbGoodData.description,
    image: dbGoodData.image,
    price: dbGoodData.price,
    units: dbGoodData.units,
    title: dbGoodData.title,
    discount: dbGoodData.discount,
  };
};

export const getCategoryId = async (categoryName) => {
  const dbCagtegoriesData = await loadCategoryData();
  let categoryId = NaN;
  for (let i = 0; i < dbCagtegoriesData.length; i++) {
    if (dbCagtegoriesData[i] === categoryName) {
      categoryId = i;
    }
  }

  return categoryId;
};
