import {gameLoop} from './modules/game/loop.js'
import {uiLoop} from './modules/ui/loop.js'
import {removeAllOres} from './modules/ui/ores.js'
import {openTab, addTabNotification} from './modules/ui/tabs.js'
import {loadLocalStorage, exportSave, importSave, resetSave, autoSave} from './modules/save.js'
import {addInputEvents} from './modules/input.js'

window.Ui_queue = []
window.Cache = {}
openTab("tab-smelter")
loadLocalStorage()

addInputEvents()

setInterval(gameLoop, Game.settings.game_tick); 
setInterval(uiLoop, Game.settings.visual_tick);
console.log(Game)
setInterval(autoSave, 5000);

//Ores positions are absolute and get messed up when viewport changes so we need to reset them
window.addEventListener("resize", removeAllOres)

document.querySelector('#import').addEventListener('click', importSave)
document.querySelector('#export').addEventListener('click', exportSave)
document.querySelector('#reset-save').addEventListener('click', resetSave)

document.querySelector('#tab-mines').onclick = function() {
	openTab("tab-mines")
}

document.querySelector('#tab-shop').onclick = function() {
	openTab("tab-shop")
}

document.querySelector('#tab-smelter').onclick = function() {
	openTab("tab-smelter")
}

document.querySelector('#tab-settings').onclick = function() {
	openTab("tab-settings")
}