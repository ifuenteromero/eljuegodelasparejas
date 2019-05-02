'use strict';

const btnBeginEl = document.querySelector('.btn--begin');
const input4CardsEl = document.getElementById('card4');
const input6CardsEl = document.getElementById('card6');
const input8CardsEl = document.getElementById('card8');
const cardContainer = document.querySelector('.card__container');
const aux = document.querySelector('.aux');
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
        for(const obj of arrayCards){
            
            const card = document.createElement('div');
           cardContainer.appendChild(card);
           const cardImage = document.createElement('img');
          card.appendChild(cardImage);
          cardImage.setAttribute('src',obj.image);
        
        
        } });
        
        //aux.innerHTML=data[0].name

    // for (let i=0;i<numberCards;i++){
    //     console.log(numberCards);
    //    const card = document.createElement('div');
    //    cardContainer.appendChild(card);
    //    card.classList.add('card');

//}
}
//# sourceMappingURL=main.js.map
