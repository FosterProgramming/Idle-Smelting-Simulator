import newGame from './newGame.js'
import {refreshLayer, unlockLayer} from './game/layers.js'
import {loadAllOres} from './ui/ores.js'
import {loadShop} from "./ui/shop.js"
import {loadLayers} from "./ui/mines.js"

export function loadLocalStorage() {
	if (window.localStorage.getItem("game")) {
		window.Game = JSON.parse(window.localStorage.getItem("game"))
		loadAllOres()
	} else {
    	window.Game = newGame;
    	Game.current_time = Date.now();
    	Game.total_time = 0;
    	unlockLayer(0)
  	}
  	loadLayers()
	loadShop()
  	
}

export function exportSave() {
	navigator.clipboard.writeText(btoa(JSON.stringify(window.Game)))
}

export function importSave() {
	var save = prompt("Copy your save file here:")
	window.Game = JSON.parse(atob(save))
}
export function autoSave() {
	window.localStorage.setItem("game", JSON.stringify(window.Game))
}

export function resetSave() {
	window.localStorage.removeItem("game")
	location.reload()
}