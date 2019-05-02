'use strict';

const btnBeginEl = document.querySelector('.btn--begin');
const input4CardsEl = document.getElementById('card4');
const input6CardsEl = document.getElementById('card6');
const input8CardsEl = document.getElementById('card8');
const cardContainer = document.querySelector('.card__container');
let numberCards =4;
console.log(cardContainer);
function getNumberSelected(event){
    numberCards = event.currentTarget.value;
}

input4CardsEl.addEventListener('click',getNumberSelected);
input6CardsEl.addEventListener('click',getNumberSelected);
input8CardsEl.addEventListener('click',getNumberSelected);
btnBeginEl.addEventListener('click',getCards);

function getCards(){
    cardContainer.innerHTML='';
    for (let i=0;i<numberCards;i++){
        console.log(numberCards);
       const card = document.createElement('div');
       cardContainer.appendChild(card);
       card.classList.add('card');

}
}
//# sourceMappingURL=main.js.map
