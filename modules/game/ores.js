import {Ores, Layers} from './constants.js'
import {rollNewOre} from "./layers.js"
import {getPlayerDamage, respawnOreTime, getOreMultiplier} from "./player_stats.js"
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
	var ore_type = Game.active_layer["ores"][ore_id]["type"]
	var multiplier = getOreMultiplier(ore_type, Game.active_layer.index)
	Game.inventory.ores[ore_type] += multiplier
	Game.active_layer.available_ores.push(ore_id)
	mineStats(multiplier, ore_type)
	delete Game.active_layer.ores[ore_id]
	pushUniqueEventToQueue(["REMOVE_ORE", ore_id])
	//console.log(JSON.stringify(window.Ui_queue, null, 1))
}

export function spawnOre() {
	var ore = rollNewOre(Game.active_layer.index)
	var ore_id = Game.active_layer.available_ores.shift()
	Game.active_layer.ores[ore_id] = {"type": ore, "damage": 0}
}

export function unlockOre(ore_type) {
	Game.inventory.ores[ore_type] = 0
	pushUniqueEventToQueue(["ADD_ORE", ore_type])
}

function mineStats(multiplier, ore_type) {
	Game.stats.ores_mined.total += multiplier
	if (ore_type in Game.stats.ores_mined) {
		Game.stats.ores_mined[ore_type] += multiplier
	} else {
		Game.stats.ores_mined[ore_type] = multiplier
	}

}