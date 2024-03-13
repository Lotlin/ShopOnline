import {
  headerMenuBtn, headerNavigation, headerMenuBtnCloseImg, headerMenuBtnOpenImg,
} from './getElements.js';
import {toggleElem, switchBurgerBtnImg} from './service.js';

export const mainPageControl = () => {
  headerMenuBtn.addEventListener('click', () => {
    toggleElem(headerNavigation, 'navigation--visible');
    switchBurgerBtnImg(
        headerMenuBtnCloseImg, 'header__burger-img--show',
        headerMenuBtnOpenImg, 'header__burger-img--hide',
    );
  });
};
