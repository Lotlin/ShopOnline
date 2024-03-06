export const toggleElem = (elem, className) => {
  elem.classList.toggle(className);
};

export const switchBurgerBtnImg = (img1, className1, img2, className2) => {
  toggleElem(img1, className1);
  toggleElem(img2, className2);
};

//# sourceMappingURL=../../maps/modules/service.js.map
