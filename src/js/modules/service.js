import {renderHeaderCartItemsCount} from './header/headerRender.js';

export const fetchRequest = async (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      if (callback) callback(null, data);
      return data;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    callback(new Error(err));
  }
};

export const createElement = (tagName, attributesObj) => {
  const elem = document.createElement(tagName);

  Object.assign(elem, attributesObj);

  return elem;
};

export const toggleElem = (elem, className) => {
  elem.classList.toggle(className);
};

export const activateElem = (elem) => {
  elem.disabled = false;
};

export const disableElem = (elem) => {
  elem.disabled = true;
};

export const delLastPeriodStr = (str) => {
  let newStr = str;

  if (str.slice(-1) === '.') {
    newStr = str.slice(0, -1);
  }

  return newStr;
};

export const splitStrIntoParagraphs = (str = '') => {
  const paragraphsArr = str.split('\n');

  return paragraphsArr;
};

export const getUrlGetParam = () => window.location.href.split('?id=')[1];

export const getImgName = (dbImageName) => {
  let imageName = dbImageName;
  imageName = imageName.split('/')[1];
  imageName = imageName.split('.')[0];

  return imageName;
};

export const getDiscountedPrice = (fullPrice, discoutnSize) =>
  fullPrice - (fullPrice * discoutnSize * 0.01);

export const arrIsEmpty = (arr) => !arr.length;

export const getLocalStorageCartItems = () =>
  JSON.parse(localStorage.getItem('cartItems') || '[]');

export const getCountOfLocalStorageCartItems = (cartItems) => cartItems.length;

export const getProductInCart = (cartItems, productId) =>
  cartItems.find((item) => Number(item.id) === Number(productId));

export const addProductToLocalStorage = (
    cartItems,
    producId,
    productPrice,
    productImageUrl,
    productTitle,
    oldPrice,
    creditPrice,
) => {
  const productInCart = getProductInCart(cartItems, producId);

  if (productInCart) {
    productInCart.count += 1;
  } else {
    cartItems.push({
      id: producId,
      count: 1,
      price: productPrice,
      imgUrl: productImageUrl,
      title: productTitle,
      oldPrice,
      creditPrice,
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const addToCart = (
    producId,
    productPrice,
    productImageUrl,
    productTitle,
    oldPrice,
    creditPrice,
) => {
  const cartItems = getLocalStorageCartItems();

  addProductToLocalStorage(
      cartItems,
      producId,
      productPrice,
      productImageUrl,
      productTitle,
      oldPrice,
      creditPrice,
  );

  renderHeaderCartItemsCount();
};

export const removeItemFromLocalStorageCartItem = (cartItems, itemId) => {
  cartItems = cartItems.filter((item) => Number(item.id) !== itemId);

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const increaseCountLocalStorageCartItem = (cartItems, itemId) => {
  const itemInCart = getProductInCart(cartItems, itemId);

  itemInCart.count += 1;

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const reduceCountLocalStorageCartItem = (cartItems, itemId) => {
  const itemInCart = getProductInCart(cartItems, itemId);

  if (itemInCart.count === 1) {
    cartItems = cartItems.filter((item) => item.id !== itemInCart.id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return;
  }

  itemInCart.count -= 1;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const clearLocalStorageCartItems = () => {
  localStorage.removeItem('cartItems');
};
