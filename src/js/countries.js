import fetchCountries from './fetchCountries';
import input from '../templates/input.hbs'
import country from '../templates/country.hbs'
const _ = require('lodash')

const marcup = input();
const wrapperForInput = document.querySelector('.wrapper-for-input');
wrapperForInput.insertAdjacentHTML("beforeend", marcup)
const inputRef = document.querySelector('.input')


function callbackInput (event){
    let resCounty = event.target.value;
    const res = fetchCountries(resCounty);
    res.then(data => {
        console.log(data)
        if(data.length > 10){
            console.log("too many")
        }else if(data.length === 1){
            console.log("1 country")
        }else if(data.length > 1){
            console.log("more then 1")
        }
        const countryHtml = country(data);
        const wrapperForQueryResult = document.querySelector('.result-wrapper');
        wrapperForQueryResult.innerHTML = countryHtml;
    });
}

inputRef.addEventListener("input", _.debounce(callbackInput, 500))








//https://github.com/goitacademy/javascript-homework/tree/master/homework-12

//https://www.youtube.com/watch?v=P21I8JtLGOs&feature=youtu.be
