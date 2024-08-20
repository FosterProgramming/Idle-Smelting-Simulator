import newGame from './newGame.js'

export function loadLocalStorage() {
	if (false) {//window.localStorage.getItem("game")) {
	//	Game = require('./newGame.json');
	//} else {
		window.Game = window.localStorage.getItem("game")
	} else {
    	window.Game = newGame;
    	window.Game.last_moment = Date.now();
  	}
  	console.dir(window.Game)
}

export function exportSave() {
	navigator.clipboard.writeText(btoa(JSON.stringify(window.Game)))
}

export function importSave() {
	var save = prompt("Copy your save file here:")
	window.Game = JSON.parse(atob(save))
	window.Game.last_moment = Date.now();
}
export function autoSave() {
	window.localStorage.setItem("game", window.Game)
}