import {activateLayer, unlockLayerUI} from "./mines.js"
import {loadOre, loadInventoryIngot} from './inventory.js'
import {loadShopIngot} from './shop.js'
import {loadFurnace, updateFurnaceState, updateFurnaceHolding} from './furnaces.js'
import {unlockTab, addTabNotification} from "./tabs.js"
import {addRobotPicture, setRobotPosition} from "./ores.js"
import {startAnimationCycle} from "./animations.js"

export function cleanQueue() {
	var active_tab = document.querySelector(".tab-header.active").id

	for (var i = 0; i < window.Ui_queue.length; i++) {
		var event = window.Ui_queue.shift()
		if (event[0] == "REMOVE_ORE") {
			if (window.WaitOreRemove) {
				pushUniqueEventToQueue(event)
			} else {
				var ore = document.getElementById(event[1])
				if (ore) {
					ore.remove()
				}
				setRobotPosition()
			}
		} else if (event[0] == "REMOVE_ALL_ORES") {
			var ores = document.querySelectorAll(".ore_image")
			for (var i = 0; i < ores.length; i++) {
				ores[i].remove()
			}
		} else if (event[0] == "UPDATE_ORE_IMAGE") {
			var src = document.getElementById(event[1]).src
			src = src.replace('.png', '_damaged.png')
			document.getElementById(event[1]).src = src
		} else if (event[0] == "POPUP") {
			var popup = makePopup(event[1])
			document.body.appendChild(popup)
		} else if (event[0] == "ACTIVATE_LAYER") {
			activateLayer()
		} else if (event[0] == "UNLOCK_LAYER") {
			unlockLayerUI(event[1])
		} else if (event[0] == "ADD_ORE") {
			loadOre(event[1])
		} else if (event[0] == "ADD_FURNACE") {
			loadIngot(event[1])
		} else if (event[0] == "UPDATE_FURNACE") {
			updateFurnaceState(event[1], event[2])
		} else if (event[0] == "MOUSEUP" && active_tab == "tab-smelter") {
			updateFurnaceHolding()
		} else if (event[0] == "UNLOCK_TAB") {
			unlockTab(event[1])
			addTabNotification(event[1])
		} else if (event[0] == "ADD_ROBOT") {
			addRobotPicture()
		} else if (event[0] == "ROBOT_ORE_DAMAGE" && active_tab == "tab-mines") {
			window.WaitOreRemove = true
			var robot = document.getElementById("robot_miner")
			startAnimationCycle(robot.id, [
				{"frame": [1, 0], "time": 100, "callback": () => {return null}},
				{"frame": [0, 0], "time": 100, "callback": () => {window.WaitOreRemove = false;}},
				{"frame": [0, 0], "time": 0, "callback": () => {return null}},
			])
		}
	}
}

function loadIngot(ore_type) {
	loadInventoryIngot(ore_type)
	loadShopIngot(ore_type)
	loadFurnace(ore_type)
}

export function pushUniqueEventToQueue(event) {
	var event_already_exists = false;
	for (var i = 0; i < window.Ui_queue.length; i++) {
		if (JSON.stringify(window.Ui_queue[i]) === JSON.stringify(event)) {
			event_already_exists = true;
		}
	}
	if (!event_already_exists) {
		window.Ui_queue.push(event)
	}
}

function pushToQueue(event) {
	window.Ui_queue.push(event)
}

function makePopup(text) {
	var div = document.createElement("div")
	div.className = "popup"
	var text_div = document.createElement("div")
	text_div.textContent = text
	var close_button = document.createElement("button");
	close_button.textContent = "OK"
	close_button.onclick = function() {
		document.querySelector(".popup").remove()
	}
	div.appendChild(text_div);
	div.appendChild(close_button);
	return div
}