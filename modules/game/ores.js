import {Ores, Layers} from './constants.js'
import {rollNewOre} from "./layers.js"
import {getPlayerDamage} from "./player.js"

export function sellOre(ore, amount) {
	if (amount == -1) {
		//SELL ALL
		amount = Game.ores[ore]
	}
	Game.money += Ores[ore]["value"] * amount;
	Game.ores[ore] -= amount;
}

export function damageOre(ore_id, damage) {
	if (damage == -1) {
		damage = getPlayerDamage()
	}
	var ore = Game.active_layer.ores[ore_id]
	ore["damage"] += damage
	if (ore["damage"] >= Ores[ore["type"]]["hp"]) {
		replaceOre(ore_id)
	}
}

function replaceOre(ore_id) {
	var ore = rollNewOre(Game.active_layer.index)
	Game.ores[Game.active_layer["ores"][ore_id]["type"]] += 1
	Game.active_layer["ores"][ore_id] = {"type": ore, "damage": 0}
	window.Ui_queue.push(["REMOVE_ORE", ore_id])
}