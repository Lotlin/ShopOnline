import {
  createElement, getUrlGetParam, getImgName, getDiscountedPrice, fetchRequest,
  arrIsEmpty,
} from '../service.js';
import {GOODS_URL} from '../data.js';
import {
  crumbsContainer, cardContainer, recommendetContainer,
} from './cardGetElements.js';
import {getDbGoodData, getCategoryId} from './cardGetData.js';
import {fotoPath, favoriteBtnSvg, bellSvg, numRecommGoods} from './cardData.js';
import {getDownPayment, getRecommendedGoodInCategory} from './cardService.js';
import {
  loadCategoryName, loadCategoryGoodsData,
} from '../category/categoryGetData.js';

const renderGoodCrumbs = async (good, categoryId) => {
  const categoryCrumbsElem = createElement('p', {
    className: 'crumbs__elem',
  });
  const categoryLink = createElement('a', {
    href: `category.html?id=${categoryId}`,
    textContent: good.category,
  });

  categoryCrumbsElem.append(categoryLink);

  const goodCrumbsElem = createElement('p', {
    className: 'crumbs__elem',
  });
  const goodLink = createElement('a', {
    href: '#',
    textContent: good.title,
  });

  goodCrumbsElem.append(goodLink);

  crumbsContainer.append(categoryCrumbsElem, goodCrumbsElem);
};

const renderGoodTitle = (goodTitle) => {
  const title = createElement('h1', {
    className: 'card__title',
    textContent: goodTitle,
  });

  return title;
};

const renderDiscount = (dBdiscount, elem) => {
  if (dBdiscount) {
    const discount = createElement('div', {
      className: 'card__discount discount discount--card',
      ariaLabel: 'скидка',
      textContent: `-${dBdiscount}%`,
    });

    elem.append(discount);
  }
};

const renderPicture = (imgName) => {
  const picture = createElement('picture', {
    className: 'card__img',
  });
  const source1 = createElement('source', {
    'srcset': `${fotoPath}/${imgName}.avif`,
    'type': 'image/avif',
  });
  const source2 = createElement('source', {
    'srcset': `${fotoPath}/${imgName}.webp`,
    'type': 'image/webp',
  });
  const img = createElement('img', {
    'src': `${fotoPath}/${imgName}.jpg`,
  });

  picture.append(source1, source2, img);

  return picture;
};

const renderCardPrice = (price, discount) => {
  const cardPrice = createElement('div', {
    className: 'card__price-wrapper',
  });

  const newPrice = createElement('p', {
    className: 'card__new-price',
    textContent: `${getDiscountedPrice(price, discount)} ₽`,
  });

  const oldPrice = createElement('p', {
    className: 'card__old-price',
  });

  if (discount) {
    oldPrice.textContent = `${price} ₽`;
  }

  const creditPrice = createElement('p', {
    className: 'card__credit-price',
    textContent: `В кредит от ${getDownPayment(price, discount)} ₽`,
  });

  cardPrice.append(newPrice, oldPrice, creditPrice);

  return cardPrice;
};

const renderCardBtns = () => {
  const btnsWrapper = createElement('div', {
    className: 'card__btns-wrapper',
  });

  const addCartBtn = createElement('button', {
    className: 'card__cart-btn',
    textContent: 'Добавить в корзину',
  });

  const favoriteBtn = createElement('button', {
    className: 'card__favorite-btn',
    innerHTML: `${favoriteBtnSvg}`,
  });

  btnsWrapper.append(addCartBtn, favoriteBtn);

  return btnsWrapper;
};

const renderDeliveryInfo = () => {
  const deliveryWrapper = createElement('div', {
    className: 'card__delivery-wrapper',
  });

  const deliverySpan = createElement('span', {
    className: 'card__delivery-title',
    textContent: 'Доставка',
  });

  const delivery = createElement('p', {
    className: 'card__delivery',
    textContent: '2-4 рабочих дня',
  });

  delivery.prepend(deliverySpan);

  const sallerSpan = createElement('span', {
    className: 'card__delivery-title',
    textContent: 'Продавец',
  });

  const saller = createElement('p', {
    className: 'card__saller',
    textContent: 'ShopOnline',
  });

  saller.prepend(sallerSpan);

  deliveryWrapper.append(delivery, saller);

  return deliveryWrapper;
};

const renderFindOut = () => {
  const findOut = createElement('div', {
    className: 'card__find-out',
  });

  const bell = createElement('button', {
    className: 'card__bell',
    innerHTML: `${bellSvg}`,
  });

  const findOutBtn = createElement('button', {
    className: 'card__find-out-btn',
    textContent: 'Узнать о снижении цены',
  });

  findOut.append(bell, findOutBtn);

  return findOut;
};

const renderCardInfo = (price, discount) => {
  const cardInfo = createElement('div', {
    className: 'card__info',
  });

  const cardPrice = renderCardPrice(price, discount);
  const btns = renderCardBtns();
  const delivery = renderDeliveryInfo();
  const findOut = renderFindOut();

  cardInfo.append(cardPrice, btns, delivery, findOut);

  return cardInfo;
};

const renderGoodItem = (Dbdiscount, img, price) => {
  const goodItem = createElement('div', {
    className: 'card__good',
  });

  renderDiscount(Dbdiscount, goodItem);

  const imgName = getImgName(img);
  const picture = renderPicture(imgName);

  goodItem.append(picture);

  const cardInfo = renderCardInfo(price, Dbdiscount);
  goodItem.append(cardInfo);

  return goodItem;
};

const renderDescription = (dBdescription) => {
  const descriptionWrapper = createElement('div', {
    className: 'card__description',
  });

  const descriptionTitle = createElement('h2', {
    className: 'card__description-title',
    textContent: 'Описание:',
  });

  const description = createElement('p', {
    className: 'card__description-text',
    textContent: `${dBdescription}`,
  });

  descriptionWrapper.append(descriptionTitle, description);

  return descriptionWrapper;
};

const renderGoodCard = (good) => {
  const title = renderGoodTitle(good.title);
  const goodItem = renderGoodItem(good.discount, good.image, good.price);
  const description = renderDescription(good.description);

  cardContainer.append(title, goodItem, description);
};

const renderRecommGoodPicture = (image) => {
  const picture = createElement('picture', {
    className: 'good__img',
  });

  const imgName = getImgName(image);

  const source1 = createElement('source', {
    'srcset': `${fotoPath}/${imgName}.avif`,
    'type': 'image/avif',
  });
  const source2 = createElement('source', {
    'srcset': `${fotoPath}/${imgName}.webp`,
    'type': 'image/webp',
  });
  const img = createElement('img', {
    'src': `${fotoPath}/${imgName}.jpg`,
  });

  picture.append(source1, source2, img);

  return picture;
};

const renderRecommDiscount = (discount, elem) => {
  if (discount) {
    const discountElem = createElement('div', {
      className: 'good__discount discount',
      ariaLabel: 'скидка',
      textContent: `-${discount}%`,
    });

    elem.append(discountElem);
  }
};

const renderRecommPriceWrapper = (price, discount) => {
  const priceWrapper = createElement('div', {
    className: 'good__price-wrapper',
  });

  const newPrice = createElement('p', {
    className: 'good__price good__price--new',
    textContent: `${getDiscountedPrice(price, discount)} ₽`,
  });

  const oldPrice = createElement('p', {
    className: 'good__price good__price--old good',
  });

  if (discount) {
    oldPrice.textContent = `${price} ₽`;
  }

  priceWrapper.append(newPrice, oldPrice);

  return priceWrapper;
};

const renderRecommTitle = (title) => {
  const goodTitle = createElement('h3', {
    className: 'good__title',
    textContent: title,
  });

  return goodTitle;
};

const renderRecommGoodLink = (good) => {
  const itemLink = createElement('a', {
    className: 'good__link',
    href: `card.html?id=${good.id}`,
  });

  const picture = renderRecommGoodPicture(good.image);
  itemLink.append(picture);

  renderRecommDiscount(good.discount, itemLink);

  const priceWrapper = renderRecommPriceWrapper(good.price, good.discount);
  itemLink.append(priceWrapper);

  const title = renderRecommTitle(good.title);

  itemLink.append(title);

  return itemLink;
};

const renderRecomendedItem = (good) => {
  const item = createElement('li', {
    className: 'additional__item good',
  });

  const itemLink = renderRecommGoodLink(good);

  item.append(itemLink);

  return item;
};

const renderRecommGoods = (good) => {
  const recommendedItem = renderRecomendedItem(good);
  recommendetContainer.append(recommendedItem);
};

const renderRecommendationSection = async (allGoodsInCategory, goodId) => {
  const goodArr = getRecommendedGoodInCategory(allGoodsInCategory, goodId);

  if (!arrIsEmpty(goodArr)) {
    goodArr.forEach(good => {
      renderRecommGoods(good);
    });
  } else {
    const allGoods = (await fetchRequest(GOODS_URL, {})).goods;

    for (let i = 0; i < numRecommGoods; i++) {
      if (allGoods[i].id === goodId) {
        renderRecommGoods(allGoods[numRecommGoods]);
      } else {
        renderRecommGoods(allGoods[i]);
      }
    }
  }
};

export const renderGoodPage = async () => {
  const goodId = getUrlGetParam();
  const goodDbData = await getDbGoodData(goodId);
  const categoryId = await getCategoryId(goodDbData.category);
  const categoryName = await loadCategoryName(categoryId);
  const allGoodsInCategory = await loadCategoryGoodsData(categoryName);

  renderGoodCrumbs(goodDbData, categoryId);
  renderGoodCard(goodDbData);
  renderRecommendationSection(allGoodsInCategory, goodId);
};
