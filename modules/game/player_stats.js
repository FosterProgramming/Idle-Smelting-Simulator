import {Smelters} from "./constants.js"
import {checkProgress} from "./player.js"

export function getPlayerDamage() {
	var damage = 1;
	if (checkProgress("shop_click_damage", 1)) {
		damage += 1
	}
	if (checkProgress("shop_click_damage", 2)) {
		damage += 1
	}
	return damage;
}

export function respawnOreTime() {
	// return value in milliseconds
	var respawn;
	if (checkProgress("shop_ore_respawn", 3)) {
		respawn = 0;
	} else if (checkProgress("shop_ore_respawn", 2)) {
		respawn = 1;
	} else if (checkProgress("shop_ore_respawn", 1)) {
		respawn = 5;
	} else {
		respawn = 10;
	}
	return (1000 * respawn)
}

export function getMinerTime() {
	var time = 5000
	if (checkProgress("shop_robot_speed", 1)) {
		time = time / 2
	}
	return time
}

export function getMinerDamage() {
	var value = 1
	if (checkProgress("shop_robot_damage", 1)) {
		value += 1
	}
	if (checkProgress("shop_robot_damage", 2)) {
		value += 1
	}
	return value
}

function getSmelterCapacity(ore_type) {
	var capacity = Smelters[ore_type]["base_capacity"]
	return capacity

}

function getSmelterEfficiency(ore_type) {
	var efficiency = Smelters[ore_type]["base_efficiency"]
	return efficiency

}

export function getSmelterTime(ore_type) {
	var time = Smelters[ore_type]["base_time"]
	var capacity = getSmelterCapacity(ore_type)
	return (time * capacity)
}

export function getSmelterProduction(ore_type) {
	var capacity = getSmelterCapacity(ore_type)
	return capacity
}

export function getSmelterConsumption(ore_type) {
	var efficiency =  getSmelterEfficiency(ore_type)
	var capacity = getSmelterCapacity(ore_type)
	return (efficiency * capacity)
}