import {Shop_Upgrades} from "./unlocks.js"

export function buyShopUpgrade(upgrade_id) {
	var upgrade = Shop_Upgrades[upgrade_id]
	if (Game.money < upgrade.cost || Game.unlocks[upgrade.unlock] === true) {
		return false
	}
	Game.money -= upgrade.cost
	Game.unlocks[upgrade.unlock] = true
	return true
}