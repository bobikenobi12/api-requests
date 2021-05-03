const fetch = require('node-fetch');

fetch('https://randomuser.me/api/')
  .then((response) => response.json())
  .then((data) => {
    const firstName = data.results[0].name.first;
    const userGender = data.results[0].gender;
    // console.log(firstName);
    fetch(`https://api.genderize.io/?name=${firstName}`)
      .then((response) => response.json())
      .then((data) => {
        const gender = data.gender;
        const probability = data.probability;
        gender === userGender
          ? console.log('Gender verified')
          : console.log(
              `Gender discrepancy, probability of ${probability} is not enough.`
            );
      })
      .catch((err) => console.log(`Error: ${err.message}`));
  })
  .catch((err) => console.log(`Error: ${err.message}`));
