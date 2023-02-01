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


const mainContainer = document.querySelector('[data-mainContainer]');
const optionsContainer = document.querySelector('[data-optionContainer]');
const optionsBtn = document.querySelector('[data-optionsBtn]');

startUp();
function startUp() {
    showOptions();
}


function showOptions() {
    //visual set up
    mainContainer.classList.add('hide');
    optionsContainer.classList.remove('hide');

    //default behavior
    const checkboxMatch = document.getElementById('checkboxMatch');
    const checkboxMulti = document.getElementById('checkboxMulti');
    const checkboxWritten = document.getElementById('checkboxWritten');
    const numOfQuesInput = document.getElementById('numOfQuesInput');
    checkboxMatch.checked = true;
    checkboxMulti.checked = true;
    checkboxWritten.checked = true;
    numOfQuesInput.setAttribute("max", list.length);
    numOfQuesInput.value = list.length;

    //when the create button is clicked
    const newTestButton = document.querySelector('[data-newTestButton]');
    newTestButton.addEventListener('click', () => {
        if(checkboxMatch.checked || checkboxMulti.checked || checkboxWritten.checked) {
            createNewTest(numOfQuesInput.value, checkboxMatch.checked, checkboxMulti.checked, checkboxWritten.checked, ansWithTerm.value=='Term');
        }
    });
}


//params: number of questions, are there matching, multiple choice, and written questions, are we answering with term
function createNewTest(numOfQues, match, multi, written, answerWithTerm) {
    mainContainer.classList.remove('hide');
    optionsContainer.classList.add('hide');

    //delete nodes
    const matchContainer = document.querySelector('[data-matchContainer]');
    const multiContainer = document.querySelector('[data-multiContainer]');
    const writtenContainer = document.querySelector('[data-writtenContainer]');
    deleteAllChildren(matchContainer);
    deleteAllChildren(multiContainer);
    deleteAllChildren(writtenContainer);

    //scramble list
    list.sort(() => {
        return Math.random() - 0.5;
    })

    let matchEnd, multiEnd, writtenEnd;
    defineEndingBounds();

    //add nodes
    for(let i=0; i<matchEnd; i++) {
        const template = document.querySelector('[data-matchTemplate]');
        const copyHtml = document.importNode(template.content, true);
        copyHtml.querySelector('span').innerText = i+1;
        copyHtml.querySelector('.match-term').innerText = list[i].term;
        copyHtml.querySelector('.match-def').innerText = list[i].def;

        matchContainer.append(copyHtml);
    }
    for(let i=matchEnd; i<multiEnd; i++) {
        const template = document.querySelector('[data-multiTemplate]');
        const copyHtml = document.importNode(template.content, true);
        copyHtml.querySelector('span').innerText = matchEnd+i+1;
        multiContainer.append(copyHtml);
    }
    for(let i=multiEnd; i<writtenEnd; i++) {
        const template = document.querySelector('[data-writtenTemplate]');
        const content = template.content.cloneNode(true);
        writtenContainer.append(content);
    }



    optionsBtn.addEventListener('click', showOptions);

    function defineEndingBounds() {
        if(match && multi && written) {
            matchEnd = Math.floor(numOfQues/3);
            multiEnd = Math.floor(numOfQues*2/3);
        } else if(match && multi) {
            matchEnd = Math.floor(numOfQues/2);
            multiEnd = Math.floor(numOfQues);
        } else if(match && written) {
            matchEnd = Math.floor(numOfQues/2);
            multiEnd = matchEnd;
        } else if(multi && written) {
            matchEnd = 0;
            multiEnd = Math.floor(numOfQues/2);
        } else if(match) {
            matchEnd = numOfQues;
            multiEnd = numOfQues;
        } else if(multi) {
            matchEnd = 0;
            multiEnd = numOfQues;
        } else if(written) {
            matchEnd = 0;
            multiEnd = 0;
        } else {
            console.log("WHY IS IT EMPTY");
        }

        writtenEnd = numOfQues;
    }
}

function deleteAllChildren(parent) {
    let child = parent.lastElementChild;
    while(child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}