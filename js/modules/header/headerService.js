import {toggleElem} from '../service.js';
import {headerSearch, headerMenuBtn} from './headerGetElements.js';


export const switchBurgerBtnImg = (img1, className1, img2, className2) => {
  toggleElem(img1, className1);
  toggleElem(img2, className2);
};

export const toggleHeaderElemsStyle = () => {
  headerMenuBtn.classList.toggle('header__burger--active');
  headerSearch.classList.toggle('header__search--disactive');
};
