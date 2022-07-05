import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function fetchCountries(evt) {
  const name = evt.target.value.trim();
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
  )
    .then(response => {
      return response.json();
    })
    .then(countries => renderCountriesList(countries))
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function renderCountriesList(countries) {
  console.log(countries.length);
  if (countries.length <= 0) {
      return
  } else { 
    if (countries.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else {
        const markup = countries
          .map(country => {
            return `<li class="country__item">
              <img src="${country.flags.svg}" alt="flag of country" class="country__flag">
              <p class="country__name">${country.name.official}</p>
            </li>`;
          })
          .join('');
        countryList.innerHTML = markup;
    }
  }
}
