export const cartSection = document.querySelector('.cart');
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
export const cartSubmitBtn = cartElem.querySelector('.cart-form__submit');
export const getItemPriceElem = (item) =>
  item.querySelector('.cart-form__price');
export const getItemCountElem = (item) =>
  item.querySelector('.cart-form__good-num-num');
export const getItemCreditPriceElem = (item) =>
  item.querySelector('.cart-form__price-credit');
export const getItemOldPriceELem = (item) =>
  item.querySelector('.cart-form__price-old');
export const getDeliveryAllImgsList = () =>
  cartElem.querySelector('.cart-form__delivery-desc--imgages');
export const getAgreementCheckbox = () =>
  cartElem.querySelector('.cart-form__checkbox--agreement');
export const getChooseAllCheckbox = () =>
  cartElem.querySelector('.cart-form__choose-all');
export const getDeleteAllBtn = () =>
  cartElem.querySelector('.cart-form__basket--all');
export const getAllGoodCheckbox = () =>
  cartElem.querySelectorAll('.cart-form__checkbox--good');
export const getAllDeliveryDateELems = () =>
  cartElem.querySelectorAll('.cart-form__delivery-date');
export const getAllDelGoodBtn = () =>
  cartItemsListElem.querySelectorAll('.cart-form__basket--good');
export const getDelGoodBtn = (item) =>
  item.querySelector('.cart-form__basket--good');
