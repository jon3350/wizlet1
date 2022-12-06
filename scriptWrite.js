//Extract Data
const allSetsIndex = localStorage.getItem('allSetsIndex');
const allSets = JSON.parse(localStorage.getItem('allSets'));

if(!allSetsIndex) window.open('index.html','_self');

//Use this set
const set = allSets[allSetsIndex];
const list = set.termDefArr.map(x => {
    return x;
});


//Set up
const writeCard = document.querySelector('[data-writeCard]');
const accentButtonParent = document.querySelector('[data-accentButtonParent]');
const afterSubmitted = document.querySelector('[data-afterSubmitted]');
const endOfRoundTable = document.querySelector('[data-endOfRoundTable]');
let termIndex = 0;
let rightWrongArr = []; //true for right; false for wrong

const answerInput = document.querySelector('[data-answerInput]');
const yourAnswerValue = document.querySelector('[data-yourAnswerValue]');
const correctAnswerValue = document.querySelector('[data-correctAnswerValue]');

const answerButton = document.querySelector('[data-answerButton]');
answerButton.addEventListener('click', e => {
    if(answerInput.value != '') {
        showAnswer();
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
    }

})
const nextButtonShowAns = document.querySelector('[data-nextButtonShowAns]');
nextButtonShowAns.addEventListener('click', e => {
    termIndex++;
    if(termIndex < list.length) {
        showQuestion();
    } else {
        showEndOfRound();
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
})

const overrideButton = document.querySelector('[data-overrideButton]');
overrideButton.addEventListener('click', e => {
    rightWrongArr[termIndex] = !rightWrongArr[termIndex];
    nextButtonShowAns.click();  //idk how sustainable this is
})

const nextButtonEndOfRound = document.querySelector('[data-nextButtonEndOfRound]');
nextButtonEndOfRound.addEventListener('click', e => {
    termIndex = 0;
    rightWrongArr = [];
    showQuestion();
})


showQuestion();
list.sort(() => {
    return Math.random() - 0.5;
})

function showQuestion() {
    const termDisplay = document.querySelector('[data-termDisplay]');
    termDisplay.innerText = list[termIndex].term;
    answerInput.removeAttribute('disabled');
    answerInput.value = '';
    writeCard.classList.remove('hide');
    afterSubmitted.classList.add('hide');
    endOfRoundTable.classList.add('hide');
}

function showAnswer() {
    answerInput.setAttribute('disabled','');
    writeCard.classList.remove('hide');
    afterSubmitted.classList.remove('hide');
    endOfRoundTable.classList.add('hide');
}

function showEndOfRound() {
    writeCard.classList.add('hide');
    afterSubmitted.classList.add('hide');
    endOfRoundTable.classList.remove('hide');
}

function checkAnswer(input, answer) {
    input = input.replaceAll(' ','');
    input = input.replaceAll('\n','');
    input.toUpperCase();
    answer = answer.replaceAll(' ','');
    answer = answer.replaceAll('\n','');
    answer.toUpperCase();
    return input === answer;
}