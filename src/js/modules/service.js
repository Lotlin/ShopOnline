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
