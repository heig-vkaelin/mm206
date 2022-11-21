'use strict';

export default class CartView {
  /**
   * Construct a new cart, the cart is not rendered until the render method is called
   */
  constructor() {
    this.cartEl = document.createElement('div');
  }

  /**
   *
   * @param {Element} container The container to render the cart in
   * @param {Object} cartData The cart data to be rendered
   * @param {number} shipping_fees The shipping fees if any
   */
  render(container, cartData, show_image = true, shipping_fees = 0) {
    this.cartEl.id = 'cart';
    this.cartEl.classList.add('card');

    this.cartEl.innerHTML = `
      <div>
        <ul id="cart-items" role="list"></ul>
        <div class="additional-info">
          <p>
            <button id="empty-cart-button">Empty cart</button>
          </p>
        </div>
      </div>

      <div id="cart-summary">
        <div>
          <dl>
            <div id="subtotal" class="cart-subtotal">
              <dt>Subtotal</dt>
              <dd></dd>
            </div>
            <div id="shipping-fees" class="cart-subtotal">
              <dt>Shipping</dt>
              <dd></dd>
            </div>
            <div id="total" class="cart-subtotal">
              <dt>Order total</dt>
              <dd></dd>
            </div>
          </dl>
        </div>

        <div id="submit-div">
          <button type="submit" id="checkout-button">Checkout</button>
        </div>

        <div class="additional-info">
          <p>
            or
            <a href="index.html">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </p>
        </div>
      </div>`;

    this.#hydrate(cartData, shipping_fees, show_image);
    container.appendChild(this.cartEl);
  }

  /**
   * Update the quantity for a given item in the cart
   * @param {Object} cartData The cart data
   * @param {number} id The id of the item to be updated
   * @param {number} shipping_fees The shipping fees if any
   */
  updateQuantity(cartData, id, shipping_fees = 0) {
    const cartItem = this.cartEl.querySelector('#cart-item-' + id);
    if (cartItem) {
      if (cartData[id].quantity < 0) {
        cartData[id].quantity = 1;
      }
      cartItem.querySelector('.update-quantity').value = cartData[id].quantity;
      cartItem.querySelector('.stock p:last-child').textContent =
        'NOK ' + (cartData[id].price * cartData[id].quantity).toLocaleString() + ',-';
      subtotal = Object.entries(cartData).reduce((acc, [id, item]) => acc + item.price * item.quantity, 0);
      this.#renderTotal(subtotal, shipping_fees);
    }
  }

  #hydrate(cartData, shipping_fees, show_image) {
    const container = this.cartEl.querySelector('#cart-items');
    const emptyCartButton = this.cartEl.querySelector('#empty-cart-button');
    const checkoutButton = this.cartEl.querySelector('#checkout-button');

    let subtotal = 0;
    container.innerHTML = '';

    if (Object.keys(cartData).length === 0) {
      container.innerHTML = '<p class="no-results">Your cart is empty</p>';
      emptyCartButton.style.display = 'none';
      checkoutButton.disabled = true;
    } else {
      emptyCartButton.style.display = 'block';
      checkoutButton.disabled = false;
    }

    for (const [id, item] of Object.entries(cartData)) {
      const cartItem = document.createElement('li');
      cartItem.classList.add('cart-item');
      if (!show_image) cartItem.classList.add('no-image');
      cartItem.id = 'cart-item-' + id;
      cartItem.innerHTML = `
            ${show_image ? `<div><img src="${item.thumb}" /></div>` : ''}
            <div class="description">
              <div>
                <div class="name">
                  <div>
                    <h3><a href="plants.html?id=${id}">${item.name}</a></h3>
                    <p class="cart-id">ID: ${id}</p>
                  </div>
                  <div class="price">
                  <p>NOK ${item.price.toLocaleString()},-/piece</p>
                  ${!show_image ? `<p>NOK ${(item.price * item.quantity).toLocaleString()},-</p>` : ''}
                  </div>
                </div>

                <div class="quantity-container">
                  <input type="number" name="${id}" min="1" value="${item.quantity}" class="update-quantity" />
                  <button class="delete-from-cart" type="button" name="${id}">Remove</button>
                </div>
              </div>

              ${
                show_image
                  ? `<div class="stock">
                <p>
                  <svg class="${item.in_stock ? 'check-icon' : 'clock-icon'}"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  >
                    <path fill-rule="evenodd"
                      d="${
                        item.in_stock
                          ? 'M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                          : 'M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z'
                      }" clip-rule="evenodd" />
                  </svg>
                  <span>${
                    item.in_stock
                      ? 'In Stock'
                      : 'Estimated Shipping: ' + new Date(item.expected_shipping).toLocaleDateString()
                  }</span>
                </p>
                <p>NOK ${(item.price * item.quantity).toLocaleString()},-</p>
              </div>`
                  : ''
              }
            </div>`;

      container.appendChild(cartItem);
      subtotal += item.price * item.quantity;
    }
    this.#renderTotal(subtotal, shipping_fees);
  }

  #renderTotal(subtotal, shipping_fees) {
    const subtotalPrice = this.cartEl.querySelector('#subtotal dd');
    const shippingFees = this.cartEl.querySelector('#shipping-fees dd');
    const totalPrice = this.cartEl.querySelector('#total dd');

    subtotalPrice.innerText = 'NOK ' + subtotal.toLocaleString() + ',-';
    shippingFees.innerText = shipping_fees > 0 ? 'NOK ' + shipping_fees.toLocaleString() + ',-' : 'Free shipping';
    totalPrice.innerText = 'NOK ' + (subtotal + shipping_fees).toLocaleString() + ',-';
  }
}
