'use strict';

const btnBeginEl = document.querySelector('.btn--begin');
const input4CardsEl = document.getElementById('card4');
const input6CardsEl = document.getElementById('card6');
const input8CardsEl = document.getElementById('card8');
const cardContainer = document.querySelector('.card__container');
const aux = document.querySelector('.aux');
const defaultImage = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
let arrayCards =[];
let arrayImages =[];
let numberCards =4;

function getNumberSelected(event){
    numberCards = event.currentTarget.value;
}

input4CardsEl.addEventListener('click',getNumberSelected);
input6CardsEl.addEventListener('click',getNumberSelected);
input8CardsEl.addEventListener('click',getNumberSelected);
btnBeginEl.addEventListener('click',getCards);

function getCards(){
    cardContainer.innerHTML='';
    fetch ('https://raw.githubusercontent.com/Adalab/cards-data/master/'+numberCards+'.json')
    .then(response => response.json())
    .then(data => {arrayCards = data;
        printDefaultImages(arrayCards) });     
}

function printDefaultImages(arrayCards){
    let i=0;
    for(const obj of arrayCards){ 
        const card = document.createElement('li');
        cardContainer.appendChild(card);
        const cardImage = document.createElement('img');
        card.appendChild(cardImage);
        card.classList.add('card');
        cardImage.setAttribute('src',defaultImage);
        cardImage.setAttribute('id',i);
        card.addEventListener('click',changeImage );
        arrayImages.push(obj.image);
        // console.log(arrayImages);
        i++;
    
    }
}

function changeImage(event){
    const card= event.currentTarget;
    const cardImage = card.firstChild;
    const cardImageIndex = cardImage.getAttribute('id');
    const currentImage = cardImage.src;
    if (currentImage == defaultImage){
        cardImage.setAttribute('src',arrayImages[cardImageIndex]);
    }
    else{
        cardImage.setAttribute('src',defaultImage);
    }
    
}