import {fetchRequest} from '../service.js';
import {CATEGORIES_URL, GOODS_URL} from '../data.js';

export const loadCategoryName = async (id) => {
  const categoriesNameArr = await fetchRequest(CATEGORIES_URL, {});
  const categoryName = categoriesNameArr[id];

  return categoryName;
};

export const loadCategoryGoodsData = async (categoryName) => {
  const allGoodsInCategory = [];

  const fetchData = await fetchRequest(GOODS_URL, {});
  const totalGoodsPages = fetchData.pages;

  for (let i = 0; i < totalGoodsPages; i++) {
    const dbpageData = await fetchRequest(`${GOODS_URL}?page=${i + 1}`, {});
    const goodsPageData = dbpageData.goods;

    goodsPageData.forEach(good => {
      if (good.category === categoryName) {
        allGoodsInCategory.push(good);
      }
    });
  }

  return allGoodsInCategory;
};
