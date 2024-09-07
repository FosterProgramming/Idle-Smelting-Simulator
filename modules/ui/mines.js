import {Layers} from "../game/constants.js"
import {refreshLayer, tryUnlockingLayer} from "../game/layers.js"
import {hasUnlock} from "../game/player.js"
import {pushUniqueEventToQueue} from "./queue.js"

export function loadLayers() {
	for(var i = 0; i < Layers.length; i++) {
		var layer = makeLayer(i)
		document.getElementById("mine_layers").appendChild(layer)
		if (hasUnlock("layer_" + i)) {
			 updateUnlockedSign(i)
		}
	}
	pushUniqueEventToQueue(["ACTIVATE_LAYER"])
}

export function updateUnlockedSign(index) {
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

}
