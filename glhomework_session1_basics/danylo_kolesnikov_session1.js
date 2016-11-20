'use strict'
/*
	Напишите функцию, которая принимает 1 аргумент и возварщает его тип
*/
function getDataType (variable) {
	return typeof(variable);
}


/*
	Напишите функцию, которая принимает 1 аргумент и возвращает:
	'primitive' если тип данных относится к примивным
	'primitive-special' если тип данных специальный
	'object' - если простой обьект
	'object-array' - если массив
	'object-function' - если функция
*/
function getDataTypePseudoName (variable) {
	switch(typeof variable){
		case 'string' : 
			return 'primitive';
		case 'number' :
			return 'primitive';
		case 'boolean':
			return 'primitive';
		case 'undefined':
			return 'primitive-special';
		case 'function':
			return 'object-function';
		case 'object':
			if (variable === null) {
				return 'primitive-special';
			} else if (variable instanceof Array){
				return 'object-array';
			} else if (variable instanceof Object){
				return 'object';
			};
		default: console.log('Неизвестный тип');
	};
}


/*
	Напишите функцию, которая принимает 2 аргумента,
	и возврвщает 1 если их значения и их типы равны,
	0 если равны только значения
	и -1 в другом случае
*/
function compareByType (a, b) {
	return a === b ?  1 :
		a == b && typeof(a) != typeof(b) ? 0 : -1;
}

// Numbers

/*
	Напишите функцию, которая принимает 1 аргумент,
	и в случае если аргумент имеет числовой тип увеличивает его на 1
	и возврвщвет результат,
	в любом другом случае возврвщвет -1
*/
function increase (value) {
	return typeof value === 'number' ? ++value : -1;
}

/*
	Напишите функцию, которая принимает 1 аргумент(число),
	и в случае если аргумент не Infinity или NaN возвращает строку 'safe' иначе 'danger'
*/
function testForSafeNumber (value) {
	if (typeof value === 'number') {
		return !isFinite(value) || isNaN(value) ? 'danger' : 'safe'; 
	} else {
		console.log('Введите число');
	};
}



// Strings

/*
	Напишите функцию, которая принимает 1 аргумент (строку),
	и возвращает массив из елементов строки разделенных по пробелу ' '
*/
function stringToArray (str) {
	return typeof str === 'string' ? str.split(' ') : console.log('Введите строку')
}


/*
	Напишите функцию, которая принимает 1 аргумент (строку),
	и возвращает часть этой строки до первой запятой
*/
function getStringPart(str) {
	if (typeof str === 'string'){
		var indexFinish = str.indexOf(',');
		return str.substring(0,indexFinish);
	} else {
		console.log('Введите строку');
	};
}

/*
	Напишите функцию, которая принимает 2 аргумента (строку и симовл),
	и возвращает порядковый номер симовола в строе если символ встречается в строке 1 раз,
	false в противоположном случае
*/
function isSingleSymbolMatch(str, symbol) {
	var index = new RegExp(symbol, 'g');
	if (typeof str === 'string'){
		if (str.match(index) === null || str.match(index).length>1){
			return false;
		} else if (str.match(index).length === 1) {
			return str.indexOf(symbol);
		};
	};
}

/*
	Напишите функцию, которая принимает 2 аргумента,
	массив в разделитель[опционально],
	и возвращает строку ввиде элементов массива c разделителями если разделитель задан
	или строку разделенную "-" если не задан
*/
function join (array, separator) {
	if (typeof array === 'object' && array instanceof Array){
		return separator ? array.join(separator) : array.join('-');
	} else {
		console.log('Введите массив');
	};
}


/*
	Напишите функцию, которая принимает 2 массива,
	и возвращает один состоящий из элементов перового и второго (последовательно сначала первый потом второй)
*/
function glue (arrA, arrB) {
	if (Array.isArray(arrA) && Array.isArray(arrB)){
		return arrA.concat(arrB);
	} else {
		console.log('Введите массив');
	};
}


/*
	Напишите функцию, которая принимает 1 массив,
	и возвращает другой массив отсортированный от большего к меньшему
*/
function order (arr) {
	if (Array.isArray(arr)){
		return arr.sort().reverse();
	} else {
		console.log('Введите массив');
	};
}


/*
	Напишите функцию, которая принимает 1 массив,
	и возвращает другой без чисел которые меньше 0
*/
function removeNegative (arr) {
	if (Array.isArray(arr)){
		return arr.filter( function (el) {el>0} );
	} else {
		console.log('Введите массив');
	};
}

/*
	Напишите функцию, которая принимает 2 числовых массива,
	и возвращает новый массив, состоящий из элементов первого но без элементов
	которые присутствуют во втром
	[1,2,3], [1, 3] => [2]
*/
function without (arrA, arrB) {
	if (Array.isArray(arrA) && Array.isArray(arrB)){
		
		var result = [];

		arrA.forEach( e => { 
			if (arrB.indexOf(e) === -1) {
				result.push(e);
			}; 
		});

		return result;
	} else {
		console.log('Введите массив');
	};
}