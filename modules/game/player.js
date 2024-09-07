export function getPlayerDamage() {
	var damage = 1;
	if (Game.unlocks.shop_click_damage_1 === true) {
		damage += 1
	}
	if (Game.unlocks.shop_click_damage_2 === true) {
		damage += 1
	}
	return damage;
}

export function respawnOreTime() {
	// return value in milliseconds
	var respawn;
	if (Game.unlocks.shop_ore_respawn_3 === true) {
		respawn = 0;
	} else if (Game.unlocks.shop_ore_respawn_2 === true) {
		respawn = 1;
	} else if (Game.unlocks.shop_ore_respawn_1 === true) {
		respawn = 5;
	} else {
		respawn = 10;
	}
	return (1000 * respawn)
}

export function getMinerTime() {
	var time = 5000
	if (Game.unlocks.shop_miner_speed_1 === true) {
		time = time / 2
	}
	return time
}

export function getMinerDamage() {
	var value = 1
	if (Game.unlocks.shop_miner_1 === true) {
		value += 1
	}
	if (Game.unlocks.shop_miner_2 === true) {
		value += 1
	}
	return value
}

export function hasUnlock(key) {
	if (!(key in Game.unlocks)) {
		return false
	}
	if (Game.unlocks[key] === true) {
		return true
	}
	return false
}