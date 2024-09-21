import {Ores, Layers} from './constants.js'
import {rollNewOre} from "./layers.js"
import {getPlayerDamage, respawnOreTime} from "./player_stats.js"
import {pushUniqueEventToQueue} from "../ui/queue.js"

export function damageOre(ore_id, damage) {
	if (damage == -1) {
		damage = getPlayerDamage()
	}
	var ore = Game.active_layer.ores[ore_id]
	ore["damage"] += damage
	if (ore["damage"] >= Ores[ore["type"]]["hp"]) {
		removeOre(ore_id)
	} else if (ore["damage"] >= Ores[ore["type"]]["hp"] / 2) {
		pushUniqueEventToQueue(["UPDATE_ORE_IMAGE", ore_id])
	}
}

function removeOre(ore_id) {
	Game.inventory.ores[Game.active_layer["ores"][ore_id]["type"]] += 1
	Game.active_layer.available_ores.push(ore_id)
	Game.stats.ores_mined += 1
	delete Game.active_layer.ores[ore_id]
	pushUniqueEventToQueue(["REMOVE_ORE", ore_id])
}

export function spawnOre() {
	var ore = rollNewOre(Game.active_layer.index)
	var ore_id = Game.active_layer.available_ores.shift()
	Game.active_layer.ores[ore_id] = {"type": ore, "damage": 0}
}

