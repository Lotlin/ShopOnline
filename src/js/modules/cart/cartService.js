import {
  getLocalStorageCartItems, increaseCountLocalStorageCartItem,
} from '../service.js';
import {
  getItemPriceElem, getItemCountElem, getItemCreditPriceElem,
} from './cartGetElements.js';

export const getDeliveryDate = (minDeliveryDays = 1, maxDeliveryDays = 5) => {
  const monthsArr = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const currentDay = new Date();
  let deliveryTime = NaN;
  currentDay.setDate(currentDay.getDate() + minDeliveryDays);

  const earliestDeliveryDay = currentDay.getDate();
  const earliestDeliveryMonth = monthsArr[currentDay.getMonth()];

  currentDay.setDate(currentDay.getDate() + maxDeliveryDays);
  const latestDeliveryDay = currentDay.getDate();
  const latestDeliveryMonth = monthsArr[currentDay.getMonth()];

  if (earliestDeliveryMonth === latestDeliveryMonth) {
    deliveryTime =
    `${earliestDeliveryDay}-${latestDeliveryDay} ${earliestDeliveryMonth}`;
  } else {
    deliveryTime =
      // eslint-disable-next-line max-len
      `${earliestDeliveryDay} ${earliestDeliveryMonth} - ${latestDeliveryDay} ${latestDeliveryMonth}`;
  }

  return deliveryTime;
};

export const getCartTotalPrice = (cartItemsData) =>
  cartItemsData.reduce((acc, item) => acc + (item.price * item.count), 0);

export const getCartTotalItemsCount = (cartItemsData) =>
  cartItemsData.reduce((acc, item) => acc + item.count, 0);

export const getCartTotalItemsOldPrice = (cartItemsData) =>
  cartItemsData.reduce((acc, item) => acc + (item.oldPrice * item.count), 0);

export const getCartTotalDiscount = (cartItemsData) =>
  cartItemsData.reduce((acc, item) =>
    acc + ((item.oldPrice - item.price) * item.count), 0);

export const isCountBtnClicked = target => {
  let clickedBtn = false;

  if (target.classList.contains('cart-form__good-num--more')) {
    clickedBtn = 'increase';
  }

  if (target.classList.contains('cart-form__good-num--less')) {
    clickedBtn = 'reduce';
  }

  return clickedBtn;
};

export const getItemId = (itemElem) => parseInt(itemElem.dataset.id);

export const getCartItemRenderedElements = (item) => {
  const itemPriceELem = getItemPriceElem(item);
  const itemCountElem = getItemCountElem(item);
  const itemCreditPriceElem = getItemCreditPriceElem(item);

  return {
    itemPriceELem,
    itemCountElem,
    itemCreditPriceElem,
  };
};

export const getElemPrice = (priceElem) => {
  const noSpaceBtwNumbsTextContent =
    priceElem.textContent.replace('\u00A0', '');
  const price = noSpaceBtwNumbsTextContent.split(' ')[0];

  return price;
};

export const getCreditPrice = (creditPriceElem) => {
  const noSpaceBtwNumbsTextContent =
    creditPriceElem.textContent.replace('\u00A0', '');
  const creditPrice = noSpaceBtwNumbsTextContent.split(' ')[3];

  return creditPrice;
};

export const updateItemPriceAndCount = (
    parentItem, priceElem, countElem, creditPriceElem, operator = false,
) => {
  const currentPrice = Number(getElemPrice(priceElem));
  const currentCount = Number(countElem.textContent);
  const currentCreditPrice = Number(getCreditPrice(creditPriceElem));

  // toDO проверить условие
  if (currentCount === 1 && !operator) {
    parentItem.remove();

    const сartItems = getLocalStorageCartItems();
    if (!сartItems.length) {
      // renderCartIsEmptyMessage();
      // disableElem(cartSubmitBtn);
    }

    return;
  }

  const oneItemPrice = currentPrice / currentCount;

  const newCount = operator ? (currentCount + 1) : (currentCount - 1);
  countElem.textContent = newCount;

  priceElem.textContent =
   `${(newCount * oneItemPrice).toLocaleString('ru-RU')} ₽`;

  const oneItemCreditPrice = currentCreditPrice / currentCount;

  creditPriceElem.textContent =
   `В кредит от ${(newCount * oneItemCreditPrice).toLocaleString('ru-RU')} ₽`;
};

export const cartItemCountService = (target, clickedCountdBtn) => {
  const itemElem = target.closest('.cart-form__good-item');
  const itemId = getItemId(itemElem);

  const {
    itemPriceELem,
    itemCountElem,
    itemCreditPriceElem,
  } = getCartItemRenderedElements(itemElem);

  const cartItems = getLocalStorageCartItems();


  // toDO перепутаны (?) increase и reduce

  if (clickedCountdBtn === 'increase') {
    increaseCountLocalStorageCartItem(cartItems, itemId);

    updateItemPriceAndCount(
        itemElem, itemPriceELem, itemCountElem, itemCreditPriceElem, 'increase',
    );
  } else {
    /*reduceCountLocalStorageCartItem(cartItems, itemId);
    updateItemPriceAndCount(item, itemPriceELem, itemCountElem);*/
  }

  //const newCartItems = getLocalStorageCartItems();
  //renderTotalPrice(newCartItems);
};
