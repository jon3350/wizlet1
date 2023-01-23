//Mega Set extract info
const allSets = [];
if(localStorage.getItem('allSets')) {
    const data = JSON.parse(localStorage.getItem('allSets'));
    data.forEach(x => {
        allSets.push(x);
    })
}

//DOM traversal
const createSetButton = document.querySelector('[data-createSetButton]');
const setContainer = document.querySelector('[data-setContainer]');


//Set up setButtons
createSetButton.addEventListener('click', createSet);
allSets.forEach(x => {
    const button = document.createElement('button');
    button.classList.add('set-button');
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    h1.innerText = x.title;
    h2.innerText = x.termDefArr.length;
    button.append(h1, h2);
    //opens new page when clicked
    button.addEventListener('click', e => {
        localStorage.setItem('allSetsIndex', allSets.indexOf(x));
        window.open('viewSet.html','_self');
    })
    setContainer.append(button);
    
});

//creates a new set and saves it to allSets and storage
function createSet() {
    const title = document.querySelector('[data-titleInput]');
    const terms = document.querySelector('[data-importInput]');

    if(title.value != '' && terms.value != '') {
        console.log(title.value);
        let lines = terms.value.split('\n');
        let termDefArr = [];
        lines.forEach(x => {
            const [a,b] = x.split('\t');
            termDefArr.push({
                term: a,
                def: b
            })
        });

        const newSet = {
            title: title.value,
            termDefArr: termDefArr 
            //[{term:t1,def:d1},{term:t2,def:d2}...]
        }

        allSets.push(newSet);
        localStorage.setItem('allSets',JSON.stringify(allSets));
        location.reload();
    }

}


// https://jsstringconverter.bbody.io/
//Check off add Newlines
//make sure to remove the /n at the end
//hardcode for featured list
const featuredSelect = document.getElementById('featured-select');
const featuredInputButton = document.querySelector('[data-featuredInputButton]');
featuredInputButton.addEventListener('click', e => {
    //defined above but locally
    const textArea = document.querySelector('[data-importInput]');
    if(featuredSelect.value === '0') {
        //do nothing default
    }
    else if(featuredSelect.value === '1') {
        textArea.value = 
        'one	1\n' +
        'two	2\n' +
        'three	3\n' +
        'four	4\n' +
        'five	5';
    } else if(featuredSelect.value === '2') {
        textArea.value = 
        "parce que	because\n" +
        "puisque	since\n" +
        "de peur que	for fear that\n" +
        "pendant que	while\n" +
        "sans que	without\n" +
        "avant que	before\n" +
        "à moins que	unless\n" +
        "pour que	so that\n" +
        "pourvu que	provided that\n" +
        "bien que	although\n" +
        "jusqu'à ce que	until\n" +
        "afin que	so that, in order that\n" +
        "être sûr que	to be sure that\n" +
        "croire que	to believe that\n" +
        "penser que	to think that\n" +
        "être certain que	to be certain that\n" +
        "vouloir que	to want that\n" +
        "préférer que	to prefer that\n" +
        "exiger que	to demand that\n" +
        "souhaiter que	to wish that\n" +
        "espérer que	to hope that\n" +
        "aimer que	like that\n" +
        "désirer que	to desire that";
    }
})
