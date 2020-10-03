import countries from './fetchCountries';
import input from '../templates/input.hbs'

const marcup = input();

const wrapperForInput = document.querySelector('.wrapper-for-input');
wrapperForInput.insertAdjacentHTML("beforeend", marcup)



console.log(countries("uk"))