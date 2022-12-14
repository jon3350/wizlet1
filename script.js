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
    if(featuredInputBox.value === 'French Family Vocab (34)') {
        textArea.value = 
        "Proche	close/near in relationship to someone\n" +
        "Compr??hensif	understanding\n" +
        "s'inquieter	to worry\n" +
        "aimer/s'aimer	to like/love/to like or love one another\n" +
        "strict	strict\n" +
        "permettre ?? quelqu'un de faire quelque chose	to allow somebody to do something\n" +
        "faire peur ??	to scare/frighten/to give somebody a scare\n" +
        "faire peur	to be frightened/to be scared\n" +
        "punir	to punish\n" +
        "s'entendre bien/mal avec quelqu'un	to get along/not get\n" +
        "rigoler ensemble	to laugh together\n" +
        "se disputer	to quarrel with each other\n" +
        "emb??ter	to annoy/bother\n" +
        "manquer de	to lack\n" +
        "manquer ?? quelqu'un	to miss someone\n" +
        "mourir	to die\n" +
        "d??c??der	to die\n" +
        "attentionn??	attentive/considerate\n" +
        "se f??cher avec/contre quelqu'un	to quarrel with someone\n" +
        "??largie	extended\n" +
        "g??ter	to spoil\n" +
        "communiquer avec quelqu'un	to talk with someone\n" +
        "s'??nerver	to get angry/worked up\n" +
        "reconnaissant	grateful/appreciative\n" +
        "prendre soin de quelque chose ou quelqu'un	to take care of something/someone\n" +
        "partager	to share\n" +
        "un mariage mixte	a mixed marriage\n" +
        "??voluer	to progress/develop\n" +
        "vivre sans enfants	to live without children\n" +
        "une famille nucl??aire/une famille traditionnelle	a nuclear/traditional family\n" +
        "une famille monoparentale	a single-parent family\n" +
        "une famille homoparentale	a same-sex parent family\n" +
        "une famille recompos??e	a blended family\n" +
        "le m??nage	household";
    }
    else if(featuredInputBox.value === 'Numbers (5)') {
        textArea.value = 
        'one	1\n' +
        'two	2\n' +
        'three	3\n' +
        'four	4\n' +
        'five	5';
    } else if(featuredInputBox.value === 'French (34)') {
        textArea.value = 
    'Je Lire Pass?? compos??	j\'ai lu\n' +
	'Je Courir Pass?? compos??	j\'ai couru\n' +
	'je (recevoir) pass?? compos??	j\'ai re??u\n' +
	'Je (Etre passe compose)	j\'ai ??t??\n' +
	'Je Vouloir Pass?? compos??	j\'ai voulu\n' +
	'je (devoir pass?? compos??)	j\'ai d??\n' +
	'Je Craindre Pass?? compos??	j\'ai craint\n' +
	'je ??crire passe compose	j\'ai ??crit\n' +
	'Je Boire Pass?? compos??	j\'ai bu\n' +
	'Je Dire Pass?? compos??	j\'ai dit\n' +
	'Je Mettre Pass?? compos??	j\'ai mis\n' +
	'Je Ouvrir Pass?? compos??	j\'ai ouvert\n' +
	'Je Pouvoir Pass?? compos??	j\'ai pu\n' +
	'Je Croire Pass?? compos??	j\'ai cru\n' +
	'je/suivre (pass?? compos??)	j\'ai suivi\n' +
	'Je Voir Pass?? compos??	j\'ai vu\n' +
	'Je Tenir Pass?? compos??	j\'ai tenu\n' +
	'Je Savoir Pass?? compos??	j\'ai su\n' +
	'Je falloir Pass?? compos??	J\'ai fallu\n' +
	'Je, comprendre, pass?? compos??	j\'ai compris\n' +
	'Je promettre pass?? compos??	J\'ai promis\n' +
	'Je reprendre pass?? compos??	J\'ai repris\n' +
	'Je (peindre) PASS?? COMPOS??	J\'ai peint\n' +
	'Je Envoyer Pass?? compos??	j\'ai envoy??\n' +
	'Regular -er verb Pass?? compos?? ending	??\n' +
	'Regular -ir verb Pass?? compos?? ending	i\n' +
	'Regular -re verb Pass?? compos?? ending	u\n' +
	'Je Vivre	J\'ai v??cu\n' +
	'Je valoir	J\'ai valu\n' +
	'Je avoir	J\'ai eu\n' +
	'Je conna??tre	J\'ai connu\n' +
	'Je taire	J\'ai tu\n' +
	'Je plaire	J\'ai plu\n' +
	'Je pleuvoir	J\'ai plu';
    }
})
