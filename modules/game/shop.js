import {Shop_Upgrades} from "./unlocks.js"
import {loadShop} from "../ui/shop.js"
import {Ores} from "./constants.js"
import {checkProgress, setProgress} from "./player.js"
import {getOrePrice} from "./player_stats.js"

export function buyShopUpgrade(upgrade_id) {
	var upgrade = Shop_Upgrades[upgrade_id]
	if (Game.inventory.money < upgrade.cost || checkProgress(upgrade.unlock[0], upgrade.unlock[1])) {
		return false
	}
	Game.inventory.money -= upgrade.cost
	setProgress(upgrade.unlock[0], upgrade.unlock[1])
	loadShop()
	return true
}

export function sellIngot(ore_type, amount) {
	if (amount == -1) {
		//SELL ALL
		amount = Game.inventory.ingots[ore_type]
	}
	if (Game.inventory.ingots[ore_type] >= amount) {
		var money = getOrePrice(ore_type) * amount
		Game.inventory.money += money; //Ores[ore_type]["value"] * amount;
		Game.inventory.ingots[ore_type] -= amount;
		Game.stats.money_made += money;
	}
}