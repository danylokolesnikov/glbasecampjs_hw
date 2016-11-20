'use strict'

function extractCharacters(str){
	if (typeof str === 'string'){
		var inputArr  = str.toLowerCase().split(''),
			resultArr = [];

		inputArr.forEach( el => {
			if (resultArr.indexOf(el) === -1){
				resultArr.push(el);
			};
		});
		console.log(resultArr);
	} else (
		console.log('Введите строку')
	);
};



function createLogger(prefix){
	return function a(...inputData) {
		var date = new Date().toISOString();
		var outputLog = (date+' '+prefix+' :');
		console.log.call(console, outputLog, ...inputData)
	};
};


// Вторая вариация выполнения функции. Она выполняется в колл стеке
// с того места, где была вызвана.
// Но есть одна проблемма: время замыкается и остается одно и то же
// при разных вызовах логера.
// Для того чтобы логер не ломал коллстек я,как результат выполнения
// createLoger, в переменную отдаю код мадифицированного логера.
// Таким образом при вызове myLogger() выполняется код дефолтного логера,
// но с передачей в него моих аргументов. И эти аргументы замкнуты и, к сожалению,
// не могут измененяться при разных вызовах логера.

// function createLogger(prefix){
// 	function getDateWithPrefix() {
// 		return new Date().toISOString()+' '+prefix+' :';
// 	};
// 	return console.log.bind(console,getDateWithPrefix());
// };
