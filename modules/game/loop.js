import {formatDuration} from "../ui/format.js"
import {spawnOre, damageOre} from "./ores.js"
import {respawnOreTime, getMinerTime, getMinerDamage} from "./player.js"
import {Max_Ores} from './constants.js'
import {offlineLayerMining} from './layers.js'

export function gameLoop() {
	const current_time = Date.now();
	if (Game.current_time === null) {
		Game.current_time = current_time;
    	Game.total_time = 0;
    	return;
	}
	const delta_time = current_time - Game.current_time;
	if (delta_time > 0) {
		Game.total_time += delta_time;
		updateGame(delta_time, Game.total_time);
	}
	//console.log(Game.active_layer)
	
	if (delta_time > 60000) {
		alert("You have been offline for " + formatDuration(delta_time))
		// TODO:
		// push alert to ui event insetad
	}
  Game.current_time = current_time;
}

function updateGame(delta_time) {
	if (delta_time > 1000 * 1000) {
		bigUpdate()
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
	if (Game.unlocks.mine_automation === false) {
		for (var i = 0; i < Max_Ores - Object.keys(Game.active_layer.ores).length; i++) {
			spawnOre()
		}
		Game.active_layer.respawnTime = respawnOreTime()
		return
	}
	var minerTime = getMinerTime()
	var minerDamage = getMinerDamage()
	var hits = Math.floor(delta_time / minerTime)
	var result = offlineLayerMining(Game.active_layer.index, hits, minerDamage)
	for (const [ore_type, amount] of Object.entries(result)) {
		Game.ores[ore_type] += amount
	}
	delta_time -= (hits * delta_time)
	return delta_time

}
function basicUpdate(delta_time) {
	respawnOre(delta_time)
	if (Game.unlocks.mine_automation === true && Object.keys(Game.active_layer.ores).length > 0) {
		idleMining(delta_time)
	}
}

function idleMining(delta_time) {
	var minerTime = getMinerTime()
	var minerDamage = getMinerDamage()
	Game.miner_timebank += delta_time
	while (Game.miner_timebank > minerTime) {
		Game.miner_timebank -= minerTime
		damageOre(Object.keys(Game.active_layer.ores)[0], minerDamage)
	}
}

function respawnOre(delta_time) {
	if (Object.keys(Game.active_layer.ores).length >= Max_Ores) {
		return false
	}
	if (Game.active_layer.respawnTime === 0) {
		spawnOre()
		Game.active_layer.respawnTime = respawnOreTime()
	} else {
		Game.active_layer.respawnTime = Math.max(0, Game.active_layer.respawnTime - delta_time)
	}
	
}
