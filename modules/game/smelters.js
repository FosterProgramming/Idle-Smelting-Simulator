import {Smelters, Smelter_Load_Time} from "./constants.js"
import {getSmelterTime, getSmelterConsumption, getSmelterProduction} from "./player_stats.js"
import {setProgress} from "./player.js"
import {pushUniqueEventToQueue} from "../ui/queue.js"

export function unlockFurnace(ore_type) {
	Game.inventory.ingots[ore_type] = 0
	Game.furnaces[ore_type] = {
		"state": "LOADING",
		"time_bar": 0,
		"holding": false
	}
	pushUniqueEventToQueue(["ADD_FURNACE", ore_type])
}

export function updateFurnaces(delta_time) {
	for (const [ore_type, furnace] of Object.entries(Game.furnaces)) {
		if (furnace.state === "LOADING" && furnace.holding === true) {
			furnace.time_bar += delta_time
			if (furnace.time_bar >= Smelter_Load_Time ) {
				furnace.time_bar = Smelter_Load_Time
				changeFurnaceState(ore_type, "READY")
			}
		} else if (furnace.state === "WAITING") {
			furnace.time_bar += delta_time
			if (furnace.time_bar >= getSmelterTime(ore_type)) {
				furnace.time_bar = getSmelterTime(ore_type)
				changeFurnaceState(ore_type, "FINISHED")
			}
		}
	}
}

function changeFurnaceState(ore_type, new_state) {
	const states = ["LOADING", "READY", "WAITING", "FINISHED"]
	if (!states.includes(new_state)) {
		console.log(new_state + " is not a valid furnace state")
		return
	}
	Game.furnaces[ore_type].state = new_state
	pushUniqueEventToQueue(["UPDATE_FURNACE", ore_type, new_state])
}

export function startSmelter(ore_type) {
	var consumption = getSmelterConsumption(ore_type)
	if (!(Game.furnaces[ore_type].state === "READY")) {
		return false
	}
	if (Game.inventory.ores[ore_type] < consumption) {
		return false
	}
	Game.inventory.ores[ore_type] -= consumption
	Game.furnaces[ore_type].time_bar = 0
	changeFurnaceState(ore_type, "WAITING")
	return true
}

export function emptySmelter(ore_type) {
	if (!(Game.furnaces[ore_type].state === "FINISHED")) {
		return false
	}
	var production = getSmelterProduction(ore_type)
	Game.inventory.ingots[ore_type] += production
	smelterStats(production, ore_type)
	Game.furnaces[ore_type].time_bar = 0
	changeFurnaceState(ore_type, "LOADING")
	return true
}

function smelterStats(multiplier, ore_type) {
	Game.stats.ingots_smelted.total += multiplier
	if (ore_type in Game.stats.ingots_smelted) {
		Game.stats.ingots_smelted[ore_type] += multiplier
	} else {
		Game.stats.ingots_smelted[ore_type] = multiplier
	}
}