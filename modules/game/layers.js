import {Layers, Max_Ores, Ores} from "./constants.js"
import {pushUniqueEventToQueue} from "../ui/queue.js"
import {activateLayer} from "../ui/mines.js"
import {checkProgress, setProgress} from "./player.js"
import {unlockOre} from "./ores.js"

export function refreshLayer(layer_index) {
	Game.active_layer = {"index": layer_index, "ores": {}, "respawnTime": 0}
	var available_ores = []
	for (var i = 0; i < Max_Ores; i++) {
		available_ores.push("ore_" + i)
		
	}
	Game.active_layer["available_ores"] = available_ores;
	//TODO: move to queue
	pushUniqueEventToQueue(["ACTIVATE_LAYER"])
}

export function unlockLayer(layer_index) {
	for (const ore_type of Object.keys(Layers[layer_index]["ores"])) {
		if (!Game.inventory.ores.hasOwnProperty(ore_type)) {
			unlockOre(ore_type)
		}
	}
	setProgress("layer", layer_index)
	refreshLayer(layer_index)
	pushUniqueEventToQueue(["UNLOCK_LAYER", layer_index])
}

export function tryUnlockingLayer(layer_index) {
	var cost = Layers[layer_index]["cost"]
	if (Game.inventory.money < cost || checkProgress("layer", layer_index)) {
		return false
	}
	Game.inventory.money -= cost
	unlockLayer(layer_index)
	return true
}

export function rollNewOre(layer_index) {
	var random = Math.random()
	var check = 0;
	for (const [ore_type, probability] of Object.entries(Layers[layer_index]["ores"])) {
		check += probability
		if (random <= check) {
			return ore_type
		}
	}
	//Loop should always stop before finish
	console.log("Error When rolling for ore")
	return (Object.keys(Game.inventory.ores)[0])
}

export function offlineLayerMining(layer_index, hits, damage) {
	var result = {}
	for (const [ore_type, probability] of Object.entries(Layers[layer_index]["ores"])) {
		var hits_per_ore = Math.ceil(Ores[ore_type]["hp"] / damage)
		result[ore_type] = Math.floor(probability * hits / hits_per_ore)
	}
	return result
}