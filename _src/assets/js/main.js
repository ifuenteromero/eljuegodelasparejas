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
let arrayObjectsFront=[];
let numberCards =4;
getNumberCardsSaved();


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
    arrayObjectsFront=[];
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
        cardImage.setAttribute('data-paired',false);
    }
    // console.log(arrayObjectsGame);
}

function changeImage(event){
    const card= event.currentTarget;
    const cardImage = card.querySelector('img');
    const cardImageId = parseInt(cardImage.getAttribute('id'));
    const currentImage = cardImage.src;
    const obj = arrayObjectsGame.find(card=>card.id===cardImageId);
    console.log(obj);
    const fronted = arrayObjectsFront.includes(obj);
    console.log(fronted);
    
    if (!fronted){
        cardImage.setAttribute('src',arrayObjectsGame[cardImageId].image);
        arrayObjectsFront.push(obj);  
        if(arrayObjectsFront.length ===2){
            const currentPair = obj.pair;
            const otherPair = arrayObjectsFront[0].pair;
            // console.log ('current'+currentPair);
            // console.log ('other'+otherPair);
            if (currentPair==otherPair){
                const otherId = arrayObjectsFront[0].id;
                const currentId = obj.id;
                const otherCard = document.getElementById(otherId);
                const currentCard = document.getElementById(currentId);
                otherCard.setAttribute('data-paired',true);
                currentCard.setAttribute('data-paired',true);
                console.log(otherCard,currentCard);
            }
            else{ setTimeout(allCardsBack,2000);}
            arrayObjectsFront=[];
        }
        
    }
    // else{
    //     cardImage.setAttribute('src',defaultImage);
    //     arrayObjectsFront=arrayObjectsFront.filter(card=>card.id!==cardImageId);

    // }
    console.log(arrayObjectsFront); 
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
}


function borrarcache(){
    // localStorage.removeItem('numberCards');
    allCardsBack();
}

function allCardsBack(){
    arrayObjectsFront=[];
    const allCards = document.querySelectorAll('.card__image');
    // const cardsNotPaired = allCards.filter(card=>
    //     !card.getAttribute('data-paired'));
    console.log(allCards);
    for (const card of allCards){
        const paired = card.getAttribute('data-paired');
        if(paired=='false'){
            card.src = defaultImage;
        }
       
    }
    console.log(arrayObjectsFront);
}