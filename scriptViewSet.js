//Extract Data
const allSetsIndex = localStorage.getItem('allSetsIndex');
const allSets = JSON.parse(localStorage.getItem('allSets'));

if(!allSetsIndex) window.open('index.html','_self');

//Use this set
const set = allSets[allSetsIndex];
const list = set.termDefArr;

//Set up
const title = document.querySelector('[data-title]');
title.innerText = set.title;



//Set up table row
const termTableTitle = document.querySelector('[data-term-table-title]');
termTableTitle.innerText = `Terms Table (${list.length})`;
const termsTableInsert = document.querySelector('[data-insert-row-above]');
list.forEach(x => {
    const divTerm = document.createElement('div');
    const divDef = document.createElement('div');
    divTerm.innerText = x.term;
    divDef.innerText = x.def;
    termsTableInsert.before(divTerm, divDef);
});


//set up flash cards
let flashcardIndex = 0;
let isTerm = true;
const flashcardContent = document.querySelector('[data-flashcardContent]');
const termOrDef = document.querySelector('[data-termOrDef]');
const cardNumber = document.querySelector('[data-cardNumber]');
const prevButton = document.querySelector('[data-prevButton]');
const nextButton = document.querySelector('[data-nextButton]');
flashcardContent.addEventListener('click', e => {
    isTerm = !isTerm;
    updateFlashcard();
})
prevButton.addEventListener('click', e => {
    flashcardIndex--;
    isTerm = true;
    updateFlashcard();
})
nextButton.addEventListener('click', e => {
    flashcardIndex++;    
    isTerm = true;
    updateFlashcard();
})
updateFlashcard();

function updateFlashcard() {
    flashcardIndex = (flashcardIndex+list.length)%list.length;
    if(isTerm) {
        flashcardContent.innerText = list[flashcardIndex].term;
        termOrDef.innerText = 'Term';
    } else {
        flashcardContent.innerText = list[flashcardIndex].def;
        termOrDef.innerText = 'Def';
    }
    cardNumber.innerText = `${flashcardIndex+1}/${list.length}`;
}
