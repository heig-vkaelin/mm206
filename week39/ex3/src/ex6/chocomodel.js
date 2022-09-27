function ChocoModel() {
  this.getChocoData = (type) => {
    const url = `https://sukkergris.no/choco/?type=${type}`;

    const thePromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });

    return thePromise;
  };
}
