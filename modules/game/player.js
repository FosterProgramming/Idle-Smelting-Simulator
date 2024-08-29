export function getPlayerDamage() {
	var damage = 1;
	if (Game.unlocks.shop_click_damage_1 === true) {
		damage += 1
	} else if (Game.unlocks.shop_click_damage_2 === true) {
		damage += 1
	}
	return damage;
}