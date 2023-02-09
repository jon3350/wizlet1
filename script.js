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
        "Pour décrire les cheveux	to describe hair\n" +
        "les cheveux longs	long hair\n" +
        "les cheveux châtains	chestnut hair\n" +
        "les cheveux blonds	blond hair\n" +
        "les cheveux courts	short hair\n" +
        "les cheveux en brosse	crew cut\n" +
        "les cheveux clairs	light hair\n" +
        "les cheveux à mi	longeur-mid length, medium length\n" +
        "une queue de cheval	a pony tail\n" +
        "les cheveux raides	straight hair\n" +
        "les cheveux foncés	deep/dark hair\n" +
        "Il est barbu	He is bearded\n" +
        "Il a une barbe et une moustache	he has a beard and a mustache\n" +
        "Il est chauve	he is bald\n" +
        "J'ai des taches de rousseur	I have freckles\n" +
        "J'ai un grain de beauté	I have a beauty spot/mole\n" +
        "J'ai une cicatrice	I have a scar\n" +
        "Je porte des lentilles de contact	I wear contact lenses\n" +
        "Le poids	the weight\n" +
        "Je suis mince	I am thin\n" +
        "Je suis gros(se)	I am fat\n" +
        "Je suis maigre	thin\n" +
        "Je suis forte et musclée!	I am strong and muscular\n" +
        "Je suis faible	I am weak\n" +
        "Plein	full\n" +
        "Un piercing Fin	thin\n" +
        "Un tatouage	a tatto\n" +
        "Pointu	pointy\n" +
        "Mignon(ne)	cute\n" +
        "Laide/moche	ugly\n" +
        "Les boutons	pimples\n" +
        "Poilu	hairy\n" +
        "Épais(se)	thick\n" +
        "Frais/Fraîche	fresh\n" +
        "proportionnel(le)	proportional\n" +
        "de taille moyenne	medium height\n" +
        "Elle a une natte	she has a braid\n" +
        "Elle a un chignon	She has a bun.\n" +
        "J'ai	I have\n" +
        "le nez long	long nose\n" +
        "le nez pointu	pointed nose\n" +
        "le nez retroussé	snub nose\n" +
        "Je suis costaud	I am strong/well built";
    }
})
