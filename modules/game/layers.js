import {Layers} from "./constants.js"

export function refreshLayer(layer_index) {
	Game.active_layer = {"index": layer_index, "ores": {}}
	for (var i = 0; i < 8; i++) {
		var ore = rollNewOre(layer_index)
		Game.active_layer["ores"]["ore_" + i] = {"type": ore, "damage": 0}
	}
}

export function rollNewOre(layer_index) {
	var random = Math.random()
	var check = 0;
	for (const [key, value] of Object.entries(Layers[layer_index - 1]["ores"])) {
		check += value
		if (random <= check) {
			return key
		}
	}
	//Loop should always stop before finish
	console.log("Error When rolling for ore")
	return "A"
}
