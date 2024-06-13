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
      `${earliestDeliveryDay} ${earliestDeliveryMonth} - ${latestDeliveryDay} ${latestDeliveryMonth}`;
  }

  return deliveryTime;
};
