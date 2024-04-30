import {createElement, getUrlGetParam, getDiscountedPrice} from '../service.js';
import {getImgName, isDiscounted, getCategoryName} from './categoryService.js';
import {categoryTitle, categoryList} from './categoryGetElements.js';
import {loadCategoryName, loadCategoryGoodsData} from './categoryGetData.js';


const renderCategoryTitle = async () => {
  const categoryId = getUrlGetParam();
  categoryTitle.textContent = await loadCategoryName(categoryId);
};

const renderGoodItemLink = (good, imgName) => {
  const link = createElement('a', {
    className: 'good__link',
    href: `card.html?id=${imgName}`,
  });

  return link;
};

const renderGoodPicture = (imgName) => {
  const picture = createElement('picture', {
    className: 'good__img',
  });

  const source1 = createElement('source', {
    srcset: `img/category/${imgName}.avif,
      img/category/${imgName}-1200@2x.avif`,
    type: 'image/avif',
    width: 300,
    height: 295,
  });

  const source2 = createElement('source', {
    srcset: `img/category/${imgName}.webp,
      img/category/${imgName}-1200@2x.webp`,
    type: 'image/webp',
    width: 300,
    height: 295,
  });

  const source3 = createElement('source', {
    srcset: `img/category/${imgName}.jpg`,
    width: 300,
    height: 295,
  });

  const img = createElement('img', {
    src: `img/category/${imgName}.jpg`,
    width: 420,
    height: 295,
  });

  picture.append(source1, source2, source3, img);

  return picture;
};

const renderDiscountElem = (good) => {
  const discount = createElement('div', {
    className: 'good__discount discount',
    ariaLabel: `скидка ${good.discount}%`,
    textContent: `-${good.discount}%`,
  });

  return discount;
};

const renderGoodPiceWrapper = (good) => {
  const priceWrapper = createElement('div', {
    className: 'good__price-wrapper',
  });

  const newPrice = createElement('p', {
    className: 'good__price good__price--new',
  });

  if (isDiscounted(good)) {
    newPrice.ariaLabel = 'новая цена';
    newPrice.textContent = `${getDiscountedPrice(good.price, good.discount)} ₽`;

    const oldprice = createElement('p', {
      className: 'good__price good__price--old',
      ariaLabel: 'старая цена',
      textContent: `${good.price} ₽`,
    });

    priceWrapper.append(newPrice, oldprice);
  } else {
    newPrice.ariaLabel = 'цена';
    newPrice.textContent = `${good.price} ₽`;
    priceWrapper.append(newPrice);
  }

  return priceWrapper;
};

const renderGoodTitle = (good) => createElement('h3', {
  className: 'good__title',
  textContent: good.title,
});

const renderGoodItemElem = () => createElement('li', {
  className: 'additional__item good',
});

const renderGoodItem = (good) => {
  const imgName = getImgName(good.image);

  const item = renderGoodItemElem();

  const link = renderGoodItemLink(good, imgName);

  const picture = renderGoodPicture(imgName);
  link.append(picture);

  if (isDiscounted(good)) {
    const discountElem = renderDiscountElem(good);
    link.append(discountElem);
  }

  const priceWrapper = renderGoodPiceWrapper(good);
  const title = renderGoodTitle(good);
  link.append(priceWrapper, title);

  item.append(link);

  return item;
};

const renderCategoryList = async () => {
  const categoryName = await getCategoryName();
  const dbAllGoodsData = await loadCategoryGoodsData(categoryName);

  dbAllGoodsData.forEach(good => {
    const item = renderGoodItem(good);

    categoryList.append(item);
  });
};

export const renderCategoryPage = async () => {
  await renderCategoryTitle();
  await renderCategoryList();
};
