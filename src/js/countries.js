import fetchCountries from './fetchCountries';
import tplInput from '../templates/input.hbs'
import tplCountry from '../templates/country.hbs'
import tplCountries from '../templates/countries.hbs'

import "@pnotify/core/dist/PNotify.css"
import '@pnotify/core/dist/BrightTheme.css';
import { error } from "@pnotify/core";

const _ = require('lodash')

const wrapperForInputRef = document.querySelector('.wrapper-for-input');// ссылка на HTML контейнер для input
const wrapperForQueryResult = document.querySelector('.result-wrapper');// ссылка на HTML контейнер для результата (под input-ом) 

const inputMarcup = tplInput(); // получил разменту input из .hbs
wrapperForInputRef.insertAdjacentHTML("beforeend", inputMarcup) // вставил input в разметку

const inputRef = document.querySelector('.input') // теперь можно взять ссылку на input

function templateWrapper (data){
    let template = null
    if(data.length > 10){
        error({
            title: `Too many matches found. Please enter a more specific query.
                    ${data.length} - counties founded.`,
            hide: true,
            delay: 2000
        })
        template = null; // провоцирую ошибку поскольку. template не функция и попадёт в catch
    }else if(data.length === 1){
        data = data[0]; // Поскольку пришел массив из одного элемента - вытягиваю елемент чтоб не делать each в .hbs.
        template = tplCountry
    }else if(data.length > 1){
        template = tplCountries
    }else{
        error({
            title: 'Нет такой страны',
            hide: true,
            delay: 1000
        })
    }
    return template(data)
}

function callbackInput (event){
    let resCounty = event.target.value;
    const res = fetchCountries(resCounty);
    res.then(data => {
        const marcup = templateWrapper(data);
        wrapperForQueryResult.innerHTML = marcup;
    })
    .catch(error => {
        console.log(error)
        wrapperForQueryResult.innerHTML = "";
    });
}

inputRef.addEventListener("input", _.debounce(callbackInput, 500))