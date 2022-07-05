import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function fetchCountries(evt) {
  const name = evt.target.value.trim();
  if (!name) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  } else {
    fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
    )
      .then(response => {
        return response.json();
      })
      .then(countries => renderCountriesList(countries))
      .catch(error => {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notify.failure('Oops, there is no country with that name')
      });
  }
}

function renderCountriesList(countries) {
  if (countries.length <= 0) {
    return;
  } else {
    if (countries.length > 10) {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else {
      if (countries.length === 1) {
        countryList.innerHTML = '';
        const htmlString = `<div class="country__box">
            <img src="${countries[0].flags.svg}" alt="flag of country" class="country__big-flag">
            <p class="country__big-name">${countries[0].name.official}</p>
            </div>
            <p class="country__info"><span class="info__name">Capital:  </span>${countries[0].capital}</p>
            <p class="country__info"><span class="info__name">Population:  </span>${countries[0].population}</p>
            <p class="country__info"><span class="info__name">Languages:  </span>${Object.values(countries[0].languages).join(', ')}</p>`;
        countryInfo.innerHTML = htmlString;
      } else {
        countryInfo.innerHTML = '';
          const markup = countries
            .map(country => {
            return `<li class="country__item">
              <img src="${country.flags.svg}" alt="flag of country" class="country__flag">
              <p class="country__name">${country.name.common}</p>
            </li>`;
          })
          .join('');
        countryList.innerHTML = markup;
      }
    }
  }
};

