import {createElement} from '../service.js';
import {
  cartChooseAllElem, cartItemsCountElem, cartItemsListElem,
} from './cartGetElements.js';


export const renderCartItemsCount = (countOfProductsInCart) => {
  cartItemsCountElem.textContent = countOfProductsInCart;
};

export const renderEmptyCartMessage = () => {
  const epmtyCartMessage = createElement('li', {
    className: 'cart-form__empty-message',
    textContent: 'Корзина пуста',
  });

  cartItemsListElem.append(epmtyCartMessage);
};

export const renderCartChooseAllElem = () => {
  const label = createElement('label', {
    className: 'cart-form__label',
  });

  const checkBox = createElement('input', {
    className: 'cart-form__checkbox cart-form__choose-all',
    type: 'checkbox',
  });

  const span = createElement('span', {
    textContent: 'Выбрать все',
  });

  label.append(checkBox, span);

  const basketSvg = createElement('svg', {
    className: 'cart-form__basket cart-form__basket--all',
  });

  cartChooseAllElem.append(label, basketSvg);
};

export const renderCartItemDetails = (details) => {
  const detailsElemsArr = [];

  // eslint-disable-next-line guard-for-in
  for (const key in details) {
    const detailElem = createElement('p', {
      className: 'cart-form__good-detail',
      textContent: `${key}: ${details[key]}`,
    });
    detailsElemsArr.push(detailElem);
  }

  return detailsElemsArr;
};

export const renderImgWrapper = (imgUrl) => {
  const imgWrapper = createElement('div', {
    className: 'cart-form__img-wrapper',
  });

  const label = createElement('label', {
    className: 'cart-form__good-label',
  });

  const checkBox = createElement('input', {
    className: 'cart-form__checkbox cart-form__checkbox--good',
    type: 'checkbox',
  });

  label.append(checkBox);

  const img = createElement('img', {
    'className': 'cart-form__good-img',
    'src': imgUrl,
  });

  imgWrapper.append(label, img);

  return imgWrapper;
};

export const renderDescription = (title, details) => {
  const description = createElement('div', {
    className: 'cart-form__good-description',
  });

  const itemTitle = createElement('h2', {
    className: 'cart-form__good-title',
    textContent: title,
  });

  description.append(itemTitle);

  const detailElements = renderCartItemDetails(details);

  if (detailElements.length) {
    detailElements.forEach(detailElem => {
      description.append(detailElem);
    });
  } else {
    const detailElem = createElement('p', {
      className: 'cart-form__good-detail',
      textContent: 'Дополнительная информация: отсутствует',
    });

    description.append(detailElem);
  }

  return description;
};

export const renderNumElem = (count) => {
  const numElem = createElement('div', {
    className: 'cart-form__good-num-wrapper',
  });

  const minusBtn = createElement('button', {
    className: 'cart-form__good-num cart-form__good-num--less',
    textContent: '-',
  });

  const countElem = createElement('p', {
    className: 'cart-form__good-num-num',
    textContent: count,
  });

  const plusBtn = createElement('button', {
    className: 'cart-form__good-num cart-form__good-num--more',
    textContent: '+',
  });

  numElem.append(minusBtn, countElem, plusBtn);

  return numElem;
};

export const renderPriceElem = (newPrice, oldPrice, creditPrice) => {
  const priceElem = createElement('div', {
    className: 'cart-form__price-wrapper',
  });

  const newPriceElem = createElement('p', {
    className: 'cart-form__price-wrapper',
    textContent: newPrice,
  });

  const oldPriceElem = createElement('p', {
    className: 'cart-form__price-old',
    textContent: oldPrice,
  });

  const creditPriceElem = createElement('p', {
    className: 'cart-form__price-credit',
    textContent: creditPrice,
  });

  priceElem.append(newPriceElem, oldPriceElem, creditPriceElem);

  return priceElem;
};

export const renderCartItemContentWrapper = (
    imgUrl,
    title,
    details,
    count,
    newPrice,
    oldPrice,
    creditPrice,
) => {
  const wrapper = createElement('div', {
    className: 'cart-form__item-wtapper',
  });

  const imgWrapper = renderImgWrapper(imgUrl);
  const description = renderDescription(title, details);
  const numElem = renderNumElem(count);
  const priceElem = renderPriceElem(newPrice, oldPrice, creditPrice);
  const basketSvg = createElement('svg', {
    className: 'cart-form__basket cart-form__basket--good',
  });

  wrapper.append(imgWrapper, description, numElem, priceElem, basketSvg);

  return wrapper;
};

// в макете корзины предусмотрена дополнительная информация,
// но в DB и в карточке товара нет, поэтому пока заглушка 'details')
export const renderCartItem = ({
  imgUrl,
  title,
  count,
  newPrice,
  oldPrice,
  creditPrice,
},
details = {},
) => {
  const cartItem = createElement('li', {
    className: 'cart-form__good-item',
  });

  const itemContentWrapper = renderCartItemContentWrapper(
      imgUrl,
      title,
      details,
      count,
      newPrice,
      oldPrice,
      creditPrice,
  );

  const line = createElement('div', {
    className: 'cart-form__line cart-form__line--good',
  });

  cartItem.append(itemContentWrapper, line);

  return cartItem;
};

export const renderCart = (countOfItemsInCart, cartItems) => {
  if (!countOfItemsInCart) {
    renderEmptyCartMessage();

    return;
  }

  renderCartItemsCount(countOfItemsInCart);
  renderCartChooseAllElem();
  cartItems.forEach(item => {
    console.log(item);
    const cartItem = renderCartItem(item);

    cartItemsListElem.append(cartItem);
  });
};
