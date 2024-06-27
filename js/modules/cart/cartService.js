import {renderHeaderCartItemsCount} from '../header/headerRender.js';
import {
  activateElem, disableElem, reduceCountLocalStorageCartItem,
  getCountOfLocalStorageCartItems, getLocalStorageCartItems,
  increaseCountLocalStorageCartItem,
} from '../service.js';
import {
  getItemPriceElem, getItemCountElem, getItemCreditPriceElem,
  getItemOldPriceELem, cartSubmitBtn, cartItemsListElem,
  getAllDeliveryDateELems, cartItemsCountElem, cartChooseAllElem,
} from './cartGetElements.js';
import {
  renderEmptyCartMessage, renderEmptyDeliveryAllImg,
  renderUpdatedDeliveryAllImg, updateTotalFieldset,
} from './cartRender.js';

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
  const itemOldPriceElem = getItemOldPriceELem(item);

  return {
    itemPriceELem,
    itemCountElem,
    itemCreditPriceElem,
    itemOldPriceElem,
  };
};

export const getElemPrice = (priceElem) => {
  const noSpaceBtwNumbsTextContent =
    priceElem.textContent.replace(/\u00A0/g, '');
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
    parentItem,
    priceElem,
    countElem,
    creditPriceElem,
    oldPriceElem,
    operator = false,
) => {
  const currentPrice = Number(getElemPrice(priceElem));
  const currentCount = Number(countElem.textContent);
  const currentCreditPrice = Number(getCreditPrice(creditPriceElem));
  const currentOldPrice = Number(getElemPrice(oldPriceElem));

  if (currentCount === 1 && !operator) {
    parentItem.remove();
    renderUpdatedDeliveryAllImg();

    const сartItems = getLocalStorageCartItems();
    if (!сartItems.length) {
      renderEmptyCartMessage();
      disableElem(cartSubmitBtn);
      renderHeaderCartItemsCount();
      cartItemsCountElem.textContent = '';
    }

    return;
  }

  const newCount = operator ? (currentCount + 1) : (currentCount - 1);

  countElem.textContent = newCount;

  const oneItemPrice = currentPrice / currentCount;
  priceElem.textContent =
   `${(newCount * oneItemPrice).toLocaleString('ru-RU')} ₽`;

  const oneItemCreditPrice = currentCreditPrice / currentCount;
  creditPriceElem.textContent =
   `В кредит от ${(newCount * oneItemCreditPrice).toLocaleString('ru-RU')} ₽`;

  if (currentOldPrice) {
    const oneItemOldPrice = currentOldPrice / currentCount;
    oldPriceElem.textContent =
      `${(newCount * oneItemOldPrice).toLocaleString('ru-RU')} ₽`;
  }
};

export const cartItemCountService = (target, clickedCountdBtn) => {
  const itemElem = target.closest('.cart-form__good-item');
  const itemId = getItemId(itemElem);

  const {
    itemPriceELem,
    itemCountElem,
    itemCreditPriceElem,
    itemOldPriceElem,
  } = getCartItemRenderedElements(itemElem);

  const cartItems = getLocalStorageCartItems();

  if (clickedCountdBtn === 'increase') {
    increaseCountLocalStorageCartItem(cartItems, itemId);

    updateItemPriceAndCount(
        itemElem,
        itemPriceELem,
        itemCountElem,
        itemCreditPriceElem,
        itemOldPriceElem,
        'increase',
    );
  } else {
    const itemIsRemoved = reduceCountLocalStorageCartItem(cartItems, itemId);

    if (itemIsRemoved) {
      renderHeaderCartItemsCount();
    }

    updateItemPriceAndCount(
        itemElem,
        itemPriceELem,
        itemCountElem,
        itemCreditPriceElem,
        itemOldPriceElem,
    );
  }

  const newCartItems = getLocalStorageCartItems();
  const countOfItemsInCart = getCountOfLocalStorageCartItems(newCartItems);
  updateTotalFieldset(countOfItemsInCart, newCartItems);
};

export const makeAllCheckboxesChecked = (allGoodCheckbox) => {
  allGoodCheckbox.forEach(checkbox => {
    checkbox.checked = true;
  });
};

export const makeAllCheckboxesUnchecked = (allGoodCheckbox) => {
  allGoodCheckbox.forEach(checkbox => {
    checkbox.checked = false;
  });
};

export const cleanCart = () => {
  cartItemsListElem.textContent = '';
  renderEmptyCartMessage();
  renderEmptyDeliveryAllImg();
  getAllDeliveryDateELems().forEach(elem => {
    elem.textContent = '';
  });
  cartItemsCountElem.textContent = '';
  updateTotalFieldset(0, []);
  cartChooseAllElem.textContent = '';
};

export const isGoodCheckBoxClicked = (target) =>
  target.classList.contains('cart-form__checkbox--good');

export const isGoodCheckBoxChecked = (target) => target.checked;

export const activateAllDelGooDBtns = (allgetAllDelGoodBtn) => {
  allgetAllDelGoodBtn.forEach(btn => {
    activateElem(btn);
  });
};

export const disableAllDelGooDBtns = (allgetAllDelGoodBtn) => {
  allgetAllDelGoodBtn.forEach(btn => {
    disableElem(btn);
  });
};

export const getParentGoodItem = (elem) =>
  elem.closest('.cart-form__good-item');

export const getDataForServer = (itemsObj) => itemsObj.map(({id, count}) => ({
  id,
  count,
}),
);
