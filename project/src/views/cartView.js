'use strict';

export default class CartCheckout {
  constructor(shipping_fees = 0) {
    this.cartEl = document.createElement('form');
    this.shipping_fees = shipping_fees;
  }

  hydrate(cartData) {
    const container = this.cartEl.querySelector('#cart-items');
    const emptyCart = this.cartEl.querySelector('#empty-cart');
    const checkoutButton = this.cartEl.querySelector('#checkout-button');

    const subtotalPrice = this.cartEl.querySelector('#subtotal dd');
    const shippingFees = this.cartEl.querySelector('#shipping-fees dd');
    const totalPrice = this.cartEl.querySelector('#total dd');
    let subtotal = 0;
    container.innerHTML = '';

    if (Object.keys(cartData).length === 0) {
      container.innerHTML = '<p class="no-results">Your cart is empty</p>';
      emptyCart.style.display = 'none';
      checkoutButton.disabled = true;
    } else {
      emptyCart.style.display = 'block';
      checkoutButton.disabled = false;
    }

    for (const [id, item] of Object.entries(cartData)) {
      const cartItem = document.createElement('li');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
            <div><img src="${item.thumb}" /></div>
            <div class="description">
              <div>
                <div class="name">
                  <div>
                    <h3><a href="plants.html?id=${id}">${item.name}</a></h3>
                    <p>ID: ${id}</p>
                  </div>
                  <p class="price">NOK ${item.price.toLocaleString()},-/piece</p>
                </div>

                <div class="quantity-container">
                  <input type="number" name="${id}" min="1" value="${item.quantity}" class="update-quantity" />
                  <button class="delete-from-cart" type="button" name="${id}">Remove</button>
                </div>
              </div>

              <div class="stock">
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
              </div>
            </div>`;

      container.appendChild(cartItem);
      subtotal += item.price * item.quantity;
    }

    // const deleteButtons = this.cartEl.querySelectorAll('.delete-from-cart');
    // deleteButtons.forEach((button) => {
    //   button.addEventListener('click', (e) => {
    //     delete this.cartData[e.target.name];
    //     localStorage.setItem('cart', JSON.stringify(this.cartData));
    //     displayCartItems();
    //   });
    // });

    // const updateQuantites = this.cartEl.querySelectorAll('.update-quantity');
    // updateQuantites.forEach((input) => {
    //   input.addEventListener('change', (e) => {
    //     const newValue = e.target.value;

    //     if (newValue <= 0) {
    //       e.target.value = this.cartData[e.target.name].quantity;
    //       return;
    //     }
    //     this.cartData[e.target.name].quantity = newValue;
    //     localStorage.setItem('cart', JSON.stringify(this.cartData));
    //     displayCartItems();
    //   });
    // });

    subtotalPrice.innerText = 'NOK ' + subtotal.toLocaleString() + ',-';
    shippingFees.innerText =
      this.shipping_fees > 0 ? 'NOK ' + this.shipping_fees.toLocaleString() + ',-' : 'Free shipping';
    totalPrice.innerText = 'NOK ' + (subtotal + this.shipping_fees).toLocaleString() + ',-';
  }

  render(container, cartData) {
    this.cartEl.id = 'cart';
    this.cartEl.innerHTML = `
      <div>
        <ul id="cart-items" role="list"></ul>
        <div class="additional-info">
          <p>
            <button id="empty-cart">Empty cart</button>
          </p>
        </div>
      </div>

      <!-- Order summary -->
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

        <div>
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
    this.hydrate(cartData);
    container.appendChild(this.cartEl);
  }
}
