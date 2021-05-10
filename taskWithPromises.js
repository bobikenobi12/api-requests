const fetch = require('node-fetch');
const toJson = (res) => res.json();

let userGender;
let firstName;
let userAge;
let userCountry;
fetch('https://randomuser.me/api/')
  .then(toJson)
  .then((data) => {
    firstName = data.results[0].name.first;
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
    return fetch(`https://api.genderize.io/?name=${firstName}`);
  })
  .then(toJson)
  .then((data) => {
    const predictedGender = data.gender;
    const probability = data.probability;
    predictedGender === userGender
      ? console.log('Gender verified.')
      : console.log(
          `Gender discrepancy, probability of ${probability} is not enough.`
        );
    return fetch('https://www.affirmations.dev/');
  })
  .then(toJson)
  .then((data) => {
    console.log(data.affirmation);
    return fetch(`https://api.agify.io/?name=${firstName}`);
  })
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
    return fetch(`https://www.affirmations.dev/`);
  })
  .then(toJson)
  .then((data) => {
    console.log(data.affirmation);
    return fetch(`https://api.nationalize.io/?name=${firstName}`);
  })
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
        listOfOtherCountries.push(countryIds[j])
      }
    }
    if (matchingValue === userCountryCode) {
      console.log(`Country verified. Other possible countries: ${listOfOtherCountries.toString()} `)
    } else {
      console.log(`Country discrepancy, ${countryIds.toString()} does not contain ${userCountryCode}`)
    }
    return fetch(`https://www.affirmations.dev/`);
  })
  .then(toJson)
  .then((data) => {
    console.log(data.affirmation);
    return fetch(`https://date.nager.at/Api/v2/PublicHolidays/${userYearOfBirth}/${userCountryCode.toLowerCase()}`);
  })
  .then(toJson)
  .then((data) => {
   let filteredHolidays = data.filter(el => el.launchYear > userYearOfBirth || el.launchYear === null);
   let formatArray = [];
   for (let i = 0; i < filteredHolidays.length; i++) {
    formatArray.push(`${filteredHolidays[i].localName}(${filteredHolidays[i].name})`)   
   }
   console.log(formatArray.toString());
  })
  // .catch((err) => console.log(`Error: ${err.message}`));



// fetch('https://randomuser.me/api/')
//   .then((response) => response.json())
//   .then((data) => {
//     const firstName = data.results[0].name.first;
//     const userGender = data.results[0].gender;
//     const age = data.results[0].dob.age;
//     console.log(firstName);
//     console.log(age);
//     fetch(`https://api.genderize.io/?name=${firstName}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const gender = data.gender;
//         const probability = data.probability;
//         gender === userGender
//           ? console.log('Gender verified')
//           : console.log(
//               `Gender discrepancy, probability of ${probability} is not enough.`
//             );
//         fetch('https://www.affirmations.dev/')
//           .then((response) => response.json())
//           .then((data) => {
//             console.log(data.affirmation);
//           })
//           .catch((err) => console.log(`Error: ${err.message}`));
//       })
//       .catch((err) => console.log(`Error: ${err.message}`));
//     fetch(`https://api.agify.io/?name=${firstName}`)
//       .then((response) => response.json())
//       .then((data) => {
//         // gender === userGender
//         //   ? console.log('Gender verified')
//         //   : console.log(
//         //       `Gender discrepancy, probability of ${probability} is not enough.`
//         //     );
//       })
//       .catch((err) => console.log(`Error: ${err.message}`));
//   })
//   .catch((err) => console.log(`Error: ${err.message}`));
