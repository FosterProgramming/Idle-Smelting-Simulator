import {formatInteger} from "./format.js"
import {refreshMineOres} from "./ores.js"
import {updatePurchaseClass} from "./shop.js"
import {cleanQueue} from "./queue.js"
import {updateFurnaceBar, smelterLoop} from "./furnaces.js"

export function uiLoop() {
	cleanQueue()
	updateInventory()
	var active_tab = document.querySelector(".tab-header.active").id;
	if (active_tab == "tab-mines") {
		mineLoop()
	} else if (active_tab == "tab-shop") {
		shopLoop()
	} else if (active_tab == "tab-smelter") {
		smelterLoop()
	}
	
}

function mineLoop() {
	if (Game.active_layer) {
		refreshMineOres()
	}
}

function shopLoop() {
	updatePurchaseClass()
}

function updateInventory() {
	const inventory = Game.inventory
	document.querySelector(".inventory .money").textContent = formatInteger(inventory.money)
	for (const ore_type of Object.keys(inventory.ores)) {
		var div = document.querySelector(".inventory .ore_" + ore_type)
		div.textContent = formatInteger(inventory.ores[ore_type])
	}
	for (const ore_type of Object.keys(inventory.ingots)) {
		var div = document.querySelector(".inventory .ingot_" + ore_type)
		if (div) {
			div.textContent = formatInteger(inventory.ingots[ore_type])
		}
	}
}

/*
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
*/