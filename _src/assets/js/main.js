'use strict';

const btnBeginEl = document.querySelector('.btn--begin');
const input4CardsEl = document.getElementById('card4');
const input6CardsEl = document.getElementById('card6');
const input8CardsEl = document.getElementById('card8');
const cardContainer = document.querySelector('.card__container');
const aux = document.querySelector('.aux');
const defaultImage = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
let arrayCards =[];

let arrayObjectsGame = [];
let arrayObjectsCache=[];
let numberCards =4;
getNumberCardsSaved();
getDataFromCache();

function getNumberCardsSaved(){
    const data = localStorage.getItem('numberCards');
    if (data){
        numberCards=data;
        const inputChecked = document.getElementById('card'+data);
        inputChecked.checked=true;
    }
    else{numberCards=4}
    
}
function getNumberSelected(event){
    numberCards = event.currentTarget.value;
    localStorage.setItem('numberCards',numberCards);
}

input4CardsEl.addEventListener('click',getNumberSelected);
input6CardsEl.addEventListener('click',getNumberSelected);
input8CardsEl.addEventListener('click',getNumberSelected);
btnBeginEl.addEventListener('click',getCards);
aux.addEventListener('click',borrarcache);

function getCards(){
    cardContainer.innerHTML='';
    fetch ('https://raw.githubusercontent.com/Adalab/cards-data/master/'+numberCards+'.json')
    .then(response => response.json())
    .then(data => {arrayCards = data;
        printDefaultImages(arrayCards) });     
}

function printDefaultImages(arrayCards){
  
    arrayObjectsGame=[];
    for(let i=0;i<arrayCards.length;i++)
    { 
        const card = document.createElement('li');
        cardContainer.appendChild(card);
        const cardImage = document.createElement('img');
        card.appendChild(cardImage);
        card.classList.add('card');
        cardImage.classList.add('card__image');
        cardImage.setAttribute('src',defaultImage);
        addObjectArrayGame(i,arrayCards[i].image,arrayCards[i].pair);
       
        cardImage.setAttribute('id',i);
        card.addEventListener('click',changeImage);
       
       
    }
    // console.log(arrayObjectsGame);
}

function changeImage(event){
    const card= event.currentTarget;
    const cardImage = card.querySelector('img');
    const cardImageId = parseInt(cardImage.getAttribute('id'));
    // console.log(cardImageId);
    const currentImage = cardImage.src;
    const obj = arrayObjectsGame.find(card=>card.id===cardImageId);
    
    // console.log(arrayObjectsGame);
    if (currentImage == defaultImage){
        cardImage.setAttribute('src',arrayObjectsGame[cardImageId].image);
         addObjectCache(obj);
        
       
    }
    else{
        cardImage.setAttribute('src',defaultImage);
        removeObjectCache(obj);
    }
    
}

function createObject(id,image,pair){
    const obj ={
        id :id ,
        image: image,
        pair:pair,
    }
    return obj;
    

}
function addObjectArrayGame(id,image,pair){
    const obj = createObject(id,image,pair);
    arrayObjectsGame.push(obj);
    localStorage.setItem('pairsGame',JSON.stringify(arrayObjectsGame));
    //  console.log(arrayObjectsGame);
}

function addObjectCache(obj){
    arrayObjectsCache.push(obj);
    localStorage.setItem('savedPairs',JSON.stringify(arrayObjectsCache));
}
function removeObjectCache(obj){
    arrayObjectsCache = arrayObjectsCache.filter(objeto=>objeto.id!==obj.id);
    localStorage.setItem('savedPairs',JSON.stringify(arrayObjectsCache));
}


function getDataFromCache(){
    const data = JSON.parse(localStorage.getItem('savedPairs'));
    if(data){ arrayObjectsCache =data}else{arrayObjectsCache=[];}
    const dataGame = JSON.parse(localStorage.getItem('pairsGame'));
    if (dataGame){arrayObjectsGame=dataGame}else{arrayObjectsGame=[]};
   
}


console.log(arrayObjectsCache);
console.log(arrayObjectsGame);
printFromCache();
function printFromCache(){
    for(let i=0;i<arrayObjectsGame.length;i++)
    { 
        const card = document.createElement('li');
        cardContainer.appendChild(card);
        const cardImage = document.createElement('img');
        card.appendChild(cardImage);
        card.classList.add('card');
        cardImage.classList.add('card__image');
        const obj = arrayObjectsCache.find(card=>card.id===i);
        let currentImage=defaultImage;
        if(obj){currentImage=arrayObjectsGame[i].image;}
        cardImage.setAttribute('src',currentImage);
        // addObjectArrayGame(i,arrayCards[i].image,arrayCards[i].pair);
       
        cardImage.setAttribute('id',i);
        card.addEventListener('click',changeImage);
       
    }
    // console.log(arrayObjectsGame);
}
