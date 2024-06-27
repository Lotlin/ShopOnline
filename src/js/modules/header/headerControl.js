import {toggleElem} from '../service.js';
import {
  headerMenuBtn, headerNavigation, headerMenuBtnCloseImg, headerMenuBtnOpenImg,
} from './headerGetElements.js';
import {switchBurgerBtnImg, toggleHeaderElemsStyle} from './headerService.js';

export const burgerMenuControl = () => {
  headerMenuBtn.addEventListener('click', () => {
    toggleElem(headerNavigation, 'navigation--visible');
    switchBurgerBtnImg(
        headerMenuBtnCloseImg, 'header__burger-img--show',
        headerMenuBtnOpenImg, 'header__burger-img--hide',
    );
    toggleHeaderElemsStyle();
  });
};

export const headerControl = () => {
  burgerMenuControl();
};
