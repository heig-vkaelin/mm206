'use strict';

import CartView from './CartView.js';

export default class CheckoutView {
  constructor() {
    this.checkoutEl = document.createElement('div');
    this.checkoutEl.id = 'checkout-container';
  }

  renderContactForm(container, cartData, userData = undefined, shipping_fees = 0) {
    // Render the checkout form
    this.checkoutEl.innerHTML = `
      <div class="checkout-grid">
        <div class="checkout-form-container">
          ${this.#getContactForm(userData)}
        </div>
        <div id="order-summary">
      </div>
    `;

    // Render the order summary
    const cartView = new CartView();
    const orderSummary = this.checkoutEl.querySelector('#order-summary');
    cartView.render(orderSummary, cartData, false);

    // Remove the cart inputs
    const cartUpdateQuantities = orderSummary.querySelectorAll('.update-quantity');
    const cartDeleteButtons = orderSummary.querySelectorAll('.delete-from-cart');
    const emptyCartButton = orderSummary.querySelector('#empty-cart-button');
    const submitButton = orderSummary.querySelector('#checkout-button');
    cartUpdateQuantities.forEach((input) => {
      const parent = input.parentNode;
      input.setAttribute('type', 'text');
      input.disabled = true;
      input.setAttribute('style', 'width: 2rem; border: none; box-shadow: none; padding-top: 0;');
      parent.setAttribute('style', 'right: 50%');
    });
    cartDeleteButtons.forEach((button) => button.parentNode.removeChild(button));
    emptyCartButton.parentNode.removeChild(emptyCartButton);
    submitButton.textContent = 'Next';
    submitButton.addEventListener('click', () => {
      container.dispatchEvent(new CustomEvent('nextPage', { detail: { button: submitButton } }));
    });

    container.appendChild(this.checkoutEl);
  }

  renderShippingForm(container, shippingData) {
    const checkoutContainer = container.querySelector('.checkout-form-container');
    const submitButton = container.querySelector('#checkout-button');
    checkoutContainer.innerHTML = this.#getShippingForm(shippingData);

    const deliveryCards = checkoutContainer.querySelectorAll('.delivery-card');
    deliveryCards.forEach((card) => {
      card.addEventListener('click', () => {
        container.dispatchEvent(
          new CustomEvent('selectShipping', {
            detail: {
              id: card.id.split('-')[1],
              price: card.querySelector('.delivery-method-price').innerHTML.split(' ')[1].slice(0, -2),
            },
          }),
        );
      });
    });
    deliveryCards[0].click();
    submitButton.textContent = 'Place Order';
    submitButton.addEventListener('click', () => {
      container.dispatchEvent(new CustomEvent('placeOrder', { detail: { button: submitButton } }));
    });
  }

  updateShippingFees(container, fee_price) {
    const subtotal = container.querySelector('#subtotal dd');
    const fees = container.querySelector('#shipping-fees dd');
    const total = container.querySelector('#total dd');
    fees.innerHTML = `NOK ${fee_price},-`;
    total.innerHTML = `NOK ${(parseInt(fee_price) + parseInt(subtotal.innerHTML.split(' ')[1])).toLocaleString()},-`;
  }

  #getDeliveryOption(deliveryObject, checked = false) {
    return `
      <label id="shipping-${deliveryObject.id}" class="delivery-card ${checked === true ? 'selected' : ''}">
        <span>
          <span>
            <span class="delivery-method-label">${deliveryObject.method}</span>
            <span class="delivery-method-description">${deliveryObject.description}</span>
            <span class="delivery-method-price">NOK ${deliveryObject.price},-</span>
          </span>
        </span>
        <svg
          class="check-circle"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd"
          />
        </svg>
      </label>`;
  }

  #getUserData(userData, field, split = -1, delimiter = ' ') {
    if (userData !== undefined) {
      return split === -1 ? userData[field] : userData[field].split(delimiter)[split];
    }
    return '';
  }

  #getContactForm(userData) {
    return `
      <div>
        <h2 class="checkout-title">Shipping information</h2>

        <form id="checkout-form">
          <div class="checkout-input">
            <label for="first-name">First name</label>
            <div>
              <input type="text" id="first-name" name="first-name" value="${this.#getUserData(
                userData,
                'full_name',
                0,
              )}" required />
            </div>
          </div>

          <div class="checkout-input">
            <label for="last-name">Last name</label>
            <div>
              <input type="text" id="last-name" name="last-name" value="${this.#getUserData(
                userData,
                'full_name',
                1,
              )}" required />
            </div>
          </div>

          <div class="checkout-input half">
            <label for="address">Address</label>
            <div>
              <input type="text" name="address" id="address" value="${this.#getUserData(
                userData,
                'street',
              )}" required />
            </div>
          </div>

          <div class="checkout-input">
            <label for="city">City</label>
            <div>
              <input type="text" name="city" id="city" value="${this.#getUserData(userData, 'city')}" required />
            </div>
          </div>

          <div class="checkout-input">
            <label for="postal-code">Postal code</label>
            <div>
              <input type="text" name="postal-code" id="postal-code" value="${this.#getUserData(
                userData,
                'zipcode',
              )}" required />
            </div>
          </div>

          <div class="checkout-input half">
            <label for="country">Country</label>
            <div>
              <input type="text" id="country" name="country" value="${this.#getUserData(
                userData,
                'country',
              )}" required />
            </div>
          </div>
        </form>
      </div>`;
  }

  #getShippingForm(shippingData) {
    return `
      <fieldset>
        <legend class="delivery-methods">Delivery method</legend>

        <div class="delivery-grid">
          ${shippingData.data.map((delivery) => this.#getDeliveryOption(delivery)).join('\n')}
        </div>
      </fieldset>
    `;
  }
}
