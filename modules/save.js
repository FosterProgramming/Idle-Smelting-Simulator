import newGame from './newGame.js'
import {refreshLayer, unlockLayer} from './game/layers.js'
import {loadOres} from './ui/ores.js'
import {loadShop} from "./ui/shop.js"

export function loadLocalStorage() {
	if (window.localStorage.getItem("game")) {
		window.Game = JSON.parse(window.localStorage.getItem("game"))
	} else {
    	window.Game = newGame;
    	unlockLayer(1)
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
	window.localStorage.setItem("game", JSON.stringify(window.Game))
}

export function resetSave() {
	window.localStorage.removeItem("game")
	location.reload()
}