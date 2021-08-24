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

  API.fetchCountries(searchQuery).then(renderCardCountry).catch(onFetchError);

  resetDOM();
}

function resetDOM() {
  refs.card.innerHTML = '';
}

function renderCardCountry(arr) {
  const length = arr.length;
  // console.log(`Длина массива ${length}`);
  if (length === 1) {
    // console.log('Равно 1 - выводим карточку');
    refs.card.innerHTML = cardOneCountry(arr);
  } else {
    if (length > 10) {
      showError(length);
    } else {
      // console.log('Больше 1 и меньше 10 - выводим список');
      refs.card.innerHTML = cardCountries(arr);
    }
  }
}

function onFetchError(searchQuery) {
  showCatchError(searchQuery);
}
