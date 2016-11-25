// !!!!!!!!!!!!!!!!!!!!!!!!! 

function getPerson(id) {
	
	loader(true);
	
	var url = 'http://swapi.co/api/people/'+id+'/',
		hero = document.getElementsByClassName('hero')[0],
		films = document.getElementsByClassName('films')[0];


	fetch(url)
	.then(response=>{
		if (response.status === 404){
			// IF 404
			Promise.reject()
		} else if (response.status === 200) {
			
			return response.json();
		};
	})
	.then(person => {
		
		// Make promise all to array and in array change urls to fetch request;
		Promise.all( person.films.map(url =>
    		fetch(url)
    		.then(resp => resp.json())
		))
		.then(json => {
			// here we have all response in array and can call function where argument is response
    		printFilms(json);
    		loader(false);
		});

		updateFields(person)
	})
	.catch(error => {
		loader(false);
		alert('Something went wrong :( P.S.: person with 17 id have 404 status')
	});
};


/**
*
*	This function look at @parametr (number) and if it equal to 1 or 88 do not possible
*	tap button next and previous
*/
function checkButtons(id){
	var styleDisabled = 'pointer-events: none; cursor: default',
		styleDefault = 'pointer-events: auto; cursor: auto',
		nextRef = document.getElementsByClassName('next')[0],
		prevRef = document.getElementsByClassName('prev')[0],
		nextIcon = nextRef.children[0];
		prevIcon = prevRef.children[0];
	
	if (id === 1) {
		prevRef.setAttribute('style', styleDisabled);
		prevIcon.src = 'img/prev_disabled.png'
	} else if (id > 1 && id < 88) {
		nextRef.setAttribute('style', styleDefault);
		nextIcon.src = 'img/next.png'
		prevRef.setAttribute('style', styleDefault);
		prevIcon.src = 'img/prev.png'
	} else if (id === 88) {
		nextRef.setAttribute('style', styleDisabled);
		nextIcon.src = 'img/next_disabled.png'
	};
}


/**
*	Loader function;
*	Get one @paramentr (type boolean) true || false and show or hidden animation;
*	I make this function using style display block||none, becouse if use elem.src ='loader.gif' every time we make request to 
*	get same image or gif; 
*	So, animation can start not from her first second, becouse she already created, and just hidden;
*/
function loader(value){
	var loader = document.getElementsByClassName('loader')[0],
		avatar = document.getElementsByClassName('avatar')[0];

	if (value === true) {
		avatar.style.display = 'none';
		loader.style.display = 'block';
	} else if (value === false) {
		avatar.style.display = 'block';
		loader.style.display = 'none';
	};
};


/**
*	This function create all paragraphs and spans what we need, and 
*	prepare our document to view data;
*/
function createFields(){
	var fragment = document.createDocumentFragment(),
		hero = document.getElementsByClassName('hero')[0],
		key;
		
		for (key in createFields.object) {
			if (createFields.object.hasOwnProperty(key)) {
				var paragraph = document.createElement('p'),
					span = document.createElement('span');
				paragraph.innerHTML = createFields.object[key];
				span.classList.add(key);
				paragraph.appendChild(span);
				fragment.appendChild(paragraph);
			};
		};
	hero.appendChild(fragment)
};

/**
*	This static property of function have information about all standart fields: Name, Height etc.
*/
createFields.object = {
	name : 'name: ',
	height: 'height: ',
	mass: 'mass: ',
	hair_color: 'heir color: ',
	skin_color: 'skin color: ',
	eye_color: 'eye color: ',
	birth_year: 'birth year: ',
	gender: 'gender: '
};


/**
*	
* Function get one @paramentr (type object) resposne from fetch request;
* And print result of request;
*/
function updateFields(response) {
	var hero = document.getElementsByClassName('hero')[0],
		key;

	for (key in createFields.object){
		if (createFields.object.hasOwnProperty(key)) {

			var span = document.getElementsByClassName(key)[0];

			span.innerHTML = response[key].toLowerCase();

		};
	};
};

/**
*	
* Function get one @paramentr (type array) resposne from fetch request;
*  get array with results fetch request, sort it and print on document;
*/
function printFilms(response) {

	var films = document.getElementsByClassName('films')[0],
		fragment = document.createDocumentFragment();

		// Clear div where must be films;
		films.innerHTML = '';
		
		// Make sort films array from 1 to 7
		// Give episode id from 
		response.sort(function(a, b){
			
			return a.episode_id - b.episode_id;
		
		})

		//  Loop sort array and print number episodes and title of this episode;
		response.forEach(function(el){
			
			var paragraph = document.createElement('p');
			
			paragraph.innerHTML = 'Episode ' + el.episode_id + ': "'+ el.title.toLowerCase() +'"'
			
			fragment.appendChild(paragraph);
		});

	films.appendChild(fragment)

}

/**
*	Init function call, when document ready;
*	It call function getPerson() with first id = 1;
*	And in this function binding event listeners to buttons;
*/
function main(){
	var id = 1,
		next = document.getElementsByClassName('next')[0],
		prev = document.getElementsByClassName('prev')[0];

	getPerson(id);

	createFields();

	checkButtons(id);

	next.addEventListener('click', function(){
		id++;

		getPerson(id);

		checkButtons(id);
	});

	prev.addEventListener('click', function(){
		id--;

		getPerson(id);

		checkButtons(id);
	});

};


document.addEventListener("DOMContentLoaded", main);