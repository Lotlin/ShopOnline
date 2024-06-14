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

