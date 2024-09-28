import {formatDuration} from "../ui/format.js"
import {spawnOre, damageOre} from "./ores.js"
import {respawnOreTime, getMinerTime, getMinerDamage} from "./player_stats.js"
import {checkProgress, checkAchievements} from "./player.js"
import {Max_Ores} from './constants.js'
import {offlineLayerMining} from './layers.js'
import {cleanQueue, pushUniqueEventToQueue} from '../ui/queue.js'
import {updateFurnaces} from "./smelters.js"

export function gameLoop() {
	const current_time = Date.now();
	const delta_time = current_time - Game.current_time;
	Game.current_time = current_time;
	if (delta_time > 61234) {
		console.log("delta", delta_time)
		var text = "You have been offline for " + formatDuration(delta_time)
		pushUniqueEventToQueue(["POPUP", text])
	}
	if (delta_time > 0) {
		Game.total_time += delta_time;
		updateGame(delta_time, Game.total_time);
	}
	Game.slow_update += delta_time
	if (Game.slow_update > 5000) {
		slowUpdate()
		Game.slow_update = 0
	}
}

function slowUpdate() {
	checkAchievements()
}

function updateGame(delta_time) {
	updateFurnaces(delta_time)
	if (delta_time > 1000 * 1000) {
		bigUpdate(delta_time)
	} else if (delta_time > 1000) {
		while (delta_time > 1000) {
			basicUpdate(1000)
			delta_time -= 1000
		}
		basicUpdate(delta_time)
	} else {
		basicUpdate(delta_time)
	}
	
}

function bigUpdate(delta_time) {
	if (!checkProgress("miner_robot", 1) && checkProgress("tab-mines")) {
		for (var i = 0; i < Max_Ores - Object.keys(Game.active_layer.ores).length; i++) {
			spawnOre()
		}
		Game.active_layer.respawnTime = respawnOreTime(Game.active_layer.index)
		return
	}
	var minerTime = getMinerTime()
	var minerDamage = getMinerDamage()
	var hits = Math.floor(delta_time / minerTime)
	var result = offlineLayerMining(Game.active_layer.index, hits, minerDamage)

	for (const [ore_type, amount] of Object.entries(result)) {
		Game.inventory.ores[ore_type] += amount
	}
	delta_time -= (hits * delta_time)
	basicUpdate(delta_time)
	return

}
function basicUpdate(delta_time) {
	respawnOre(delta_time)
	if (checkProgress("mine_automation", 1) && Object.keys(Game.active_layer.ores).length > 0) {
		idleMining(delta_time)
	}
}

function idleMining(delta_time) {
	var minerTime = getMinerTime()
	var minerDamage = getMinerDamage()
	Game.miner_timebank += delta_time
	while (Game.miner_timebank > minerTime) {
		Game.miner_timebank -= minerTime
		pushUniqueEventToQueue(["ROBOT_ORE_DAMAGE"])
		damageOre(Object.keys(Game.active_layer.ores)[0], minerDamage)
		//console.log(JSON.stringify(window.Ui_queue, null, 1))
	}
}

function respawnOre(delta_time) {
	if (!checkProgress("layer", 0)) {
		return false
	}
	if (Object.keys(Game.active_layer.ores).length >= Max_Ores) {
		return false
	}
	if (Game.active_layer.respawnTime === 0) {
		spawnOre()
		Game.active_layer.respawnTime = respawnOreTime(Game.active_layer.index)
	} else {
		Game.active_layer.respawnTime = Math.max(0, Game.active_layer.respawnTime - delta_time)
	}
	
}
