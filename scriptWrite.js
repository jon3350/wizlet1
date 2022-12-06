//Extract Data
const allSetsIndex = localStorage.getItem('allSetsIndex');
const allSets = JSON.parse(localStorage.getItem('allSets'));
const ansWithTerm = (JSON.parse(localStorage.getItem('ansWithTerm'))!=null) ? JSON.parse(localStorage.getItem('ansWithTerm')) : false;


if(!allSetsIndex) window.open('index.html','_self');

//Use this set
const set = allSets[allSetsIndex];
const list = set.termDefArr.map(x => {
    return x;
});
if(ansWithTerm) {
    list.forEach(x => {
        let temp = x.term;
        x.term = x.def;
        x.def = temp;
    })
}

//Set up variables
const writeCard = document.querySelector('[data-writeCard]');
const accentButtonParent = document.querySelector('[data-accentButtonParent]');
const afterSubmitted = document.querySelector('[data-afterSubmitted]');
const endOfRoundTable = document.querySelector('[data-endOfRoundTable]');
const finishScreen = document.querySelector('[data-finishScreen]');
let termIndex = 0;
let rightWrongArr = []; //true for right; false for wrong

const remainingTag = document.querySelector('[data-remainingTag]');
const incorrectTag = document.querySelector('[data-incorrectTag]');
const correctTag = document.querySelector('[data-correctTag]');

const answerWithTermButton = document.querySelector('[data-answerWithTermButton]');
const answerWithDefButton = document.querySelector('[data-answerWithDefButton]');
if(ansWithTerm) {
    answerWithTermButton.classList.add('box-shadow-button');
    answerWithDefButton.classList.remove('box-shadow-button');
} else {
    answerWithTermButton.classList.remove('box-shadow-button');
    answerWithDefButton.classList.add('box-shadow-button');
}
answerWithTermButton.addEventListener('click', e => {
    localStorage.setItem('ansWithTerm', JSON.stringify(true));
    location.reload(); //idk how stable
})
answerWithDefButton.addEventListener('click', e => {
    localStorage.setItem('ansWithTerm', JSON.stringify(false));
    location.reload(); //idk how stable
})


const answerInput = document.querySelector('[data-answerInput]');
const yourAnswerValue = document.querySelector('[data-yourAnswerValue]');
const correctAnswerValue = document.querySelector('[data-correctAnswerValue]');


const answerButton = document.querySelector('[data-answerButton]');
answerButton.addEventListener('click', e => {
    if(answerInput.value != '') {
        showAnswer();
        nextButtonShowAns.focus();
    }
})
answerInput.addEventListener('keypress', e => {
    if(e.key === 'Enter') {
        answerButton.click(); //idk how stable
    }
})

const nextButtonShowAns = document.querySelector('[data-nextButtonShowAns]');
nextButtonShowAns.addEventListener('click', e => {
    termIndex++;
    if(termIndex < list.length) {
        showQuestion();
    } else {
        showEndOfRound();
        nextButtonEndOfRound.focus();
    }
})

const overrideButton = document.querySelector('[data-overrideButton]');
overrideButton.addEventListener('click', e => {
    rightWrongArr[termIndex] = !rightWrongArr[termIndex];
    nextButtonShowAns.click();  //idk how sustainable this is
})

//accent button logic - the parent was defined waaay above
Array.from(accentButtonParent.children).forEach(x => {
    x.addEventListener('click', () => {
        if(!answerInput.hasAttribute('disabled')) {
            answerInput.value += x.innerText;
            answerInput.focus();
        }
    })
}) 

const nextButtonEndOfRound = document.querySelector('[data-nextButtonEndOfRound]');
nextButtonEndOfRound.addEventListener('click', e => {
    if(!rightWrongArr.every(x => x===true)) {
        termIndex = 0;
        rightWrongArr = [];
        showQuestion();
    } else {
        showFinishedScreen();
    }
})

const startOverButton = document.querySelector('[data-startOverButton]');
startOverButton.addEventListener('click', e => {
    location.reload(); //idk how sustainable this is
})

//START THE WRITE MODE!
reset();

//Set up functions
function reset() {
    list.sort(() => {
        return Math.random() - 0.5;
    })
    showQuestion();
    updateTags();
}

function showQuestion() {
    writeCard.classList.remove('hide');
    afterSubmitted.classList.add('hide');
    endOfRoundTable.classList.add('hide');
    finishScreen.classList.add('hide');

    const termDisplay = document.querySelector('[data-termDisplay]');
    termDisplay.innerText = list[termIndex].term;
    answerInput.removeAttribute('disabled');
    answerInput.focus();
    answerInput.value = '';

    updateTags();
}

function showAnswer() {
    writeCard.classList.remove('hide');
    afterSubmitted.classList.remove('hide');
    endOfRoundTable.classList.add('hide');
    finishScreen.classList.add('hide');

    answerInput.setAttribute('disabled','');

    yourAnswerValue.innerText = answerInput.value;
    correctAnswerValue.innerText = list[termIndex].def;
    if(checkAnswer(answerInput.value, list[termIndex].def)) {
        yourAnswerValue.classList.remove('wrong-color');
        yourAnswerValue.classList.add('correct-color');
        rightWrongArr.push(true);
    } else {
        yourAnswerValue.classList.add('wrong-color');
        yourAnswerValue.classList.remove('correct-color');
        rightWrongArr.push(false);
    }

    updateTags();
}

function showEndOfRound() {
    writeCard.classList.add('hide');
    afterSubmitted.classList.add('hide');
    endOfRoundTable.classList.remove('hide');
    finishScreen.classList.add('hide');

    updateTags(); //do this earlier cuz stuff gets wiped out below

    //remove everything
    const startingPoint = document.querySelector('[data-startingPoint]');
    const endingPoint = document.querySelector('[data-endingPoint]');
    while(startingPoint.nextElementSibling 
        && startingPoint.nextElementSibling!==endingPoint) {
            startingPoint.nextElementSibling.remove();
        }
    //insert elements
    for(let i=0; i<list.length; i++) {
        const divTerm = document.createElement('div');
        const divDef = document.createElement('div');
        divTerm.innerText = list[i].term;
        divDef.innerText = list[i].def;
        if(rightWrongArr[i]) {
            divTerm.classList.remove('wrong-color');
            divDef.classList.remove('wrong-color');
            divTerm.classList.add('correct-color');
            divDef.classList.add('correct-color');
        } else {
            divTerm.classList.remove('correct-color');
            divDef.classList.remove('correct-color');
            divTerm.classList.add('wrong-color');
            divDef.classList.add('wrong-color');
        }
        endingPoint.before(divTerm, divDef);
    }

    //shrink list
    for(let i=list.length-1; i>=0; i--) {
        if(rightWrongArr[i]) {
            list.splice(i,i+1);
        }
    }
}

function showFinishedScreen () {
    writeCard.classList.add('hide');
    afterSubmitted.classList.add('hide');
    endOfRoundTable.classList.add('hide');
    finishScreen.classList.remove('hide');

    updateTags();
}

function updateTags () {
    const remaining = list.length - rightWrongArr.length;
    const correct = rightWrongArr.filter(x => x===true).length;
    const incorrect = rightWrongArr.filter(x => x===false).length;;
    remainingTag.children[0].innerText = `Remaining ${remaining}`;
    remainingTag.querySelector('span').style.width = `${Math.floor(100*remaining/list.length)}%`;
    incorrectTag.children[0].innerText = `Incorrect ${incorrect}`;
    incorrectTag.querySelector('span').style.width = `${Math.floor(100*incorrect/list.length)}%`;
    correctTag.children[0].innerText = `Correct ${correct}`;
    correctTag.querySelector('span').style.width = `${Math.floor(100*correct/list.length)}%`;
}


//additional functions
function checkAnswer(input, answer) {
    input = input.replaceAll(' ','');
    input = input.replaceAll('\n','');
    input.toUpperCase();
    answer = answer.replaceAll(' ','');
    answer = answer.replaceAll('\n','');
    answer.toUpperCase();
    return input === answer;
}