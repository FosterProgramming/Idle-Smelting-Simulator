import {formatInteger} from "./format.js"
import {refreshMineOres} from "./ores.js"
import {updatePurchaseClass} from "./shop.js"

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


function cleanQueue() {
	for (var i = 0; i < window.Ui_queue.length; i++) {

		var event = window.Ui_queue.shift()
		if (event[0] == "REMOVE_ORE") {
			document.getElementById(event[1]).remove()
		} else if (event[0] == "REMOVE_ALL_ORES") {
			for (const [key, value] of Object.entries(Game.active_layer.ores)) {
				document.getElementById(key).remove()
			}
		} else if (event[0] == "UPDATE_ORE_IMAGE") {
			var src = document.getElementById(event[1]).src
			src = src.replace('.png', '_damaged.png')
			document.getElementById(event[1]).src = src
		}
	}
}