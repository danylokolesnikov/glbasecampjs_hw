/**
 * [Model description]
 * Function create new Model
 * 
 * @constructor
 * @param {string} name of creating cell in localStorage
 */
function Model(name) {
	this.dbName = name || 'barley-break';
	this.data = {};
	this.defaultArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
}

/**
 * This function make possible get data from local storage, if data is here
 * or generate unique data for game;
 * 
 * @return {object} whith game array and numbers of step;
 */
Model.prototype.getData = function() {
	// get data from local storage
	var dataJSON = localStorage[this.dbName];

	if (dataJSON) {
		this.data = JSON.parse(dataJSON);
	} else {

		// generate shaked array for game
		var startArray = this.defaultArray.sort( function() {
			return 0.5 - Math.random();
		}).concat(''),
			step = 0;

		this.data = {
			game: startArray,
			step: step
		};
	}

	return this.data;
}

/**
 * This function check have our datas in local storage
 * 
 * @return {bollean} 
 */
Model.prototype.checkLocalStorage = function() {
	return localStorage[this.dbName] ? true : false;
}

/**
 * Fuction save game array to local storage
 */
Model.prototype.saveData = function() {

	var data = this.data || {};

	localStorage[this.dbName] = JSON.stringify(this.data);
}

/**
 * Function delete game data from local storage
 */
Model.prototype.deleteData = function() {
	localStorage.removeItem(this.dbName);
}

/**
 * This function update object data in Model to real State
 * 
 * @param  {object} Object of game progress
 */
Model.prototype.updateModel = function(gameObject) {
	var game = gameObject.game,
		step = gameObject.step;

	this.data = {
		game: game,
		step: step
	};
}


/**
 * [View description]
 * Function create new View
 * 
 * @constructor
 */
function View() {

}

/**
 * This function delete Node whith class battle-field
 */
View.prototype.clearField = function() {
	var battleField = document.querySelector('.battle-field') || null,
		step = document.querySelector('.step') || null

	if (battleField && step) {
		battleField.remove();
		step.remove();
	};
}

/**
 * Function draw battle field whith some data
 * 
 * @param  {object} object whith game data (gameArray and number of steps)
 */
View.prototype.drawField = function(gameObject) {
	console.log(gameObject)
	var fragment = document.createDocumentFragment(),
		container = document.createElement('div'),
		paragraphStep = document.createElement('p'),
		gameArray = gameObject.game,
		step = gameObject.step;

	container.setAttribute('style','font-size: 40px; width: 200px; height: 200px ; border: 5px solid black')
	container.classList.add('battle-field');

	paragraphStep.classList.add('step');
	paragraphStep.textContent = 'Ходы: '+step;

	for (var i = 1; i<=gameArray.length; i++) {
		var cell = document.createElement('div');

		cell.setAttribute('style', 'float:left; width: 46px; height:46px; border: 2px solid black ');
		cell.setAttribute('cell','check');
		cell.classList.add('c'+i);
		cell.textContent = gameArray[i-1];
		
		container.appendChild(cell);
	};

	// Insert div with cells and paragraph into fragment
	fragment.appendChild(container);
	fragment.appendChild(paragraphStep);

	// Istert fragment whith field to document
	document.body.appendChild(fragment);
}

/**
 * This function draw two buttons whith values 'resume' and 'new' game
 */
View.prototype.drawButtons = function() {
	var buttonContainer = document.createElement('div');
		continueGame = document.createElement('button'),
		newGame = document.createElement('button');


	buttonContainer.classList.add('butts');
	buttonContainer.textContent = 'You have saved game!'

	continueGame.classList.add('continueGame');
	continueGame.textContent = 'Resume Game?';

	newGame.classList.add('newGame');
	newGame.textContent = 'Start New Game!';

	
	buttonContainer.appendChild(continueGame);
	buttonContainer.appendChild(newGame);	

	document.body.appendChild(buttonContainer);
}

/**
 * This function delete buttons from document
 */
View.prototype.clearButtons = function() {
	document.querySelector('.butts').remove();
}

/**
 * This function change values into two cells (swap them)
 * 
 * @param  {Node} element to swap whith target
 * @param  {Node} target element whitch was clicked
 */
View.prototype.swapCells = function(neighborCell, targetCell) {
	neighborCell.textContent = targetCell.textContent;
	targetCell.textContent = '';
}


/**
 * [Controller description]
 * Make connection betwen model and view
 * 
 * @constuctor
 * @param {object} model The model instance
 * @param {object} view The view instance
 */
function Controller(model, view) {
	this.model = model;
	this.view = view;
}

/**
 * This function is initialization app
 */
Controller.prototype.init = function() {
	// Save this in closure to use it in nested function
	var self = this;

	self.view.clearField();

	// If local storage have data:
	if (self.model.checkLocalStorage()){
		
		self.view.drawButtons();

		document.querySelector('.butts').addEventListener('click', function(e) {
			
			if (e.target.classList[0] === 'newGame') {
				self.model.deleteData()
			};
			
			self.view.clearButtons();
			
			var data = self.model.getData();

			self.view.drawField(data);
			self.model.updateModel(data);

			self.handler();
		})
	} else {
		var data = self.model.getData();

		self.view.drawField(data);
		self.model.updateModel(data);

		self.handler();
	};
	
};

/**
 * This function make hadling click in to cells. this was save in closure for using in nested function
 */
Controller.prototype.handler = function() {
	
	var self = this;

	document.querySelector('.battle-field').addEventListener('click', function(e) {
		
		var el = e.target
	
		// Checking is it clicked on cell and isn't  empty cell 
		if (el.hasAttribute('cell') && el.textContent !== ''){
			var	elNum = parseInt(el.className.substr(1)),

				rightElem = document.getElementsByClassName('c'+(elNum+1))[0],
				leftElem = document.getElementsByClassName('c'+(elNum-1))[0],
				upElem = document.getElementsByClassName('c'+(elNum-4))[0],
				downElem = document.getElementsByClassName('c'+(elNum+4))[0],

				// Considering border, get value of cells around cell what was clicked 
				right = elNum%4 !== 0? rightElem.textContent : null,
				left = (elNum+3)%4 !== 0 ? leftElem.textContent : null,
				up = elNum>4 ? upElem.textContent : null,
				down = elNum<13 ? downElem.textContent : null;
				
			if (right === ''){
				self.swapCells(rightElem, el);

			} else if (left === ''){
				self.swapCells(leftElem, el);

			} else if (up === ''){
				self.swapCells(upElem, el);

			} else if (down === ''){
				self.swapCells(downElem, el);

			};
		};
	});
}

/**
 * Function call method view swapCelss(), to swapping cells in document,
 * call self method progress() to save current game progress,
 * call self method checkResult() to check win
 * 
 * @param  {Node}
 * @param  {Node}
 */
Controller.prototype.swapCells = function(neighborCell, targetCell) {
	this.view.swapCells(neighborCell, targetCell);
	this.progress();
	this.checkResult();
}

/**
 * This function save game progress
 */
Controller.prototype.progress = function() {
	var gameObject = {
		game: [],
		step: 0
	};

	for (var i = 1; i<=16; i++) {
		var cell = document.querySelector('.c'+i).textContent;

		// If cell is pull - push '' in data, becouse parseInt('') -> NaN
		if (cell !== '') {
			gameObject.game.push(parseInt(cell))
		} else {
			gameObject.game.push('')
		};
	};

	// Increase steps
	gameObject.step = this.model.data.step + 1;
	document.querySelector('.step').textContent = 'Ходы: '+ gameObject.step;

	// Update model
	this.model.updateModel(gameObject)
}


/**
 * This function check win
 */
Controller.prototype.checkResult = function() {
	
	for (var i = 1; i<=15; i++) {
		if (this.model.data.game[i-1] !== i) {
			return ;
		}
	};
	
	// If we were here, that game is win. 
	alert('GOOD JOB! YOU DID IT FOR '+ this.model.data.step + ' steps! =)')
	// Clear model
	this.model.deleteData()
	// Start new game
	this.init();
}

/**
 * This function call when user leave page. Function save data in local storage;
 */
Controller.prototype.whenGone = function() {

	this.model.saveData()
}

/**
 * Function is calling when document is load
 */
function app() {
	
	function Pyatnashki () {
		this.model = new Model('barley-break');
		this.view = new View();
		this.controller = new Controller(this.model, this.view);
	}

	// Create new game
	var pyatnashki = new Pyatnashki();

	// Init all processes
	pyatnashki.controller.init();

	// When user leave page - call method whenGone whith binding correct context
	window.onunload = pyatnashki.controller.whenGone.bind(pyatnashki.controller);
}

window.onload = app;
