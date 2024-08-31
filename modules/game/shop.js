import {Shop_Upgrades} from "./unlocks.js"
import {loadShop} from "../ui/shop.js"

export function buyShopUpgrade(upgrade_id) {
	var upgrade = Shop_Upgrades[upgrade_id]
	if (Game.money < upgrade.cost || Game.unlocks[upgrade.unlock] === true) {
		return false
	}
	Game.money -= upgrade.cost
	Game.unlocks[upgrade.unlock] = true
	loadShop()
	return true
}