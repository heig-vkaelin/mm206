'use strict';

export default function PlantDetailsView() {
  const div = document.createElement('div');
  div.id = 'plant-details';

  function getReviews(plant) {
    if (plant.rating !== null && plant.rating > 0 && plant.rating <= 5) {
      let result = '';
      for (let i = 0; i < 5; i++) {
        result += `
          <svg class="star ${
            plant.rating > i ? 'full-star' : ''
          }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"/>
          </svg>`;
      }
      return result;
    }

    return 'No reviews yet';
  }

  function getStockStatus(plant) {
    if (plant.stock > 0) {
      return `${plant.stock} remaining`;
    }

    return `
    <span class="out-of-stock">Out of stock
      <br/>
      Estimate delivery time: ${new Date(plant.expected_shipped).toLocaleDateString()}
    </span>
    `;
  }

  function getDiscount(plant) {
    if (plant.discount > 0) {
      return `<p id="discount">- ${plant.discount}%</p>`;
    }
    return '';
  }

  div.render = (container, plant) => {
    div.innerHTML = `
      <!-- Image -->
      <div id="plant-image">
        <img src="${plant.image}" />
        ${getDiscount(plant)}
      </div>

      <!-- Product info -->
      <div id="plant-info">
        <h1>${plant.name}</h1>
        <h3>${plant.category_name}</h3>
        <div>
          <p class="price">kr ${plant.price},-</p>
        </div>

        <div id="plant-reviews">
          <div>${getReviews(plant)}</div>
        </div>

        <div id="plant-description"><p>${plant.description}</p></div>

        <div class="add-cart">
          <div>
            <button id="add-to-cart" type="submit">Add to cart</button>
            <p id="plant-stock">${getStockStatus(plant)}</p>
          </div>
        </div>

        <section class="details">
          <div>
            <div>
              <h3>
                <!-- Expand/collapse question button -->
                <button id="additional-details-button" type="button">
                  <span class="details-title">Additional Details</span>
                  <span class="details-icons">
                    <svg
                      class="visible"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    <svg
                      class=""
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div class="prose" id="additional-details" hidden>
                <ul>
                  <li>Normal height: ${plant.height} cm</li>
                  <li>
                    Recommended fertilizer mix: ${plant.nitrogen} % nitrogen, ${plant.potassium} % potassium,
                    ${plant.phosphor} % phosphorus. Should not be planted if the temperature during the day is below
                    ${plant.min_temp_day} degrees, or the temperature at night is below ${plant.min_temp_night}
                    degrees.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    const additionalDetailsButton = div.querySelector('#additional-details-button');
    const additionalDetails = div.querySelector('#additional-details');
    const detailsIcons = div.querySelectorAll('.details-icons svg');
    const detailsTitle = div.querySelector('.details-title');
    const addToCart = div.querySelector('#add-to-cart');

    additionalDetailsButton.addEventListener('click', () => {
      detailsIcons[0].classList.toggle('visible');
      detailsIcons[1].classList.toggle('visible');
      detailsTitle.classList.toggle('title-open');
      additionalDetails.toggleAttribute('hidden');
    });

    addToCart.addEventListener('click', () => {
      const event = new CustomEvent('addToCart');
      event.plantData = plant;
      div.dispatchEvent(event);
    });

    container.appendChild(div);
  };

  return div;
}
