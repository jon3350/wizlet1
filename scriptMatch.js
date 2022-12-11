//Extract Data
const allSetsIndex = localStorage.getItem('allSetsIndex');
const allSets = JSON.parse(localStorage.getItem('allSets'));

if(!allSetsIndex) window.open('index.html','_self');

//Use this set
const set = allSets[allSetsIndex];
const list = set.termDefArr.map(x => {
    return x;
});

list.sort(() => {
    return Math.random() - 0.5;
})
while(list.length > 10) {
    list.pop();
}



//Set up
let matchesMade = 0;
let runTimer = false;
let count = 0;
const startButton = document.querySelector('[data-startButton]');
startButton.addEventListener('click', () => {
    if(!runTimer) {
        matchesMade = 0;
        runTimer = true;
        count = 0;
        setUpCards();
        runStopWatch();
    } else {
        location.reload(); //ez way out
    }
});
const stopWatch = document.querySelector('[data-stopWatch]');
function runStopWatch() {
    if(runTimer) {
        count++;
        stopWatch.innerText = `${count/10}`;
        setTimeout(runStopWatch, 100); //runs every 10 milsecs
    }
}

let magicCard = null;
const gameBox = document.querySelector('[data-gameBox]');
function setUpCards() {
    const cardArr = [];
    //delete all cards
    Array.from(gameBox.children).forEach(x => x.remove());

    //add the remaining to the gameBox
    list.forEach( (element, index) => {
        const cardTerm = document.createElement('div');
        cardTerm.classList.add('card');
        cardTerm.dataset.pairNumber = index;
        cardTerm.innerText = element.term;
        cardTerm.addEventListener('click', cardClicked);
        const cardDef = document.createElement('div');
        cardDef.classList.add('card');
        cardDef.dataset.pairNumber = index;
        cardDef.innerText = element.def;
        cardDef.addEventListener('click', cardClicked);


        cardArr.push(cardTerm, cardDef);
    });
    cardArr.sort(() => Math.random() - 0.5);
    cardArr.forEach(x => gameBox.append(x));
}

function cardClicked(e) {
    if(magicCard === null) {
        magicCard = e.target;
        magicCard.classList.add('selected');
        Array.from(gameBox.children).forEach(x => {
            x.classList.remove('wrong');
        })
    } else if (magicCard === e.target) {
        magicCard.classList.remove('selected');
        magicCard = null;
    } else {
        //check if match
        if(magicCard.dataset.pairNumber === e.target.dataset.pairNumber) {
            e.target.classList.add('right');
            magicCard.classList.remove('selected');
            magicCard.classList.add('right');
            e.target.removeEventListener('click', cardClicked);
            magicCard.removeEventListener('click', cardClicked);

            //check if game over
            matchesMade ++;
            if(matchesMade == list.length) {
                runTimer = false;
            }

        } else {
            e.target.classList.remove('selected');
            magicCard.classList.remove('selected');
            e.target.classList.add('wrong');
            magicCard.classList.add('wrong');
        }
        magicCard = null;
    }
}