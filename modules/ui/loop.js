import {formatInteger} from "./format.js"
import {refreshMineOres} from "./ores.js"
import {updatePurchaseClass} from "./shop.js"
import {cleanQueue} from "./queue.js"

export function uiLoop() {
	cleanQueue()
	updateValue(".money", ["money"])
	var active_tab = document.querySelector(".tab-header.active").id;
	if (active_tab == "tab-mines") {
		mineLoop()
	} else if (active_tab == "tab-shop") {
		shopLoop()
	}
	
}

function mineLoop() {
	for (const ore_type of Object.keys(Game.ores)) {
		updateValue(".tab-mines .ore_" + ore_type, ["ores", ore_type])
	}
	refreshMineOres()
}

function shopLoop() {
	for (const ore_type of Object.keys(Game.ores)) {
		updateValue(".tab-shop .ore_" + ore_type, ["ores", ore_type])
	}
	updatePurchaseClass()
}

function updateValue(selector, path) {
	var elements = document.querySelectorAll(selector)
	var value = Game
	for (var i = 0; i < path.length; i++) {
		value = value[path[i]]
	}
	for (var j = 0; j < elements.length; j++)  {
		elements[j].innerHTML = formatInteger(value)
	}
}
