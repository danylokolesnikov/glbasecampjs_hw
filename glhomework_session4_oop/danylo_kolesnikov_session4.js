'use strict'

function Game(){
	this.status = Game.statuses['idle'];
	this.monsters = [];
};

Game.prototype.beginJourney = function () {
	if (this.status === Game.statuses['idle']) {
		if( this.hero && this.monsters.length > 0){
			this.status = Game.statuses['progress']
			return 'Your journey has started, fight monsters';
		} else {
			throw new Error('Cannot start journey, populate the world with hero and mosters first');
		};
	} else {
		throw new Error('Game is begining');
	}
};

Game.prototype.finishJourney = function() {
	if (this.status === Game.statuses['progress']) {
		if(this.hero.life <= 0) {
			this.status = Game.statuses['finished'];
			return 'The Game is finished. Hero is dead :('
		} else if (this.monsters[0].life <=0 && this.monsters[1].life <=0){
			this.status = Game.statuses['finished'];
			return 'The Game is finished. Monstrs are dead. Congratulations'
		} 
		else {
			return 'Don`t stop. Some monsters are still alive. Kill`em all'
		}
	} else {
		throw new Error('Game is not started');
	};
};

Game.prototype.addHero = function (hero) {
	if (!this.hero){
		if (hero instanceof Hero){
			this.hero = Object.assign({},hero);
			Object.setPrototypeOf(this.hero, Object.getPrototypeOf(hero))
			console.log('Hello, '+this.hero.name);
		} else {
			throw new Error('Only hero instance can be hero');
		};
	} else {
		throw new Error('Only one hero can exist');
	};
};

Game.prototype.addMonster = function(monster) {
	if (this.monsters.length <= Game.maxMonsters-1){

		if (monster instanceof Monster){
			this.monsters.push(Object.assign({},monster));
			Object.setPrototypeOf(this.monsters[this.monsters.length-1], Object.getPrototypeOf(monster))
		} else {
			throw new Error('Only monster Instances can become monsters');
		}
	} else {
		throw new Error('Only 2 monsters can exist');
	}
		
};

Game.prototype.fight = function() {
	if (this.status === Game.statuses['progress']){
		var attackTarget = this.monsters.find( function(element){
			if (element.life !== 0){
				return true;
			};
		});
		while(this.hero.life !== 0 && attackTarget.life !== 0){
			this.hero.attack(attackTarget);
			attackTarget.attack(this.hero);
		};
		if (attackTarget.life === 0 ){
			return 'Hero win';
		} else {
			return 'Hero is dead'
		};
		
	} else {
		throw new Error('Begin your journey to start fighting monsters');
	}
}

// Game data:
Hero.heroClasses = {
		warrior: {
			charClass: "Warrior",
			life: 30,
			damage: 4
		},
		rogue: {
			charClass: "Rogue",
			life: 25,
			damage: 3
		},
		sorcerer: {
			charClass: "Sorcerer",
			life: 20,
			damage: 5
		}
	};

Monster.monsterClasses = {
		zombie: {
			charClass: "Zombie",
			life: 8,
			damage: 4
		},
		skeleton: {
			charClass: "Skeleton",
			life: 10,
			damage: 6
		},
		holem: {
			charClass: "Holem",
			life: 15,
			damage: 6
		}
	};

Game.statuses = {
		idle      : "Idle",
		progress  : "In progress",
		finished  : "Finished"
	};

Game.maxMonsters = 2

// Надкласс - родитель класса героя и монстра. От него наследуются 
// методы getName(),getCharClass(),attack()
function gameChars() {
	
};

gameChars.prototype.getName = function() {
	if (this instanceof Hero){
		return this.name;
	} else {
		return 'I am '+this.charClass+' I don`t have name';
	};
};

gameChars.prototype.getCharClass = function() {
	return this.charClass;
};

gameChars.prototype.attack = function(target) {
	if (this.life !== 0){
		var who = this.name? 'Hero' : 'Monster';
		target.life -= this.damage;
		if (target.life <= 0){
			target.life = 0;
			return who+' attacked, '+target.charClass+' killed';
		} else {
			return  who+' attacked, done '+this.damage+' damage to '+target.charClass;
		};
	};
};

// Конструктор класса Hero
function Hero(name, heroClass){
	if (Hero.heroClasses.hasOwnProperty(heroClass)){
		this.name = name;
		this.charClass = Hero.heroClasses[heroClass].charClass;
		this.life = Hero.heroClasses[heroClass].life;
		this.damage = Hero.heroClasses[heroClass].damage;
	} else {
		throw new Error('Incorrect character class provided')
	};
};
// Наследуем надкласс gameChars
Hero.prototype = Object.create(gameChars.prototype);
Hero.prototype.constructor = Hero;

// Конструктор класса Monster
function Monster(monsterClass){
	if (Monster.monsterClasses.hasOwnProperty(monsterClass)){
		this.charClass = Monster.monsterClasses[monsterClass].charClass;
		this.life = Monster.monsterClasses[monsterClass].life;
		this.damage = Monster.monsterClasses[monsterClass].damage;
	} else {
		throw new Error('Incorrect character class provided');
	};
};
// Наследуем надкласс gameChars
Monster.prototype = Object.create(gameChars.prototype);
Monster.prototype.constructor = Monster;


// var game = new Game();
// var warrior = new Hero("test-hero-warrior", "warrior");
// var	zombie = new Monster("zombie");
// var skeleton = new Monster("skeleton");

// console.log(game.status)
// console.log(game.hero)
// console.log(game.monsters.length)

// game.beginJourney()

// game.addHero(warrior);
// game.addMonster(skeleton);
// game.addMonster(zombie);

// console.log(game.beginJourney());
// console.log(game.status)
// console.log(game.fight())