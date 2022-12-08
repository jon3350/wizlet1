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
//make sure to remove the /n at the end
//hardcode for featured list
const featuredInputBox = document.querySelector('[data-featuredInputBox]');
const featuredInputButton = document.querySelector('[data-featuredInputButton]');
featuredInputButton.addEventListener('click', e => {
    //defined above but locally
    const textArea = document.querySelector('[data-importInput]');
    if(featuredInputBox.value === 'Numbers (5)') {
        textArea.value = 
        'one	1\n' +
        'two	2\n' +
        'three	3\n' +
        'four	4\n' +
        'five	5';
    } else if(featuredInputBox.value === 'French (34)') {
        textArea.value = 
    'Je Lire Passé composé	j\'ai lu\n' +
	'Je Courir Passé composé	j\'ai couru\n' +
	'je (recevoir) passé composé	j\'ai reçu\n' +
	'Je (Etre passe compose)	j\'ai été\n' +
	'Je Vouloir Passé composé	j\'ai voulu\n' +
	'je (devoir passé composé)	j\'ai dû\n' +
	'Je Craindre Passé composé	j\'ai craint\n' +
	'je écrire passe compose	j\'ai écrit\n' +
	'Je Boire Passé composé	j\'ai bu\n' +
	'Je Dire Passé composé	j\'ai dit\n' +
	'Je Mettre Passé composé	j\'ai mis\n' +
	'Je Ouvrir Passé composé	j\'ai ouvert\n' +
	'Je Pouvoir Passé composé	j\'ai pu\n' +
	'Je Croire Passé composé	j\'ai cru\n' +
	'je/suivre (passé composé)	j\'ai suivi\n' +
	'Je Voir Passé composé	j\'ai vu\n' +
	'Je Tenir Passé composé	j\'ai tenu\n' +
	'Je Savoir Passé composé	j\'ai su\n' +
	'Je falloir Passé composé	J\'ai fallu\n' +
	'Je, comprendre, passé composé	j\'ai compris\n' +
	'Je promettre passé composé	J\'ai promis\n' +
	'Je reprendre passé composé	J\'ai repris\n' +
	'Je (peindre) PASSÉ COMPOSÉ	J\'ai peint\n' +
	'Je Envoyer Passé composé	j\'ai envoyé\n' +
	'Regular -er verb Passé composé ending	é\n' +
	'Regular -ir verb Passé composé ending	i\n' +
	'Regular -re verb Passé composé ending	u\n' +
	'Je Vivre	J\'ai vécu\n' +
	'Je valoir	J\'ai valu\n' +
	'Je avoir	J\'ai eu\n' +
	'Je connaître	J\'ai connu\n' +
	'Je taire	J\'ai tu\n' +
	'Je plaire	J\'ai plu\n' +
	'Je pleuvoir	J\'ai plu';
    }
})
