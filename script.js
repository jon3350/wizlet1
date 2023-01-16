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
        'La naissance d\'un bébé	The birth of a baby\n' +
        'Des ballons	balloons\n' +
        'Organiser une fête	to organize a party\n' +
        'un baptême	baptism\n' +
        'rendre visite à quelqu\'un	To visite someone\n' +
        'Féliciter les parents	Celebrate the parents\n' +
        'aller à l\'église	to go to church\n' +
        'aller au synagogue	To go to the synagogue\n' +
        'aller à la mosquée	to go to the mosque\n' +
        'Offrir des cadeaux	to give (presents)\n' +
        'un anniversaire	a birthday\n' +
        'décorer la maison	to decorate the house\n' +
        'souffler les bougies	to blow out the candles\n' +
        'gonfler des ballons	to blow up balloons\n' +
        'un permis de conduire	a driver\'s license\n' +
        'Un enterrement/la mort	funeral/burial\n' +
        'acheter les fleurs	to buy flowers\n' +
        'Pleurer la mort d\'une personne	To cry for the death of a person\n' +
        'aller au cimetière	to go to the cemetery\n' +
        'se réunir	to get together/to gather\n' +
        'Un mariage	marriage; wedding\n' +
        'une robe de mariée/ une robe blanche	white dress, wedding dress\n' +
        'Un costume	man\'s suit\n' +
        'un gâteau	cake\n' +
        'Echanger des bagues	Exchange Rings';
    }
})
