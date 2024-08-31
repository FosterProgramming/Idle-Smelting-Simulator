import {formatInteger} from "./format.js"
import {refreshMineOres} from "./ores.js"
import {updatePurchaseClass} from "./shop.js"

export function uiLoop() {
	cleanQueue()
	updateValue(".money", ["money"])
	var active_tab = document.querySelector(".tab-header.active").id;
	var uiList = ["ore_A", "ore_B", "ore_C", "money"]
	if (active_tab == "tab-mines") {
		mineLoop()
	} else if (active_tab == "tab-shop") {
		shopLoop()
	}
	
}

function mineLoop() {
	updateValue(".tab-mines .ore_A", ["ores", "A"])
	updateValue(".tab-mines .ore_B", ["ores", "B"])
	updateValue(".tab-mines .ore_C", ["ores", "C"])
	refreshMineOres()
}

function shopLoop() {
	updateValue(".tab-shop .ore_A", ["ores", "A"])
	updateValue(".tab-shop .ore_B", ["ores", "B"])
	updateValue(".tab-shop .ore_C", ["ores", "C"])
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
		event = window.Ui_queue.shift()
		if (event[0] == "REMOVE_ORE") {
			document.getElementById(event[1]).remove()
		} else if (event[0] == "REMOVE_ALL_ORES") {
			for (const [key, value] of Object.entries(Game.active_layer.ores)) {
				document.getElementById(key).remove()
			}
		}
	}
}