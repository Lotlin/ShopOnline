import {
  createElement, disableElem, getLocalStorageCartItems,
} from '../service.js';
import {
  cartChooseAllElem, cartItemsCountElem, cartItemsListElem,
  cartSection,
  cartSubmitBtn,
  deliveryInfoElem, getDeliveryAllImgsList, totalDeliveryInfoElem,
  totalItemsCountELem, totalItemsDiscountElem, totalItemsOldPriceElem,
  totalPriceElem,
} from './cartGetElements.js';
import {
  getCartTotalItemsCount, getCartTotalItemsOldPrice, getCartTotalPrice,
  getDeliveryDate, getCartTotalDiscount,
} from './cartService.js';


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

  const basketSvg = createElement('button', {
    className: 'cart-form__basket cart-form__basket--all',
    disabled: true,
    type: 'button',
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
    type: 'button',
  });

  const countElem = createElement('p', {
    className: 'cart-form__good-num-num',
    textContent: count,
  });

  const plusBtn = createElement('button', {
    className: 'cart-form__good-num cart-form__good-num--more',
    textContent: '+',
    type: 'button',
  });

  numElem.append(minusBtn, countElem, plusBtn);

  return numElem;
};

export const renderPriceElem = (price, oldPrice, creditPrice, count) => {
  const priceElem = createElement('div', {
    className: 'cart-form__price-wrapper',
  });

  const totalElemPrice = price * count;

  const newPriceElem = createElement('p', {
    className: 'cart-form__price',
    textContent: `${totalElemPrice.toLocaleString('ru-RU')} ₽`,
  });

  const oldPriceElem = createElement('p', {
    className: 'cart-form__price-old',
  });

  if (oldPrice !== price) {
    const totalOldPrice = oldPrice * count;
    oldPriceElem.textContent = `${totalOldPrice.toLocaleString('ru-RU')} ₽`;
  }

  const totalCreditPrice = creditPrice * count;

  const creditPriceElem = createElement('p', {
    className: 'cart-form__price-credit',
    textContent: `В кредит от ${totalCreditPrice.toLocaleString('ru-RU')} ₽`,
  });

  priceElem.append(newPriceElem, oldPriceElem, creditPriceElem);

  return priceElem;
};

export const renderCartItemContentWrapper = (
    imgUrl,
    title,
    details,
    count,
    price,
    oldPrice,
    creditPrice,
) => {
  const wrapper = createElement('div', {
    className: 'cart-form__item-wtapper',
  });

  const imgWrapper = renderImgWrapper(imgUrl);
  const description = renderDescription(title, details);
  const numElem = renderNumElem(count);
  const priceElem = renderPriceElem(price, oldPrice, creditPrice, count);
  const basketSvg = createElement('button', {
    className: 'cart-form__basket cart-form__basket--good',
    disabled: true,
    type: 'button',
  });

  wrapper.append(imgWrapper, description, numElem, priceElem, basketSvg);

  return wrapper;
};

// в макете корзины предусмотрена дополнительная информация,
// но в DB и в карточке товара допю. инф. нет, поэтому пока заглушка 'details')
export const renderCartItem = ({
  imgUrl,
  title,
  count,
  price,
  oldPrice,
  creditPrice,
  id,
},
details = {},
) => {
  const cartItem = createElement('li', {
    className: 'cart-form__good-item',
  });

  cartItem.dataset.id = id;

  const itemContentWrapper = renderCartItemContentWrapper(
      imgUrl,
      title,
      details,
      count,
      price,
      oldPrice,
      creditPrice,
  );

  const line = createElement('div', {
    className: 'cart-form__line cart-form__line--good',
  });

  cartItem.append(itemContentWrapper, line);

  return cartItem;
};

export const renderDeliveryDate = (deliveryDate) => {
  const deliveryDateElem = createElement('p', {
    className: 'cart-form__delivery-date',
    textContent: deliveryDate,
  });

  return deliveryDateElem;
};

export const renderGoodInfoFieldSet = (cartItems) => {
  renderCartChooseAllElem();
  cartItems.forEach(item => {
    const cartItem = renderCartItem(item);

    cartItemsListElem.append(cartItem);
  });
};

export const renderDeliveryImg = (imgPath) => {
  const imgElem = createElement('img', {
    className: 'cart-form__delivery-img',
    src: imgPath,
  });

  return imgElem;
};

export const renderDeliveryAllImgs = (cartItems) => {
  const imgsWrapper = createElement('ul', {
    className: 'cart-form__delivery-desc cart-form__delivery-desc--imgages',
  });

  cartItems.forEach(item => {
    const li = createElement('li');
    const imgELem = renderDeliveryImg(item.imgUrl);

    li.append(imgELem);
    imgsWrapper.append(li);
  });

  return imgsWrapper;
};

export const renderDeliveryFieldset = (cartItems, deliveryDate) => {
  const deliveryDateElem = renderDeliveryDate(deliveryDate);
  const deliveryAllImgs = renderDeliveryAllImgs(cartItems);

  deliveryInfoElem.append(deliveryDateElem, deliveryAllImgs);
};

export const renderTotalPrice = (totalPrice) => {
  totalPriceElem.textContent = `${totalPrice.toLocaleString('ru-RU')} ₽`;
};

export const renderTotalCountAndFullPrice = (totalCount, totalOldPrice) => {
  totalItemsCountELem.textContent = `${totalCount} шт.`;
  totalItemsOldPriceElem.textContent =
    `${totalOldPrice.toLocaleString('ru-RU')} ₽`;
};

export const renderTotalDiscount = (totalDiscount) => {
  totalItemsDiscountElem.textContent =
    `${totalDiscount.toLocaleString('ru-RU')} ₽`;
};

export const renderTotalFieldsetDeliveryDate = (deliveryDate) => {
  if (!deliveryDate) {
    totalDeliveryInfoElem.textContent = '';

    return;
  }

  totalDeliveryInfoElem.textContent = 'Дата: ';

  const date = createElement('span', {
    className: 'cart-form__total-value',
    textContent: deliveryDate,
  });

  totalDeliveryInfoElem.append(date);
};

export const renderTotalFieldset =
  (totalPrice, totalCount, totalOldPrice, totalDiscount, deliveryDate) => {
    renderTotalPrice(totalPrice);
    renderTotalCountAndFullPrice(totalCount, totalOldPrice);
    renderTotalDiscount(totalDiscount);
    renderTotalFieldsetDeliveryDate(deliveryDate);
  };

export const renderCart = (countOfItemsInCart, cartItems) => {
  if (!countOfItemsInCart) {
    renderEmptyCartMessage();
    disableElem(cartSubmitBtn);

    return;
  }

  const deliveryDate = getDeliveryDate();
  const totalPrice = getCartTotalPrice(cartItems);
  const totalCount = getCartTotalItemsCount(cartItems);
  const totalOldPrice = getCartTotalItemsOldPrice(cartItems);
  const totalDiscount = getCartTotalDiscount(cartItems);

  renderCartItemsCount(countOfItemsInCart);
  renderGoodInfoFieldSet(cartItems);
  renderDeliveryFieldset(cartItems, deliveryDate);
  renderTotalFieldset(
      totalPrice, totalCount, totalOldPrice, totalDiscount, deliveryDate,
  );
};

export const renderUpdatedDeliveryAllImg = () => {
  const imgsWrapper = getDeliveryAllImgsList();
  imgsWrapper.textContent = '';
  const cartItems = getLocalStorageCartItems();

  cartItems.forEach(item => {
    const li = createElement('li');
    const imgELem = renderDeliveryImg(item.imgUrl);

    li.append(imgELem);
    imgsWrapper.append(li);
  });
};

export const renderEmptyDeliveryAllImg = () => {
  const imgsWrapper = getDeliveryAllImgsList();
  imgsWrapper.textContent = '';
};

export const updateTotalFieldset = (countOfItemsInCart, cartItems) => {
  let deliveryDate = NaN;

  if (countOfItemsInCart) {
    deliveryDate = getDeliveryDate();
    renderCartItemsCount(countOfItemsInCart);
  }

  const totalPrice = getCartTotalPrice(cartItems);
  const totalCount = getCartTotalItemsCount(cartItems);
  const totalOldPrice = getCartTotalItemsOldPrice(cartItems);
  const totalDiscount = getCartTotalDiscount(cartItems);

  renderTotalFieldset(
      totalPrice, totalCount, totalOldPrice, totalDiscount, deliveryDate,
  );
};

export const renderOrderMessageModal = (orderId) => {
  const orderMessageWrapper = createElement('div', {
    className: 'order-message',
  });

  const orderMessageText = createElement('p', {
    className: 'order-message__text',
    textContent: `Ваш заказ с номером ${orderId} принят.
      Вы можете его забрать ${getDeliveryDate()} в пункте выдачи.
      Адрес пункта выдачи: г. Москва улица Центральная, д. 48.
      Режим работы: ежедневно 10:00 - 21:00
      `,
  });

  const orderMessageColseBtn = createElement('button', {
    className: 'order-message__close-btn',
    textContent: 'Закрыть',
  });

  orderMessageWrapper.append(orderMessageText, orderMessageColseBtn);

  cartSection.append(orderMessageWrapper);
};
