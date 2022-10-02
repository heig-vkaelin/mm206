function createChocoListView() {
  const div = document.createElement('div');

  div.showData = (arr) => {
    for (const value of arr) {
      const myDiv = document.createElement('div');
      myDiv.classList.add('choco');
      myDiv.innerHTML = '<img src=' + value.img_small + '>';
      myDiv.innerHTML += '<h2>' + value.name + '</h2>';
      myDiv.innerHTML += '<p>' + value.description + '</p>';

      myDiv.addEventListener('click', () => {
        const event = new CustomEvent('chocoselect');
        event.chocodata = value;
        div.dispatchEvent(event);
      });

      div.appendChild(myDiv);
    }
  };

  return div;
}
