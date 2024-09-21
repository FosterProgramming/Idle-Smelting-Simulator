import {unlockFurnace} from "./smelters.js"
import {Smelters} from "./constants.js"
import {pushUniqueEventToQueue} from "../ui/queue.js"
 
export function setProgress(key, level) {
	Game.progress[key] = level
	unlockEvent(key, level)
}

export function checkProgress(key, level) {
	if (!(key in Game.progress)) {
		return false
	}
	if (Game.progress[key] < level) {
		return false
	}
	return true
}

export function checkMultiRequirements(reqs) {
	for (const [key, level] of Object.entries(reqs)) {
		if (!checkProgress(key, level)) {
			return false
		}
	}
	return true
}

export function getProgressLevel(key) {
	if (!(key in Game.progress)) {
		return 0
	} else {
		return Game.progress[key]
	}
}

export function checkAchievements() {
	if (Game.stats.ingots_smelted >= 5) {
		if (!checkProgress("tab-mines", 1)) {
			setProgress("tab-mines", 1)
		}
	}
}

function unlockEvent(key, level) {
	if (key == "furnace") {
		var ore_type = Object.keys(Smelters)[level - 1]
		unlockFurnace(ore_type)
	}
	if (key == "tab-mines") {
		pushUniqueEventToQueue(["UNLOCK_TAB", "tab-mines"])
	}
}