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

//stores index from the original list
let remainingList;
let learningList;
let roundList;
let rightWrongArr;
let firstWrittenIndex;
let currQuestion;

setUp();

function setUp() {
    //control buttons
    const xButton = document.querySelector('[data-xButton]');
    xButton.addEventListener('click', () => window.open('viewSet.html', '_self'));
    const awtd = document.querySelector('[data-awtd]');
    awtd.addEventListener('click', () => {
        localStorage.setItem('ansWithTerm', JSON.stringify(!ansWithTerm));
        location.reload(); //idk how stable
    })

    //accent buttons
    const accentButtonParent = document.querySelector('[data-accentButtonParent]');
    const writtenInput = document.querySelector('[data-writtenInput]');
    Array.from(accentButtonParent.children).forEach(x => {
        x.addEventListener('click', () => {
            writtenInput.value += x.innerText;
            writtenInput.focus();
        })
    }) 

    //short cut keys. This will cause a lot of ERRORS
    document.addEventListener('keypress', e => {
        const writtenAnswerButton = document.querySelector('[data-writtenAnswerButton]');
        const mcqChoicesParent = document.querySelector('[data-mcqChoicesParent]');

        if(e.key == 'Enter') {
            writtenAnswerButton.click();
        } else if(e.key == '1') {
            Array.from(mcqChoicesParent.children)[0].click();
        } else if(e.key == '2') {
            Array.from(mcqChoicesParent.children)[1].click();
        } else if(e.key == '3') {
            Array.from(mcqChoicesParent.children)[2].click();
        } else if(e.key == '4') {
            Array.from(mcqChoicesParent.children)[3].click();
        }
    })

    if(list.length < 4) {
        console.log("PROBLEM");
    }
    remainingList = list.map(x => list.indexOf(x));
    remainingList.sort(() => Math.random() - 0.5);
    learningList = [];
    startRound();
}

function startRound() {
    roundList = remainingList.slice(0, Math.min(3,remainingList.length));
    firstWrittenIndex = roundList.length;
    roundList = roundList.concat(learningList.slice(0,Math.min(4,learningList.length)));

    rightWrongArr = [];
    currQuestion = 0;
    loadQuestion();
}

function loadQuestion() {
    const headerHealthBar = document.querySelector('[data-headerHealthBar] span');
    headerHealthBar.style.width = `${Math.floor(100*currQuestion/roundList.length)}%`;

    if(currQuestion >= roundList.length) {
        loadEndOfRound();
    } else if(currQuestion < firstWrittenIndex) {
        loadMCQuestion();
    } else {
        loadWrittenQuestion();
    }

    currQuestion++;
}

function loadMCQuestion() {
    document.querySelector('[data-mcqContainer]').classList.remove('hide');
    document.querySelector('[data-writtenContainer]').classList.add('hide');
    document.querySelector('[data-endOfRoundContainer]').classList.add('hide');


    const mcqTerm = document.querySelector('[data-mcqTerm]');
    const mcqChoicesParent = document.querySelector('[data-mcqChoicesParent]');
    const mcqNextButton = document.querySelector('[data-mcqNextButton]');

    //display the term
    mcqTerm.innerText = list[roundList[currQuestion]].term;

    //generate choices
    const tempIndexSelection = list.map(x => list.indexOf(x)).sort(() => Math.random() - 0.5);
    tempIndexSelection.splice(tempIndexSelection.indexOf(roundList[currQuestion]), 1);

    const tempAnsArr = tempIndexSelection.slice(0, 3);
    tempAnsArr.push(roundList[currQuestion]);
    tempAnsArr.sort(() => Math.random() - 0.5);
    const correctAnswerIndex = tempAnsArr.indexOf(roundList[currQuestion]);

    Array.from(mcqChoicesParent.children).forEach((x,i) => {
        x.innerText = `(${i+1}) ${list[tempAnsArr[i]].def}`;
        x.classList.remove('green', 'red');
        if(i == correctAnswerIndex) { //rigtht answer
            x.addEventListener('click', () => {
                rightMCQClicked(x);
            });
        } else { //wrong answers
            x.addEventListener('click', () => {
                wrongMCQClicked(x);
            });
        }
    });


    function rightMCQClicked(x) {
        x.classList.add('green');
        rightWrongArr.push(true);
        removeMCQEventListeners();
        enableNextButton();
        mcqNextButton.focus();
    }
    
    function wrongMCQClicked(x) {
        x.classList.add('red');
        rightWrongArr.push(false);
        Array.from(mcqChoicesParent.children)[correctAnswerIndex].classList.add('green');
        removeMCQEventListeners();
        enableNextButton();
        mcqNextButton.focus();
    }
    
    function removeMCQEventListeners() {
        Array.from(mcqChoicesParent.children).forEach(x => x.replaceWith(x.cloneNode(true)) );
    }

    function enableNextButton() {
        mcqNextButton.addEventListener('click', () => {
            loadQuestion();
        }, {once: true});
    }
}


function loadWrittenQuestion() {
    document.querySelector('[data-mcqContainer]').classList.add('hide');
    document.querySelector('[data-writtenContainer]').classList.remove('hide');
    document.querySelector('[data-endOfRoundContainer]').classList.add('hide');


    const writtenTerm = document.querySelector('[data-writtenTerm]');
    const writtenInput = document.querySelector('[data-writtenInput]');
    const writtenAnswerButton = document.querySelector('[data-writtenAnswerButton]');
    const yourAnswer = document.querySelector('[data-yourAnswer]');
    const rightAnswer = document.querySelector('[data-rightAnswer]');
    const writtenOverride = document.querySelector('[data-writtenOverride]');
    const writtenNext = document.querySelector('[data-writtenNext]');

    const currCard = list[roundList[currQuestion]];

    //set up
    writtenTerm.innerText = currCard.term;
    writtenInput.value = '';
    rightAnswer.classList.add('green');
    yourAnswer.classList.remove('red','green');
    rightAnswer.classList.remove('green');
    yourAnswer.innerText = '';
    rightAnswer.innerText = '';
    writtenInput.focus();

    //check answer
    writtenAnswerButton.addEventListener('click', () => {
        if(checkAnswer(writtenInput.value, currCard.def)) {
            correct();
        } else {
            incorrect();
        }
    }, {once: true});

    function correct() {
        rightWrongArr.push(true);
        yourAnswer.innerText = writtenInput.value;
        yourAnswer.classList.add('green');
        rightAnswer.innerText = currCard.def;
        rightAnswer.classList.add('green');
        enableNextAndwrittenOverride();
        writtenNext.focus();
    }

    function incorrect() {
        rightWrongArr.push(false);
        yourAnswer.innerText = writtenInput.value;
        yourAnswer.classList.add('red');
        rightAnswer.innerText = currCard.def;
        rightAnswer.classList.add('green');
        enableNextAndwrittenOverride();
        writtenNext.focus();
    }

    function enableNextAndwrittenOverride() {
        writtenNext.addEventListener('click', () => {
            writtenNext.replaceWith(writtenNext.cloneNode(true));
            writtenOverride.replaceWith(writtenOverride.cloneNode(true));
            loadQuestion();
        });
        writtenOverride.addEventListener('click', () => {
            rightWrongArr.push(!rightWrongArr.pop());
            writtenNext.click(); //lazy
        });
    }


    function checkAnswer(input, answer) {
        input = input.replaceAll(' ','');
        input = input.replaceAll('\n','');
        input = input.toUpperCase();
        answer = answer.replaceAll(' ','');
        answer = answer.replaceAll('\n','');
        answer = answer.toUpperCase();
        return input === answer;
    }

}


function loadEndOfRound() {
    document.querySelector('[data-mcqContainer]').classList.add('hide');
    document.querySelector('[data-writtenContainer]').classList.add('hide');
    document.querySelector('[data-endOfRoundContainer]').classList.remove('hide');

    promoteTerms();
    insertCards();

    const endOfRoundHealthBar = document.querySelector('[data-endOfRoundHealthBar] span');
    const endOfRoundContinueButton = document.querySelector('[data-endOfRoundContinueButton]');

    endOfRoundHealthBar.style.width = `${Math.floor(100*
        (learningList.length+2*(list.length-learningList.length-remainingList.length))/(2*list.length))}%`;

    endOfRoundContinueButton.focus();
    endOfRoundContinueButton.addEventListener('click', () => {
        if(remainingList.length==0 && learningList.length==0) {
            alert('100% complete!');
        } else {
            startRound();
        }
    }, {once: true});

    function insertCards() {
        //remove everything
        const startingPoint = document.querySelector('[data-startingPoint]');
        const endingPoint = document.querySelector('[data-endingPoint]');
        while(startingPoint.nextElementSibling 
            && startingPoint.nextElementSibling!==endingPoint) {
                startingPoint.nextElementSibling.remove();
        }
        //insert elements
        roundList.forEach((x,i) => {
            const divTerm = document.createElement('div');
            const divDef = document.createElement('div');
            divTerm.innerText = list[x].term;
            divDef.innerText = list[x].def;
            if(rightWrongArr[i]) {
                divTerm.classList.remove('red');
                divDef.classList.remove('red');
                divTerm.classList.add('green');
                divDef.classList.add('green');
            } else {
                divTerm.classList.remove('green');
                divDef.classList.remove('green');
                divTerm.classList.add('red');
                divDef.classList.add('red');
            }
            endingPoint.before(divTerm, divDef);
        })
    }

    function promoteTerms() {
        roundList.forEach((x,i) => {
            if(rightWrongArr[i]) {
                if(remainingList.includes(x)) {
                    remainingList.splice(remainingList.indexOf(x),1);
                    learningList.push(x);
                } else {
                    learningList.splice(learningList.indexOf(x),1);
                }
            }
        })
    }

}