var levelView = document.querySelector("#level");
var logView = document.querySelector("#log");
var alertView = document.querySelector("#alert");
var nameView = document.querySelector("#name");
var jobView = document.querySelector("#job");
var raceView = document.querySelector("#race");
var strView = document.querySelector("#str");
var intView = document.querySelector("#int");
var dexView = document.querySelector("#dex");
var hpView = document.querySelector("#hp");
var maxHpView = document.querySelector("#maxHp");
var mpView = document.querySelector("#mp");
var maxMpView = document.querySelector("#maxMp");
var itemsView = document.querySelector("#items");
var gearView = document.querySelector("#gear");
var conditionsView = document.querySelector("#conditions");
var turnCountView = document.querySelector("#turnCount");
var expView = document.querySelector("#exp");
var levelNameView = document.querySelector("#levelName");


/* CONSTANTS */

var RACES = {
	HUMAN: "human"
};

var JOBS = {
	FIGHTER: "fighter",
	WIZARD: "wizard",
	ROGUE: "rogue"
};

var LEVELTYPES = {
	DUNGEON: "dungeon",
	BRANCH: "branch"
};

var TILETYPES = {
	ROCKWALL: "rockwall",
	PERMAWALL: "permawall",
	GROUND: "ground",
	STAIRS: "stairs"
};

var ALIGNMENTS = {
	ALLY: "ally",
	FOE: "foe",
	NEUTRAL: "neutral"
};

var DIR = {
	U: 	[ 0, -1],
	D: 	[ 0,  1],
	R: 	[ 1,  0],
	L: 	[-1,  0],
	UR: [ 1, -1],
	DR: [ 1,  1],
	UL: [-1, -1],
	DL: [-1,  1],
	H: 	[ 0,  0]
};

var INPUTMODE = {
	DEFAULT: "default",
	EXAMINING: "examining",
	POPUP: "popup"
};

var CMDTYPE = {
	MOVE: "move",
	WAIT: "wait",
	HIT: "hit"
};

/* END CONSTANTS */

// *** REMINDER, THESE ARE EQUIVALENT ***
// var foo1 = Object.assign(new Foo, { a: 1 });
// var foo2 = new Foo(1);

/* OBJECTS */
function Player(race, job, name, str, int, dex, hp, maxHp, mp, maxMp, items, gear, conditions, exp, tile, sprite, nameView, raceView, jobView, strView, intView, dexView, hpView, maxHpView, mpView, maxMpView, itemsView) {
	this.nameView = nameView;
	this.raceView = raceView;
	this.jobView = jobView;
	this.strView = strView;
	this.intView = intView;
	this.dexView = dexView;
	this.hpView = hpView;
	this.maxHpView = maxHpView;
	this.mpView = mpView;
	this.maxMpView = maxMpView;
	this.itemsView = itemsView;
	this.gearView = gearView;
	this.conditionsView = conditionsView;
	this.expView = expView;

	this.setRace = function(race) {
		this.race = race;
		this.raceView.textContent = race;
	}
	this.setJob = function(job) {
		this.job = job;
		this.jobView.textContent = job;
	}
	this.setName = function(name) {
		this.name = name;
		this.nameView.textContent = name;
	}
	this.setStr = function(str) {
		this.str = str;
		this.strView.textContent = str;
	}
	this.setInt = function(int) {
		this.int = int;
		this.intView.textContent = int;
	}
	this.setDex = function(dex) {
		this.dex = dex;
		this.dexView.textContent = dex;
	}
	this.setHp = function(hp) {
		this.hp = hp;
		this.hpView.textContent = hp;
	}
	this.setMaxHp = function(maxHp) {
		this.maxHp = maxHp;
		this.maxHpView.textContent = maxHp;
	}
	this.setMp = function(mp) {
		this.mp = mp;
		this.mpView.textContent = mp;
	}
	this.setMaxMp = function(maxMp) {
		this.maxMp = maxMp;
		this.maxMpView.textContent = maxMp;
	}
	this.setItems = function(items) {
		this.items = items;
		this.itemsView.textContent = items;
	}
	this.setGear = function(gear) {
		this.gear = gear;
		this.gearView.textContent = gear;
	}
	this.setConditions = function(conditions) {
		this.conditions = conditions;
		this.conditionsView.textContent = conditions;
	}
	this.setExp = function(exp) {
		this.exp = exp;
		this.expView.textContent = exp;
	}
	this.setTile = function(tile) {
		this.tile = tile;
		tile.setActor(this);
	}
	this.setSprite = function(sprite) {
		this.sprite = sprite;
		this.tile.updateView();
	}

	this.setRace(race);
	this.setJob(job);
	this.setName(name);
	this.setStr(str);
	this.setInt(int);
	this.setDex(dex);
	this.setHp(hp);
	this.setMaxHp(maxHp);
	this.setMp(mp);
	this.setMaxMp(maxMp);
	this.setItems(items);
	this.setGear(gear);
	this.setConditions(conditions);
	this.setTile(tile);
	this.setSprite(sprite);
	this.setExp(exp);


	this.wait = function() {
		game.log.addEntry("You wait.");
	}
	this.move = function(dest) {
		this.tile.setActor(null);
		this.setTile(dest);
	}
	this.hit = function(actor) {
		actor.setHp(actor.hp - this.str);
		game.log.addEntry("You hit " + actor.name + " for " + this.str + " damage!");
	}
}

function Npc(race, job, name, str, int, dex, hp, maxHp, mp, maxMp, items, gear, conditions, tile, sprite, alignment) {
	this.setRace = function(race) {
		this.race = race;
	}
	this.setJob = function(job) {
		this.job = job;
	}
	this.setName = function(name) {
		this.name = name;
	}
	this.setStr = function(str) {
		this.str = str;
	}
	this.setInt = function(int) {
		this.int = int;
	}
	this.setDex = function(dex) {
		this.dex = dex;
	}
	this.setHp = function(hp) {
		this.hp = hp;
	}
	this.setMaxHp = function(maxHp) {
		this.maxHp = maxHp;
	}
	this.setMp = function(mp) {
		this.mp = mp;
	}
	this.setMaxMp = function(maxMp) {
		this.maxMp = maxMp;
	}
	this.setItems = function(items) {
		this.items = items;
	}
	this.setGear = function(gear) {
		this.gear = gear;
	}
	this.setConditions = function(conditions) {
		this.conditions = conditions;
	}
	this.setTile = function(tile) {
		this.tile = tile;
		tile.setActor(this);
	}
	this.setSprite = function(sprite) {
		this.sprite = sprite;
		this.tile.updateView();
	}
	this.setAlignment = function(alignment) {
		this.alignment = alignment;
		switch(alignment) {
			case ALIGNMENTS.ALLY:
				this.setSprite(":)");
				break;
			case ALIGNMENTS.FOE:
				this.setSprite(":(");
				break;
			case ALIGNMENTS.NEUTRAL:
				this.setSprite(":|");
				break;
		}
	}

	this.setRace(race);
	this.setJob(job);
	this.setName(name);
	this.setStr(str);
	this.setInt(int);
	this.setDex(dex);
	this.setHp(hp);
	this.setMaxHp(maxHp);
	this.setMp(mp);
	this.setMaxMp(maxMp);
	this.setItems(items);
	this.setGear(gear);
	this.setConditions(conditions);
	this.setTile(tile);
	this.setSprite(sprite);
	this.setAlignment(alignment);

	this.tile.updateView();

	this.hit = function(actor) {
		actor.setHp(actor.hp - this.str);
		game.log.addEntry(this.name + " hits you for " + this.str + " damage!");
	}

	this.turn = function() {
		this.hit(game.you);
	}
}

function Tile(type, actor, items, events, noise, opacity, position, view) {
	this.view = view;

	this.updateView = function() {
		if (this.actor) {
			this.view.textContent = this.actor.sprite;
		} else {
			this.view.textContent = "";
		}
	}

	this.setType = function(type) {
		this.type = type;
		this.updateView();
	}
	this.setActor = function(actor) {
		this.actor = actor;
		this.updateView();
	}
	this.setItems = function(items) {
		this.items = items;
		this.updateView();
	}
	this.setEvents = function(events) {
		this.events = events;
		this.updateView();
	}
	this.setNoise = function(noise) {
		this.noise = noise;
		this.updateView();
	}
	this.setOpacity = function(opacity) {
		this.opacity = opacity;
		this.updateView();
	}
	this.setPosition = function(position) {
		this.position = position;
		this.updateView();
	}

	this.setType(type);
	this.setActor(actor);
	this.setItems(items);
	this.setEvents(events);
	this.setNoise(noise);
	this.setOpacity(opacity);
	this.setPosition(position);

	this.updateView();
}

function Level(name, type, mapData, levelView, nameView) {
	this.name = name;
	this.type = type;
	this.levelView = levelView;
	this.nameView = nameView;

	this.updateView = function() {
		this.nameView.textContent = this.name;
	}

	this.actors = [];
	this.tiles = [];
	this.staircases = [];

	//parse mapdata
	for (var i = 0; i < mapData.length; i++) {
		var row = [];
		var tr = document.createElement("tr");
		for (var j = 0; j < mapData[i].length; j++) {
			var td = document.createElement("td");
			td.classList.add("tile");
			var tileType = mapData[i][j];
			td.classList.add(tileType);
								//type,          actor items, events, noise, opacity, position,         view
			row.push(new Tile(tileType, null,   [],    [],     0,       0,    { x: j, y: i } , td));
			tr.appendChild(td);
		}
		this.tiles.push(row);
		levelView.appendChild(tr);
	}

	this.setName = function(name) {
		this.name = name;
		this.updateView();
	}

	this.updateView();
}

function Log(txt, view) {
	this.txt = txt;
	this.view = view;

	this.addEntry = function(str) {
		this.txt += str + "\n";
		var li = document.createElement("li");
		this.view.appendChild(li);
		li.innerHTML = str;
		li.scrollIntoView();
	}
}

function Game(you, level, log, turnCount, turnCountView) {
	this.you = you;
	this.level = level;
	this.log = log;
	this.turnCountView = turnCountView;

	this.updateView = function() {
		this.turnCountView.textContent = turnCount;
	}

	this.setLevel = function(level) {
		this.level = level;
		level.updateView();
	}
	this.setTurnCount = function(count) {
		this.turnCount = count;
		this.updateView();
	}

	this.setTurnCount(turnCount);

	this.updateView();

	this.turn = function () {
		this.level.tiles.forEach(function(row){
			row.forEach(function(tile){
				if (tile.actor && tile.actor !== game.you) {
					tile.actor.turn();
				}        
			});
		});
		this.setTurnCount(this.turnCount + 1);
	}
}
/* END OBJECTS */


/* GAME INIT */
// TODO REFACTOR GAME INIT TO LOAD FROM FILE

var data = {
	"name": "testLevel", 
	"type": "dungeon", 
	"width": 10, 
	"height": 10,
	"mapData": [
		["permawall","permawall","permawall","permawall","permawall","permawall","permawall","permawall","permawall","permawall"],
		["permawall","ground","ground","ground","ground","ground","ground","ground","ground","permawall"],
		["permawall","ground","ground","ground","ground","ground","ground","ground","ground","permawall"],
		["permawall","ground","ground","ground","ground","ground","ground","ground","ground","permawall"],
		["permawall","ground","ground","ground","ground","ground","ground","ground","ground","permawall"],
		["permawall","ground","ground","ground","ground","ground","ground","ground","ground","permawall"],
		["permawall","ground","ground","ground","ground","ground","ground","ground","ground","permawall"],
		["permawall","ground","ground","ground","ground","ground","ground","ground","ground","permawall"],
		["permawall","ground","ground","ground","ground","ground","ground","ground","ground","permawall"],
		["permawall","permawall","permawall","permawall","permawall","permawall","permawall","permawall","permawall","permawall"],
	]
}; //temp map data

//                         name    levelType        width height  data   levelView       nameView
var level = new Level(data["name"], data["type"], data["mapData"],  levelView, levelNameView);

var you = new Player(RACES.HUMAN, JOBS.FIGHTER, "Raza", 5,  5,  5, 10, 10,   1,   1,   [],   {},      [],      0, level.tiles[1][1], "@", nameView, raceView, jobView, strView, intView, dexView, hpView, maxHpView, mpView, maxMpView, itemsView, gearView, conditionsView, expView);
var log = new Log("First entry\n", logView);

//					you, level,log, turnCount, turnCountView)
var game = new Game(you, null, log, 0, turnCountView);
game.setLevel(level);

var npc = new Npc(RACES.HUMAN, JOBS.FIGHTER, "Joe", 5,  5,  5, 10, 10,   1,   1,   [],   {},      [], level.tiles[8][8], ":(", ALIGNMENTS.FOE);

// /****** GAME LOGIC ******/

//1. parse input
//2. if bad command, log, goto step 1
//3. determine if requested action is valid
//4. if invalid, log, goto step 1
//5. if valid, perform action
//6. apply state based effects
//7. let all other actors act
//8. apply state based effects

function actorCanMoveThere(actor, destTile) {
	//once we fly then actor matters
	if (destTile.type === TILETYPES.ROCKWALL || destTile.type === TILETYPES.PERMAWALL) {
		return false;
	} else {
		return true;
	}
}

function gameAlert(msg) {
	alertView.textContent = msg;
	alertView.style.animationName = 'none';
	alertView.offsetHeight; /* trigger reflow */
	alertView.style.animationName = null; 
}

function preprocessCmd(cmd) {
	switch(cmd.type) {
		case CMDTYPE.MOVE:
			var destTile = game.level.tiles[cmd.actor.tile.position.y + cmd.dir[1]][cmd.actor.tile.position.x + cmd.dir[0]];
			if (destTile.actor) {
				cmd.type = CMDTYPE.HIT;
				cmd.target = destTile.actor;
			} else if (actorCanMoveThere(cmd.actor, destTile)) {
				cmd.target = destTile;
			} else {
				cmd.type = null;
				gameAlert("You can't do that");
			}
			break;
	}
}

var inputMode = INPUTMODE.DEFAULT;

/* KEYBOARD LISTENENER */
document.addEventListener('keydown', function(event) {
	var cmd = { type: null, actor: game.you };
	alertView.textContent = "";
	switch(inputMode) {
		case INPUTMODE.DEFAULT:
			switch(event.key) {
				case "h":
					cmd.type = CMDTYPE.MOVE;
					cmd.dir = DIR.L;
					break;		
				case "j":
					cmd.type = CMDTYPE.MOVE;
					cmd.dir = DIR.D;
					break;		
				case "k":
					cmd.type = CMDTYPE.MOVE;
					cmd.dir = DIR.U;
					break;		
				case "l":
					cmd.type = CMDTYPE.MOVE;
					cmd.dir = DIR.R;
					break;		
				case "y":
					cmd.type = CMDTYPE.MOVE;
					cmd.dir = DIR.UL;
					break;		
				case "u":
					cmd.type = CMDTYPE.MOVE;
					cmd.dir = DIR.UR;
					break;		
				case "b":
					cmd.type = CMDTYPE.MOVE;
					cmd.dir = DIR.DL;
					break;		
				case "n":
					cmd.type = CMDTYPE.MOVE;
					cmd.dir = DIR.DR;
					break;
				case "s":
					cmd.type = CMDTYPE.WAIT;
					break;
				case "x":
					inputMode = INPUTMODE.EXAMINING;
					break;
				default:
					gameAlert("Invalid input");
			}
			break;
		case INPUTMODE.EXAMINING:
			switch(event.key) {
				case "Escape":
					inputMode = INPUTMODE.DEFAULT;
					break;
				case "Enter":
					inputMode = INPUTMODE.POPUP;
					//get current tile and examine
					break;
			}
			break;
		case INPUTMODE.POPUP:
			inputMode = INPUTMODE.DEFAULT;
			break;
	}

	preprocessCmd(cmd);

	switch(cmd.type) {
		case CMDTYPE.MOVE:
			game.you.move(cmd.target);
			break;
		case CMDTYPE.WAIT:
			game.you.wait();
			break;
		case CMDTYPE.HIT:
			game.you.hit(cmd.target);
			break;
		case null:
			return;
	}
	game.turn();
});