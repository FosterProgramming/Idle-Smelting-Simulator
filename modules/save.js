import newGame from './newGame.js'
import {refreshLayer, unlockLayer} from './game/layers.js'
import {unlockFurnace} from './game/smelters.js'
import {loadInventory} from './ui/inventory.js'
import {loadShop} from "./ui/shop.js"
import {loadLayers} from "./ui/mines.js"
import {loadAllFurnaces} from "./ui/furnaces.js"
import {Ores} from "./game/constants.js"
import {setProgress} from "./game/player.js"
import {unlockAllTabs} from "./ui/tabs.js"

export function loadLocalStorage() {
	if (window.localStorage.getItem("game")) {
		window.Game = JSON.parse(window.localStorage.getItem("game"))
		if (window.Game.version === 0.03) {
			loadInventory()
			loadAllFurnaces()
			unlockAllTabs()
		} else {
			makeNewGame()
		}
		
	} else {
    	makeNewGame()
  	}
  	loadLayers()
	loadShop()
  	
}

function makeNewGame() {
	window.Game = newGame;
	Game.current_time = Date.now();
	Game.total_time = 0;
	unlockLayer(0)
	setProgress("furnace", 1)
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