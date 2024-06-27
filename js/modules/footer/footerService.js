import {
  buyersListElem, buyersNavElem, catalogListElem, catalogNavElem,
} from './footerGetElemets.js';

export const isClickedCatalogMenu = (target) =>
  target.classList.contains('navigation__catalog') ||
  target.classList.contains('navigation__title--catalog');

export const isClickedBuyersMenu = (target) =>
  target.classList.contains('navigation__buyers') ||
  target.classList.contains('navigation__title--buyers');

export const toggleCatalogMenu = () => {
  catalogNavElem.classList.toggle('navigation__catalog--active');
  catalogListElem.classList.toggle('navigation__list--active');
};

export const toggleBuyersMenu = () => {
  buyersNavElem.classList.toggle('navigation__buyers--active');
  buyersListElem.classList.toggle('navigation__list--active');
};

