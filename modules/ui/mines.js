import {Layers} from "../game/constants.js"
import {refreshLayer, tryUnlockingLayer} from "../game/layers.js"
import {checkProgress, getProgressLevel} from "../game/player.js"
import {pushUniqueEventToQueue} from "./queue.js"
import {addRobotPicture} from "./ores.js"

export function loadLayers() {
	var max_layer = getProgressLevel("layer")
	for(var i = 0; i < Layers.length; i++) {
		var layer = makeLayer(i)
		document.getElementById("mine_layers").appendChild(layer)
		if (i <= max_layer) {
			 updateUnlockedSign(i)
		}
		if (i <= (max_layer +1)) {
			layer.style.display = "block";
		}
	}
	if (Game.active_layer) {
		activateLayer()
	}
}

export function unlockLayerUI(index) {
	updateUnlockedSign(index)
	var layer_index = "layer_" + (index + 1)
	var layer = document.getElementById(layer_index)
	if (layer) {
		layer.style.display = "block"
	}
	
}

function updateUnlockedSign(index) {
	var sign = document.getElementById("layer_sign_" + index)
	sign.innerHTML = "<div>Activate</div>"
	sign.onclick = function() {
		refreshLayer(index)
		
	}
}
export function makeLayer(index) {
	var div = document.createElement("div")
	div.className = "mine_layer"
	div.id = "layer_" + index
	div.style.display = "none"

	var dark_layer = document.createElement("div")
	dark_layer.className = "dark_layer"
	dark_layer.id = "dark_layer_" + index
	div.appendChild(dark_layer)
	
	var sign = document.createElement("div")
	sign.className = "layer_sign"
	sign.id = "layer_sign_" + index
	var text1 = document.createElement("div")
	text1.textContent = "Unlock Layer " + index
	sign.appendChild(text1)
	var text2 = document.createElement("div")
	text2.textContent = "Cost : " + Layers[index]["cost"]
	sign.appendChild(text2)
	sign.onclick = function() {
		tryUnlockingLayer(index)
		
	}
	dark_layer.appendChild(sign)
	return div
}

export function activateLayer() {
	var layer_index = Game.active_layer.index
	var all_layers = document.getElementsByClassName("dark_layer");
	for (var i = 0; i < all_layers.length; i++) {
		all_layers[i].style.display = "block";
	}	
	document.getElementById("dark_layer_" + layer_index).style.display = "none";
	const ores = document.querySelectorAll(".ore_image")
	for (var i = 0; i < ores.length; i++) {
		ores[i].remove()
	}
	if (checkProgress("mine_automation", 1)) {
		var robot = document.getElementById("robot_miner")
		if (robot) {
			robot.remove()
		}
		addRobotPicture()
	}
	

}
