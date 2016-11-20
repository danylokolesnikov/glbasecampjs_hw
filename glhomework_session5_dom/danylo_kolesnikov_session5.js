// 0
// Function which get string selector and return:
//	- undefined 
//	- node, what was found 
// 	- array of nodes, if it was not alone
//  - if in function put Node, function return type of node.
function checkSelector(selector) {
	if (typeof selector === 'string'){
		var nodeList = document.querySelectorAll(selector);
		switch (nodeList.length) {
			case 0: return undefined;
			case 1: return nodeList[0];
			default : return nodeList;
		}
	} else if(selector instanceof Node){
		switch (selector.nodeType){
			case 1: return 'ELEMENT';
			case 3: return 'TEXT';
			case 8: return 'COMMENT';
			case 7: return 'PROCESSING_INSTRUCTION';
			case 9: return 'DOCUMENT_NODE';
			case 10: return 'DOCUMENT_TYPE';
			case 11: return 'DOCUMENT_FRAGMENT';
		}
	} else{
		console.log('Argument must have Node or string type');
	};
};

// 1
// Function which get string selector and return:
//	- undefined 
//	- node, what was found 
// 	- first node, if it was not alone
function firstNode(selector) {
	if (typeof selector === 'string'){
		var node = document.querySelector(selector);
		return node === null? undefined : node;
	} else {
		console.log('Bad type of argument');
	};
};

// 2
// Function like default function insertBefore, but it put element After specific element
function insertAfter(newElement, referenceElement){
	return referenceElement.parentElement.insertBefore(newElement, referenceElement.nextElementSibling);
};

// 3
function myAttributes(element, attribute, value){
	if (element instanceof Node){
		if (element.hasAttribute(attribute)){
			if (value){
				return element.setAttribute(attribute, value);
			} else {
				return element.getAttribute(attribute);
			};
		} else if(attribute && value){
			return element.setAttribute(attribute, value)
		} else {
			console.log('Set attribute and value');
		};
	} else {
		console.log('Elements isnot instance of NODE')
	};
}
// Also this funcion we can rewrite on prototype of object Node and call it without argument "element",
// but I heard is a good practice, isn't it?
/*
Node.prototype.myAttributes = function (attribute, value){
	if (this.hasAttribute(attribute)){
		if (value){
			return this.setAttribute(attribute, value);
		} else {
			return this.getAttribute(attribute);
		};
	} else if(attribute && value){
		return this.setAttribute(attribute, value)
	} else {
		console.log('Set attribute and value');
	};
};
*/

// 4
// The function takes one parameter - size chess cells
function chess(size){
	// Make sure, that is not little desk and size is positive
	var size = Math.abs(size);
	size = size<10 ? 10 : size;

	var fragment = document.createDocumentFragment(),
		container = document.createElement('div');

	container.setAttribute('style','width:'+8*size+'px; height: '+8*size+'px; border: 5px solid black;');
	container.className('chess')
	for (var i=1, j=1; i<=64; i++){
		
		var checkerboard = document.createElement('div');
		
		// j - is row of desk; If j even - start cells from balck; If j odd - reverse;
		if (j%2 === 0){
			var color = i%2 === 0 ? 'black' : 'white';	
		} else {
			var color = i%2 === 0 ? 'white' : 'black';	
		}
		
		checkerboard.setAttribute('style', 'width:'+size+'px; height: '+size+'px; float:left; background-color:'+color);
		container.appendChild(checkerboard);
		// When row (8 cells) is end - make J from even to odd;
		j = i%8 === 0? ++j : j;
	}
	fragment.appendChild(container);
	// If desk created - delete old desk and draw new;
	document.querySelector('.chess') ? document.querySelector('.chess').remove() : null;
	document.body.appendChild(fragment);
};

// 5
function pyatnashki(){

	// Create start array and shake it
	var arrayNum = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort(function (){
		return 0.5-Math.random()
	}).concat('');

	// Draw field with shaked array
	drawField(arrayNum);
	
	// make couner of steps to 0;
	move.counter=0;

	// Make handling event to cells;
	var field = document.querySelector('.battle-field');
	field.addEventListener('click', move)
};

function drawField(array) {

	var fragment = document.createDocumentFragment(),
		container = document.createElement('div'),
		step = document.createElement('p');

	container.setAttribute('style','width: 200px; height: 200px ; border: 5px solid black')
	container.className = 'battle-field';

	step.setAttribute('style', 'color : blue; font-size:20px');
	step.className = 'counter';
	step.innerHTML = 'Ходов: 0';

	// Create one Node of cell and in loop clone this Node
	var cell = document.createElement('div');
		cell.setAttribute('style', 'background-color:#f7ef90 ;font-size: 40px;float:left; width: 46px; height:46px; border: 2px solid black ');
		cell.setAttribute('cell','check');

	for (var i = 1; i<=16; i++){
		cell = cell.cloneNode(true);
		cell.className = i;
		cell.innerHTML = array[i-1];
		container.appendChild(cell);
	};

	// Insert div with cells and paragraph into fragment
	fragment.appendChild(container);
	fragment.appendChild(step);

	document.body.appendChild(fragment);
};


function move(e){

	var el = e.target

	// Checking is it clicked on cell and isn't  empty cell 
	if (el.hasAttribute('cell') && el.innerHTML !== ''){
		var	elNum = parseInt(el.className),

			rightElem = document.getElementsByClassName(elNum+1)[0],
			leftElem = document.getElementsByClassName(elNum-1)[0],
			upElem = document.getElementsByClassName(elNum-4)[0],
			downElem = document.getElementsByClassName(elNum+4)[0],

			// Considering border, get value of cells around cell what was clicked 
			right = elNum%4 !== 0? rightElem.innerHTML : null,
			left = (elNum+3)%4 !== 0 ? leftElem.innerHTML : null,
			up = elNum>4 ? upElem.innerHTML : null,
			down = elNum<13 ? downElem.innerHTML : null;
			
		if (right === ''){
			rightElem.innerHTML = el.innerHTML;
			el.innerHTML = '';
			move.counter++;
		} else if (left === ''){
			leftElem.innerHTML = el.innerHTML;
			el.innerHTML = '';
			move.counter++;
		} else if (up === ''){
			upElem.innerHTML = el.innerHTML;
			el.innerHTML = '';
			move.counter++;
		} else if (down === ''){
			downElem.innerHTML = el.innerHTML;
			el.innerHTML = '';
			move.counter++;
		};
		document.getElementsByClassName('counter')[0].innerHTML = 'Ходов: '+move.counter;
		checkResult();
	};
};

function checkResult() {
	for(var i = 1; i<=15; i++){
		if (document.getElementsByClassName(i)[0].innerHTML != i){
			return
		};
	};
	alert('YOU DID IT! GOOD JOB:)')
};



function intresting(){
	var el = firstNode('#line-0');
	var string = '';
	while(el !== null){
		var arrEl = el.children;
		for (var i=0; i<arrEl.length; i++) {
			if (arrEl[i].hasAttribute('base64')){
				string += arrEl[i].getAttribute('base64');
			};
		};
		el = el.nextElementSibling;
	};
	console.log(window.atob(string));
}

intresting2.comment = ''
// this function must be called whith first element of document. In general : intresting2(document.querySelector('pre'))
function intresting2(el){
	while (el !== null){
		if (el.firstChild){
			intresting2(el.firstChild)
		};
		if (el.nodeType === 8){
			intresting2.comment +=el.nodeValue;
		};
		el = el.nextSibling;
	};
};



// Function(intresting2.comment)() work similar next function: 
function final(string){
	var message = '          LLLLLL\n          LLLLLL\n   GGGGGGGGGGGGL\n  GGGGGGGGGGGGGG\n GGGGGGGGGGGGGGGG \nGGGGGGG   LLLLGGG          \u2192\nGGGGGGG   LLLLLL           \u2192\u2192    Congrats!\nGGGGGG    LLLLLL           \u2192\u2192\u2192   More fun with command line\nGGGGGG    LLGGGG           \u2192\u2192    http://uni.xkcd.com/\nGGGGGGG   LGGGGGG          \u2192\nGGGGGGG   LLLLGGG\n GGGGGGGGGGGGGGGG\n  GGGGGGGGGGGGGG\n   GGGGGGGGGGGGL        LLL\n          LLLLLLLLLLLLLLLLL\n          LLLLLLLLLLLLLLLLL\n'.split(''),
	    i = message.length,
	    output = [],  
	    colors = [];
	message.reverse();
	while (i--) {    
		output.push('%c' + message[i]);
		if (message[i] === 'G') {        
			colors.push('color: RoyalBlue');    
		} else if (message[i] === '\u2192') {        
			colors.push('color: SeaGreen');
		} else if (message[i] === 'L') {        
			colors.push('color: FireBrick');    
		} else {        
			colors.push('');    
		}
	}
	console.log.apply(console, [output.join('')].concat(colors));
}
