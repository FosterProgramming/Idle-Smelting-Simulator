import {Layers, Max_Ores, Ores} from "./constants.js"

export function refreshLayer(layer_index) {
	Game.active_layer = {"index": layer_index, "ores": {}, "respawnTime": 0}
	var available_ores = []
	for (var i = 0; i < Max_Ores; i++) {
		available_ores.push("ore_" + i)
		
	}
	Game.active_layer["available_ores"] = available_ores;

}

export function rollNewOre(layer_index) {
	var random = Math.random()
	var check = 0;
	for (const [ore_type, probability] of Object.entries(Layers[layer_index - 1]["ores"])) {
		check += probability
		if (random <= check) {
			return ore_type
		}
	}
	//Loop should always stop before finish
	console.log("Error When rolling for ore")
	return "A"
}

export function offlineLayerMining(layer_index, hits, damage) {
	var result = {}
	for (const [ore_type, probability] of Object.entries(Layers[layer_index - 1]["ores"])) {
		var hits_per_ore = Math.ceil(Ores[ore_type]["hp"] / damage)
		result[ore_type] = Math.floor(probability * hits / hits_per_ore)
	}
	return result
}