import {
  activateElem, clearLocalStorageCartItems,
  disableElem, getCountOfLocalStorageCartItems,
  getLocalStorageCartItems,
  removeItemFromLocalStorageCartItem,
} from '../service.js';
import {
  cartElem, cartItemsListElem, cartSubmitBtn, getAgreementCheckbox,
  getAllDelGoodBtn, getAllGoodCheckbox, getChooseAllCheckbox,
  getCloseOrderMessageBtn, getDelGoodBtn, getDeleteAllBtn, getOrderMessage,
} from './cartGetElements.js';
import {
  renderCartItemsCount, renderOrderMessageModal, renderUpdatedDeliveryAllImg,
  updateTotalFieldset,
} from './cartRender.js';
import {
  activateAllDelGooDBtns, cartItemCountService, cleanCart,
  disableAllDelGooDBtns, getDataForServer, getItemId, getParentGoodItem,
  isCountBtnClicked, isGoodCheckBoxChecked, isGoodCheckBoxClicked,
  makeAllCheckboxesChecked, makeAllCheckboxesUnchecked,
} from './cartService.js';

export const countBtnControl = () => {
  cartElem.addEventListener('click', ({target}) => {
    const clickedCountdBtn = isCountBtnClicked(target);

    if (clickedCountdBtn) {
      cartItemCountService(target, clickedCountdBtn);
    }
  });
};

export const agreementCheckboxControl = () => {
  const agreementCheckbox = getAgreementCheckbox();

  agreementCheckbox.addEventListener('change', () => {
    if (agreementCheckbox.checked) {
      const countCartItems = getLocalStorageCartItems();
      const countItemsInCart = getCountOfLocalStorageCartItems(countCartItems);

      if (countItemsInCart) {
        activateElem(cartSubmitBtn);
      }
    } else {
      disableElem(cartSubmitBtn);
    }
  });
};

export const deleteAllBtnControl = (deleteAllBtn) => {
  deleteAllBtn.addEventListener('click', () => {
    cleanCart();
    clearLocalStorageCartItems();
    disableElem(cartSubmitBtn);
  });
};

export const chooseAllCheckboxControl = () => {
  const chooseAllCheckbox = getChooseAllCheckbox();

  if (!chooseAllCheckbox) {
    return;
  }

  const deleteAllBtn = getDeleteAllBtn();
  const allGoodCheckbox = getAllGoodCheckbox();
  const allDelGoodBtns = getAllDelGoodBtn();

  chooseAllCheckbox.addEventListener('change', () => {
    if (chooseAllCheckbox.checked) {
      activateElem(deleteAllBtn);
      makeAllCheckboxesChecked(allGoodCheckbox);
      activateAllDelGooDBtns(allDelGoodBtns);
      deleteAllBtnControl(deleteAllBtn);
    } else {
      disableElem(deleteAllBtn);
      makeAllCheckboxesUnchecked(allGoodCheckbox);
      disableAllDelGooDBtns(allDelGoodBtns);
    }
  });
};

export const deleteGoodBtnControl = () => {
  cartItemsListElem.addEventListener('click', ({target}) => {
    if (isGoodCheckBoxClicked(target)) {
      const item = getParentGoodItem(target);
      const delGoodBtn = getDelGoodBtn(item);

      if (isGoodCheckBoxChecked(target)) {
        activateElem(delGoodBtn);
        delGoodBtn.addEventListener('click', () => {
          const cartItems = getLocalStorageCartItems();
          const itemId = getItemId(item);

          item.remove();
          removeItemFromLocalStorageCartItem(cartItems, itemId);

          const newCartItems = getLocalStorageCartItems();
          const countCartItems = getCountOfLocalStorageCartItems(newCartItems);

          if (!countCartItems) {
            cleanCart();
            disableElem(cartSubmitBtn);

            return;
          }

          updateTotalFieldset(countCartItems, newCartItems);
          renderUpdatedDeliveryAllImg();
          renderCartItemsCount(countCartItems);
        });
      } else {
        disableElem(delGoodBtn);
      }
    }
  });
};

export const orderMEssageCloseControl = () => {
  const closeOrderMessageBtn = getCloseOrderMessageBtn();
  closeOrderMessageBtn.addEventListener('click', () => {
    getOrderMessage().remove();
  });
};

export const submitBtnControl = () => {
  cartElem.addEventListener('submit', e => {
    e.preventDefault();

    const orderedItemsData = getDataForServer(getLocalStorageCartItems());

    // здесь была бы отправка на сервер, если бы он это предусматривал :)
    console.log('Данные для сервера: ', orderedItemsData);

    // здесь был бы номер заказа, сгенерируемый сервером :)
    const orderId = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
    renderOrderMessageModal(orderId);

    orderMEssageCloseControl();

    cleanCart();
    clearLocalStorageCartItems();
  });
};

export const cartControl = () => {
  countBtnControl();
  agreementCheckboxControl();
  chooseAllCheckboxControl();
  deleteGoodBtnControl();
  submitBtnControl();
};
