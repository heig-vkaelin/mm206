'use strict';

export default function PlantDetailsView() {
  const div = document.createElement('div');
  div.classList.add('card', 'card-xl');

  const defaultPlant = {
    name: '',
    category_id: 1,
    description: '',
    price: 0,
    discount: 0,
    height: 0,
    zone_id: 2,
    min_temp_day: 10,
    min_temp_night: 2,
    nitrogen: 50,
    potassium: 40,
    phosphor: 10,
    stock: 0,
    expected_shipped: new Date().toJSON().split('T')[0],
    reserved_members: false,
    extra_1: '',
    extra_2: 0,
    extra_3: '',
    extra_4: 0,
  };

  function get(plant, key) {
    return plant[key] ?? defaultPlant[key];
  }

  div.render = (container, categories, zones, plant = defaultPlant) => {
    const isEditing = !!plant.name;
    const title = isEditing ? 'Edit' : 'Add';
    const shippingDate = plant.expected_shipped
      ? new Date(plant.expected_shipped).toJSON().split('T')[0]
      : defaultPlant.expected_shipped;

    div.innerHTML = `
      <h1 class="path-header">
        <a href="plants.html">Plants</a>
        <span>/</span>
        ${title} a plant
      </h1>
      <form>
        <div class="spacer">
          <label for="name">Name*</label>
          <input type="text" name="name" placeholder="Plant name" value="${get(plant, 'name')}" />
        </div>

        <div class="spacer half">
          <label for="category_id">Category</label>
          <select name="category_id" id="category" required value="${get(plant, 'category_id')}"></select>
        </div>

        <div class="spacer half">
          <label for="zone_id">Zone</label>
          <select name="zone_id" id="zone" required value="${get(plant, 'zone_id')}"></select>
        </div>

        <div class="spacer">
          <label for="description">Description</label>
          <input type="text" name="description" placeholder="Plant description" value="${get(plant, 'description')}" />
        </div>

        <div class="spacer">
          <label for="img_file">Image (max 1MB)</label>
          <input type="file" name="img_file" accept=".jpg, .jpeg, .png" />
        </div>

        <div class="spacer half">
          <label for="price">Price</label>
          <input type="number" name="price" placeholder="Plant price (default: 0)" value="${get(plant, 'price')}" />
        </div>

        <div class="spacer half">
          <label for="discount">Discount</label>
          <input
            type="number"
            name="discount"
            placeholder="Discount in % default: 0)"
            value="${get(plant, 'discount')}"
          />
        </div>

        <div class="spacer half">
          <label for="min_temp_day">Minimum day-temperature</label>
          <input
            type="number"
            name="min_temp_day"
            placeholder="Temperature in °C (default: 10)"
            value="${get(plant, 'min_temp_day')}"
          />
        </div>

        <div class="spacer half">
          <label for="min_temp_night">Minimum night-temperature</label>
          <input
            type="number"
            name="min_temp_night"
            placeholder="Temperature in °C (default: 2)"
            value="${get(plant, 'min_temp_night')}"
          />
        </div>

        <div class="spacer half">
          <label for="nitrogen">Nitrogen</label>
          <input
            type="number"
            name="nitrogen"
            placeholder="Recommended % in fertilizer (default: 50)"
            value="${get(plant, 'nitrogen')}"
          />
        </div>

        <div class="spacer half">
          <label for="potassium">Potassium</label>
          <input
            type="number"
            name="potassium"
            placeholder="Recommended % in fertilizer (default: 40)"
            value="${get(plant, 'potassium')}"
          />
        </div>

        <div class="spacer half">
          <label for="phosphor">Phosphor</label>
          <input
            type="number"
            name="phosphor"
            placeholder="Recommended % in fertilizer (default: 10)"
            value="${get(plant, 'phosphor')}"
          />
        </div>

        <div class="spacer half"></div>

        <div class="spacer half">
          <label for="height">Height</label>
          <input
            type="number"
            name="height"
            placeholder="Height in cm (default: 0)"
            value="${get(plant, 'height')}"
          />
        </div>

        <div class="spacer half">
          <label for="stock">Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="Number of plants in stock (default: 0)"
            value="${get(plant, 'stock')}"
          />
        </div>

        <div class="spacer half">
          <label for="expected_shipped">Expected shipped</label>
          <input
            type="date"
            name="expected_shipped"
            placeholder="Date for shipping (default: today)"
            value="${shippingDate}"
          />
        </div>

        <div class="spacer half">
          <label for="reserved_members">Available for members only</label>
          <input type="checkbox" name="reserved_members" ${get(plant, 'reserved_members') ? 'checked' : ''} />
        </div>

        <div class="spacer half">
          <label for="extra_1">Extra 1</label>
          <input
            type="text"
            name="extra_1"
            placeholder="Custom information about the plant"
            value="${get(plant, 'extra_1')}"
          />
        </div>

        <div class="spacer half">
          <label for="extra_2">Extra 2</label>
          <input
            type="number"
            name="extra_2"
            placeholder="Custom information about the plant"
            value="${get(plant, 'extra_2')}"
          />
        </div>

        <div class="spacer half">
          <label for="extra_3">Extra 3</label>
          <input
            type="text"
            name="extra_3"
            placeholder="Custom information about the plant"
            value="${get(plant, 'extra_3')}"
          />
        </div>

        <div class="spacer half">
          <label for="extra_4">Extra 4</label>
          <input
            type="number"
            name="extra_4"
            placeholder="Custom information about the plant"
            value="${get(plant, 'extra_4')}"
          />
        </div>

        <p class="form-error"></p>
        <div class="spacer">
          <button class="btn btn-primary">${title}</button>
        </div>
      </form>
    `;

    const form = div.querySelector('form');
    const formError = div.querySelector('.form-error');
    const categorySelect = div.querySelector('#category');
    const zoneSelect = div.querySelector('#zone');

    categorySelect.innerHTML = categories.map((cat) => `<option value=${cat.id}>${cat.name}</option>`).join('');
    zoneSelect.innerHTML = zones.map((zone) => `<option value=${zone.id}>${zone.name}</option>`).join('');
    categorySelect.value = plant.category_id;
    zoneSelect.value = plant.zone_id;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formError.textContent = '';

      const data = new FormData(e.target);
      const event = new CustomEvent('plantSubmit');

      data.set('reserved_members', !!data.get('reserved_members'));
      if (isEditing) {
        data.append('id', plant.id);
      }

      event.plantData = data;
      div.dispatchEvent(event);
    });

    container.appendChild(div);
  };

  div.displayError = (error) => {
    const formError = div.querySelector('.form-error');
    formError.textContent = error;
  };

  return div;
}
