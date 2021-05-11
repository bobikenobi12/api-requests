const fetch = require('node-fetch');
const toJson = (res) => res.json();

let firstName;
let userGender;
let userAge;
let userCountry;
let userCountryCode;
let initialDate;
let userYearOfBirth;

async function example() {
  log1 = await user();
  log2 = await gender();
  log3 = await firstAffirmation();
  log4 = await age();
  log5 = await secondAffirmation();
  log6 = await country();
  log7 = await thirdAffirmation();
  log8 = await holiday();
}
let log1;
let log2;
let log3;
let log4;
let log5;
let log6;
let log7;
let log8;
example()

async function user() {
  await fetch('https://randomuser.me/api/')
    .then(toJson)
    .then((data) => {
      firstName = data.results[0].name.first;
      for (let i = 0; i < firstName.length; i++) {
        const code = firstName.charCodeAt(i);
        if (!((code >= 97 && code <= 122) || (code >= 65 && code <= 90))) {
          throw new Error('The first name must contain only A-Z  letters!');
        } else {
          continue;
        }
        
      }
      userGender = data.results[0].gender;
      userAge = data.results[0].dob.age;
      userCountry = data.results[0].location.country;
      userCountryCode = data.results[0].nat;
      initialDate = new Date(data.results[0].dob.date);
      userYearOfBirth = initialDate.getFullYear();
      console.log(`First name: ${firstName}`);
      console.log(`User gender: ${userGender}`);
      console.log(`User age: ${userAge}`);
      console.log(`User country: ${userCountry}`);
      console.log(`User country code: ${userCountryCode}`);
      console.log(`User year of birth: ${userYearOfBirth}`);
    })
    .catch((err) => console.log(`Error: ${err.message}`));
}

async function gender() {
  await fetch(`https://api.genderize.io/?name=${firstName}`)
    .then(toJson)
    .then((data) => {
      const predictedGender = data.gender;
      const probability = data.probability;
      predictedGender === userGender
        ? console.log('Gender verified.')
        : console.log(
            `Gender discrepancy, probability of ${probability} is not enough.`
          );
    })
    .catch((err) => console.log(`Error: ${err.message}`));
}

async function firstAffirmation() {
  await fetch('https://www.affirmations.dev/')
    .then(toJson)
    .then((data) => {
      console.log(data.affirmation);
    })
    .catch((err) => console.log(`Error: ${err.message}`));
}

async function age() {
  await fetch(`https://api.agify.io/?name=${firstName}`)
    .then(toJson)
    .then((data) => {
      const predictedAge = data.age;
      console.log(`Predicted age: ${predictedAge}`);
      predictedAge === userAge
        ? console.log('Age verified.')
        : console.log(
            `Age discrepancy, there was ${Math.abs(
              predictedAge - userAge
            )} years difference.`
          );
    })
    .catch((err) => console.log(`Error: ${err.message}`));
}

async function secondAffirmation() {
  await fetch('https://www.affirmations.dev/')
    .then(toJson)
    .then((data) => {
      console.log(data.affirmation);
    })
    .catch((err) => console.log(`Error: ${err.message}`));
}

async function country() {
  await fetch(`https://api.nationalize.io/?name=${firstName}`)
    .then(toJson)
    .then((data) => {
      let countryDataArray = data.country;
      let countryIds = [];
      let listOfOtherCountries = [];
      let matchingValue = [];
      for (let i = 0; i < countryDataArray.length; i++) {
        countryIds.push(countryDataArray[i].country_id);
        if (!countryIds[0]) {
          throw new Error('No countries were matched to the specified user');
        } else {
          continue;
        }
      }

      for (let j = 0; j < countryIds.length; j++) {
        if (countryIds[j] === userCountryCode) {
          matchingValue.push(countryIds[j]);
        } else {
          listOfOtherCountries.push(countryIds[j]);
        }
      }
      if (matchingValue === userCountryCode) {
        console.log(
          `Country verified. Other possible countries: ${listOfOtherCountries.toString()} `
        );
      } else {
        console.log(
          `Country discrepancy, ${countryIds.toString()} does not contain ${userCountryCode}`
        );
      }
    })
    .catch((err) => console.log(`Error: ${err.message}`));
}

async function thirdAffirmation() {
  await fetch('https://www.affirmations.dev/')
    .then(toJson)
    .then((data) => {
      console.log(data.affirmation);
    })
    .catch((err) => console.log(`Error: ${err.message}`));
}

async function holiday() {
  await fetch(
    `https://date.nager.at/Api/v2/PublicHolidays/${userYearOfBirth}/${userCountryCode.toLowerCase()}`
  )
    .then(toJson)
    .then((data) => {
      let filteredHolidays = data.filter((el) => el.launchYear > userYearOfBirth || el.launchYear === null);
      let formatArray = [];
      for (let i = 0; i < filteredHolidays.length; i++) {
        formatArray.push(
          `${filteredHolidays[i].localName}(${filteredHolidays[i].name})`
        );
      }
      console.log(formatArray.toString());
    })
    .catch((err) => console.log(`Error: ${err.message}`));
}


