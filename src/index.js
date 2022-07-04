import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');


const searchBoxInput = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 300;


searchBoxInput.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

