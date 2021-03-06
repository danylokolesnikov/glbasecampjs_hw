'use strict'

////////////////////////// 
// 1st task

function compareObjects(obj1, obj2, prop) {
	if (obj1[prop] > obj2[prop]){
		console.log(obj1.name);
	} else if (obj1[prop] < obj2[prop]) {
		console.log(obj2.name);
	} else {
		console.log(obj1.name+' equals to '+obj2.name)
	};
};

function MyObject (name, number) {
	this.name = name;
	this.number = number; 
};

function getRandomNumber() {
	return Math.floor(Math.random()*100);
};

var o1 = {
		name : 'Object1',
		number : getRandomNumber()
	},
	o2 = new MyObject('Object2', getRandomNumber());

compareObjects(o1,o2,'number');


//////////////////////////
// 2nd task


var songCollection = [
	{
		name : 'Song1',
		played : getRandomNumber()
	},
	{
		name : 'Song2',
		played : getRandomNumber()
	},
	{
		name : 'Song3',
		played : getRandomNumber()
	},
	{
		name : 'Song4',
		played : getRandomNumber()
	},
	{
		name : 'Song5',
		played : getRandomNumber()
	}
];

function favoriteSong(collection) {
	var resultObj = {
		id : 0,
		played : collection[0].played
	};
	for (var id=1; id<collection.length; id++){
		if(collection[id].played > resultObj.played) {
			resultObj.id = id;
			resultObj.played = collection[id].played;
		};
	};
	// return { 
	// 	name: collection[resultObj.id].name,
	// 	id: resultObj.id,
	// 	played: collection[resultObj.id].played
	// }
	console.log(collection[resultObj.id].name+', with id: '+ resultObj.id +' in songCollection. It was played '+collection[resultObj.id].played+' times.');
};

favoriteSong(songCollection);

///////////////////////////////
// 3d task

function Calculator() {
	var sum = [],
		counter = 0;
	this.add = num => {
		counter === 0 ? sum[counter]=num : sum[counter]=sum[counter-1]+num;
		counter += 1;
	};
	this.getCurrentSum = id => {
		if (typeof id === 'number' && id !== 0){
			return sum[id-1];
		} else if (id === undefined) {
			return sum[sum.length-1];
		} else {
			console.log('INPUT NUMBER')
		};
	};
};

var first = new Calculator();
var	second = new Calculator();
first.add(3);
first.add(8);
first.add(11);
second.add(5);
second.add(12);
second.add(17);

console.log(first.getCurrentSum() + second.getCurrentSum());  // 56
console.log(first.getCurrentSum(2) + second.getCurrentSum(2));  // 28
console.log(first.getCurrentSum(3) === first.getCurrentSum());  // true


/////////////////////
// deep copy

/*
Функция выполняет глубокое копирование объектов.
Функция максимально приблежена к функции Object.assign(target, ...sources), она может принимать в аргумент
source сколько угодно объектов, а так же выполняет копирывание массивов.
*/
function deepCopy(target, ...source) {
	// id - порядковый номер введеного source, resultSourse - резулльтирующий массив, в который глубоко копируются объекты.
	var resultSource = [];

	source.forEach( (source, id) => {
		resultSource[id] = {};
		for (var key in source){
			if (source[key] instanceof Object && !(source[key] instanceof Array)){

				// Если свойством является объект - рекурсивно вызываем нашу функцию и результат пишем в свойство.
				resultSource[id][key] = deepCopy({},source[key]);
			} else {

				// Всё остальное нас не интересует.
				resultSource[id][key] = source[key];
			};
		};
	});

	// Возвращаем объект с глубоко прокопированным resultSource
	return Object.assign(target, ...resultSource);
};

var test = {
	w:{
		x:{
			z: {
				y:1
			}
		}
	},
	a:1,
	b:2
};


var test1 = deepCopy({},test);   
console.log(test.w.x.z === test1.w.x.z);  // false 
