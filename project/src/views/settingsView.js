'use strict';

export default function SettingsView() {
  const div = document.createElement('div');
  div.classList.add('card-container');

  div.render = (container, user) => {
    div.innerHTML = `
      <div class="card card-sm mt-10">
        <h1 class="card-title">Edit profile</h1>
        <form>
          <div class="spacer">
            <label for="username">Username*</label>
            <input type="text" name="username" value="${user.username}" required />
          </div>

          <div class="spacer">
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="Change your password if you want" />
          </div>

          <div class="spacer">
            <label for="fullname">Full name*</label>
            <input type="text" name="fullname" value="${user.full_name}" required />
          </div>

          <div class="spacer">
            <label for="street">Street*</label>
            <input type="text" name="street" value="${user.street}" required />
          </div>

          <div class="spacer">
            <label for="city">City*</label>
            <input type="text" name="city" value="${user.city}" required />
          </div>

          <div class="spacer">
            <label for="zipcode">Zipcode*</label>
            <input type="number" name="zipcode" value="${user.zipcode}" required />
          </div>

          <div class="spacer">
            <label for="country">Country*</label>
            <input type="text" name="country" value="${user.country}" required />
          </div>

          <div class="spacer">
            <label for="img_file">Profile picture (max 1MB)</label>
            <input type="file" name="img_file" accept=".jpg, .jpeg, .png" />
          </div>

          <p class="form-error"></p>
          <div class="spacer">
            <button class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
      <div class="card card-sm my-10">
        <h1 class="card-title">Other actions</h1>
        <div class="spacer">
          <button class="btn" id="logout">Logout</button>
        </div>
        <div class="spacer">
          <button class="btn btn-error" id="delete-account">Delete account</button>
        </div>
      </div>
    `;

    const form = div.querySelector('form');
    const formError = div.querySelector('.form-error');
    const logoutBtn = div.querySelector('#logout');
    const deleteUserBtn = div.querySelector('#delete-account');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formError.textContent = '';

      const data = new FormData(e.target);
      const event = new CustomEvent('changeUser');
      event.userData = data;
      div.dispatchEvent(event);
    });

    logoutBtn.addEventListener('click', () => {
      const event = new CustomEvent('logout');
      div.dispatchEvent(event);
    });

    deleteUserBtn.addEventListener('click', () => {
      const event = new CustomEvent('deleteUser');
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
