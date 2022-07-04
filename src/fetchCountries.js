const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name.target.value}?fields=name,capital,population,languages,flags`
  )
    .then(response => {
      return response.json();
    })
    .then(countries => renderCountriesList(countries))
    .catch(error => alert("error"));
}

function renderCountriesList(countries) {
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
