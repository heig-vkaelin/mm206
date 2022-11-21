'use strict';

export default class CheckoutView {
  renderConfirmation(container, orderData, shippingData) {
    container.innerHTML = `
    <div class="confirmation modal">
      <div id="order-confirmation" class="card">
        <p>Thank you for your order!</p>
        <p>Your order number is: ${orderData.record.id}</p>
        <h3>Customer details</h3>
        <p>${orderData.record.customer_name}</p>
        <p>${orderData.record.street}, ${orderData.record.zipcode} ${orderData.record.city}, ${orderData.record.country}</p>
        <h3>Order details</h3>
        ${JSON.parse(orderData.record.content).map((product) => `
          <div class="confirmation-details">
            <div>${product.name} (${product.id}) - NOK ${product.price},-</div>
            <div>Quantity: ${product.quantity} - Total NOK ${product.quantity * product.price},-</div>
          </div>
        `).join('\n')}
        <h3>Shipping details</h3>
        <div class="shipping-details">
          <div>${shippingData[orderData.record.shipping_id - 1].method}</div>
          <div>Estimated time delivery: <span>${shippingData[orderData.record.shipping_id - 1].description}</span></div>
        </div>
        <h3>Order total</h3>
        <p>NOK ${JSON.parse(orderData.record.content).reduce((acc, item) => (acc + item.price * item.quantity), 0) + parseInt(shippingData[orderData.record.shipping_id - 1].price)},-</p>
        <button id="back-to-shop" class="btn btn-primary">Back to shop</button>
      </div>
    </div>
    `;

    const backToShopButton = container.querySelector('#back-to-shop');
    backToShopButton.addEventListener('click', () => {
      container.dispatchEvent(new CustomEvent('backToShop'));
    });
  }
}