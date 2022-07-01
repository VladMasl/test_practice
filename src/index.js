import products from './js/products';
import cardProductTmp from './templates/productCard.hbs';
import showCart, { isCartOpen } from './js/cart';

const CART_FOR_LS = 'cart';

const listEl = document.querySelector('.list');

const btnOpenCartEl = document.querySelector('.js-button-cart');

const itemsMarkup = cardProductTmp(products);

const savedProducts = [];

const onAddToCartBtnClick = evt => {
  const btnEl = evt.target;
  if (btnEl.nodeName !== 'BUTTON') return;
  const parentEl = btnEl.closest('li');
  const productName = parentEl.querySelector('.product-name').textContent;
  const productPrice = parentEl.querySelector('.price').textContent;
  const productId = parentEl.dataset.id;
  const elById = savedProducts.find(el => {
    return el.id === productId;
  });
  if (elById) {
    elById.quantity += 1;
  } else {
    const product = {
      product: productName,
      price: Number(productPrice),
      quantity: 1,
      id: productId,
    };
    savedProducts.push(product);
  }

  localStorage.setItem(CART_FOR_LS, JSON.stringify(savedProducts));
};

const onCartBtnClick = evt => {
  if (isCartOpen) {
    return;
  }
  const cartProducts = localStorage.getItem(CART_FOR_LS);
  const parsedCartProducts = JSON.parse(cartProducts) ?? [];
  showCart(parsedCartProducts);
};

listEl.insertAdjacentHTML('beforeend', itemsMarkup);

listEl.addEventListener('click', onAddToCartBtnClick);

btnOpenCartEl.addEventListener('click', onCartBtnClick);
