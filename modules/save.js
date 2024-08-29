import newGame from './newGame.js'
import {refreshLayer} from './game/layers.js'
import {loadOres} from './ui/ores.js'
import {loadShop} from "./ui/shop.js"

export function loadLocalStorage() {
	if (false) {//window.localStorage.getItem("game")) {
	//	Game = require('./newGame.json');
	//} else {
		window.Game = window.localStorage.getItem("game")
	} else {
    	window.Game = newGame;
    	refreshLayer(1)
    	window.Game.last_moment = Date.now();
  	}
  	loadOres()
  	loadShop()
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