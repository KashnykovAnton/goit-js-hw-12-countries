import './sass/main.scss';

import _ from 'lodash';
import cardOneCountry from './templates/templateOneCountry.hbs';
import cardCountries from './templates/templateCountries.hbs';
import API from './js/fetchCountries';
import { showError, showCatchError } from './js/pnotify';
import getRefs from './js/getRefs';

const refs = getRefs();

refs.input.addEventListener('input', _.debounce(onInputSearch, 500));

function onInputSearch(e) {
  e.preventDefault();
  const searchQuery = e.target.value;
  API.fetchCountries(searchQuery).then(renderCardCountry).catch(showCatchError);
  resetDOM();
}

function resetDOM() {
  refs.card.innerHTML = '';
}

function renderCardCountry(arr) {
  const length = arr.length;
  if (length > 10) {
    showError(length);
    return;
  }
  if (length === 1) {
    refs.card.innerHTML = cardOneCountry(arr);
    return;
  }
  refs.card.innerHTML = cardCountries(arr);

  // if (length > 1 && length < 11) {
  //   refs.card.innerHTML = cardCountries(arr);
  //   return;
  // }
  // refs.card.innerHTML = cardOneCountry(arr);
}
