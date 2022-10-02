let foodArr = ['Pizza', 'Beef', 'Fish and chips', 'Pasta'];
let container = document.getElementById('container');

for (food of foodArr) {
  let foodDiv = document.createElement('div');
  foodDiv.innerHTML = food;
  foodDiv.classList.add('foodItem');
  container.appendChild(foodDiv);
}
