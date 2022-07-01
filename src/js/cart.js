import cartTmp from '../templates/cart.hbs';

const productEl = document.querySelector('.js-products');

let isCartOpen = false;

const closeCart = (e) =>{
if(e.target.nodeName !== 'BUTTON'){
return;
}
e.currentTarget.remove()
isCartOpen = false;
}
const showCart = products => {
  productEl.insertAdjacentHTML('afterbegin', cartTmp(products));
  const cartEl = document.querySelector('.js-cart');
  cartEl.addEventListener('click', closeCart);
  
  isCartOpen = true;
};



export { isCartOpen };
export default showCart;
