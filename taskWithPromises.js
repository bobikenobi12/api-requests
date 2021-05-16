const fetch = require('node-fetch');
const toJson = (res) => res.json();

let userGender;
let firstName;
let userAge;
let userCountry;

fetch('https://randomuser.me/api/')
  .then(toJson)
  .then((data) => {
    const dataResults = data.results[0];
    firstName = dataResults.name.first;
    for (let i = 0; i < firstName.length; i++) {
      const code = firstName.charCodeAt(i);
      if (!((code >= 97 && code <= 122) || (code >= 65 && code <= 90))) {
        throw new Error('The first name must contain only A-Z  letters!');
      }
    }
    userGender = dataResults.gender;
    userAge = dataResults.dob.age;
    userCountry = dataResults.location.country;
    userCountryCode = dataResults.nat;
    initialDate = new Date(dataResults.dob.date);
    userYearOfBirth = initialDate.getFullYear();
    console.log(`First name: ${firstName}`);
    console.log(`User gender: ${userGender}`);
    console.log(`User age: ${userAge}`);
    console.log(`User country: ${userCountry}`);
    console.log(`User country code: ${userCountryCode}`);
    console.log(`User year of birth: ${userYearOfBirth}`);
    return fetch(`https://api.genderize.io/?name=${firstName}`);
  })
  .then(toJson)
  .then(({ gender, probability }) => {
    gender === userGender
      ? console.log('Gender verified.')
      : console.log(
          `Gender discrepancy, probability of ${probability} is not enough.`
        );
    return fetch('https://www.affirmations.dev/');
  })
  .then(toJson)
  .then(({ affirmation }) => {
    console.log(affirmation);
    return fetch(`https://api.agify.io/?name=${firstName}`);
  })
  .then(toJson)
  .then(({ age }) => {
    console.log(`Predicted age: ${age}`);
    age === userAge
      ? console.log('Age verified.')
      : console.log(
          `Age discrepancy, there was ${Math.abs(
            age - userAge
          )} years difference.`
        );
    return fetch(`https://www.affirmations.dev/`);
  })
  .then(toJson)
  .then(({ affirmation }) => {
    console.log(affirmation);
    return fetch(`https://api.nationalize.io/?name=${firstName}`);
  })
  .then(toJson)
  .then(({ country }) => {
    const countryIds = country
      .map((el) => el.country_id)
      .filter((el) => el !== '');
    if (countryIds.length === 0) {
      console.log('No countries were matched to the specified user');
    }
    console.log(countryIds);
    const matchingValue = countryIds.find((el) => el === userCountryCode);
    const listOfOtherCountries = countryIds.filter(
      (el) => el !== matchingValue
    );
    if (matchingValue === userCountryCode) {
      console.log(
        `Country verified. Other possible countries: ${listOfOtherCountries.toString()} `
      );
    } else {
      console.log(
        `Country discrepancy, ${countryIds.toString()} does not contain ${userCountryCode}`
      );
    }
    return fetch(`https://www.affirmations.dev/`);
  })
  .then(toJson)
  .then(({ affirmation }) => {
    console.log(affirmation);
    return fetch(
      `https://date.nager.at/Api/v2/PublicHolidays/${userYearOfBirth}/${userCountryCode.toLowerCase()}`
    );
  })
  .then(toJson)
  .then((data) => {
    const filteredHolidays = data
      .filter((el) => el.launchYear > userYearOfBirth || el.launchYear === null)
      .map((el) => `${el.localName}(${el.name})`);
    console.log(filteredHolidays);
  })
  .catch((err) => console.log(`Error: ${err.message}`));
