import fetchCountries from './fetchCountries';
import tplInput from '../templates/input.hbs'
import tplCountry from '../templates/country.hbs'
import tplCountries from '../templates/countries.hbs'
import tplTooManyCountries from '../templates/countries-notification.hbs'
import tplCountriesNotFound from '../templates/countries-not-found.hbs'
const _ = require('lodash')

const wrapperForInputRef = document.querySelector('.wrapper-for-input');// ссылка на HTML контейнер для input
const wrapperForQueryResult = document.querySelector('.result-wrapper');// ссылка на HTML контейнер для результата (под input-ом) 

const inputMarcup = tplInput(); // получил разменту input из .hbs
wrapperForInputRef.insertAdjacentHTML("beforeend", inputMarcup) // вставил input в разметку

const inputRef = document.querySelector('.input') // теперь можно взять ссылку на input

function callbackInput (event){
    let resCounty = event.target.value;
    const res = fetchCountries(resCounty);
    res.then(data => {
        console.log(data)
        let template = null
        if(data.length > 10){
            template = tplTooManyCountries
        }else if(data.length === 1){
            template = tplCountry
        }else if(data.length > 1){
            template = tplCountries
        }
        const marcup = template(data);
        wrapperForQueryResult.innerHTML = marcup;
    })
    .catch(error => {
        const marcup = tplCountriesNotFound(error)
        wrapperForQueryResult.innerHTML = marcup
    });
}

inputRef.addEventListener("input", _.debounce(callbackInput, 500))

//https://github.com/goitacademy/javascript-homework/tree/master/homework-12

//https://www.youtube.com/watch?v=P21I8JtLGOs&feature=youtu.be
