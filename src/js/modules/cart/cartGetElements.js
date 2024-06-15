export const cartElem = document.querySelector('.cart-form');
export const cartItemsCountElem =
  cartElem.querySelector('.cart-form__title-amount');
export const cartItemsListElem =
  cartElem.querySelector('.cart-form__goods-list');
export const cartChooseAllElem =
  cartElem.querySelector('.cart-form__label-wrapper');
export const deliveryInfoElem =
  cartElem.querySelector('.cart-form__delivery-elem--date');
export const totalPriceElem =
  cartElem.querySelector('.cart-form__total-price');
export const totalItemsCountELem =
  cartElem.querySelector('.cart-form__total-description-amount');
export const totalItemsOldPriceElem =
  cartElem.querySelector('.cart-form__total-old-price');
export const totalItemsDiscountElem =
  cartElem.querySelector('.cart-form__total-dicount');
export const totalDeliveryInfoElem =
  cartElem.querySelector('.cart-form__total-delivery-info');
export const getItemPriceElem = (item) =>
  item.querySelector('.cart-form__price');
export const getItemCountElem = (item) =>
  item.querySelector('.cart-form__good-num-num');
export const getItemCreditPriceElem = (item) =>
  item.querySelector('.cart-form__price-credit');
