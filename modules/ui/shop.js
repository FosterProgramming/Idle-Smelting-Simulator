import {Shop_Upgrades} from "../game/unlocks.js"
import {buyShopUpgrade, sellIngot} from "../game/shop.js"
import {checkProgress, checkMultiRequirements} from "../game/player.js"

export function loadShop() {
	for (const ore_type of Object.keys(Game.inventory.ingots)) {
		loadShopIngot(ore_type)
	}
	loadShopUpgrades()
	document.getElementById("sell_one").onclick = function() {
		var ore_type = document.getElementById("ingot_select").value
		sellIngot(ore_type, 1)
	}
	document.getElementById("sell_all").onclick = function() {
		var ore_type = document.getElementById("ingot_select").value
		sellIngot(ore_type, -1)
	}
}

function loadShopUpgrades() {
	var elements = document.querySelectorAll('.shop_upgrade');
	for (var i = 0; i < elements.length; i++) {
		elements[i].remove()
	}
	for (const [shop_id, upgrade] of Object.entries(Shop_Upgrades)) {
		if (checkProgress(upgrade.unlock[0], upgrade.unlock[1])) {
			continue;
		}
		if (checkMultiRequirements(upgrade.requires)) {
			var div = makeShopItemDiv(shop_id)
			document.querySelector('.buy_container').appendChild(div)
		}
		
	}
}

export function loadShopIngot(ore_type) {
	var select = document.getElementById('ingot_select');
	select.options[select.options.length] = new Option(ore_type + " Ingot", ore_type);
}
/*function makeSellableOreDiv(ore) {
	const div = document.createElement("div")
	div.appendChild(makeOreValueDiv(ore))
	const sell_one = document.createElement("button");
	sell_one.textContent = "Sell 1"
	//sell_one.style.display = "block";
	sell_one.style.float = "right";

	//SELL ORE CLICK METHOD
	sell_one.onclick = function() {
		sellOre(ore, 1)
	}
	
	const sell_all = document.createElement("button");
	sell_all.textContent = "Sell All"
	sell_all.style.display = "inline";
	sell_all.style.float = "right";

	//SELL ORE CLICK METHOD
	sell_all.onclick = function() {
		sellOre(ore, -1)
	}

	div.appendChild(sell_one)
	div.appendChild(sell_all)
	return div	
}
*/

function makeShopItemDiv(key) {
	var div = document.createElement("div")
	var shop_upgrade = Shop_Upgrades[key]
	div.id = key
	div.className = "shop_upgrade"
	var text1 = document.createElement("div")
	text1.textContent = shop_upgrade.name
	div.appendChild(text1)
	var text2 = document.createElement("div")
	text2.textContent = "Cost : " + shop_upgrade.cost
	div.appendChild(text2)
	
	var buy_button = document.createElement("button");
	buy_button.textContent = "Buy"
	buy_button.onclick = function() {
		buyShopUpgrade(key)
	}
	div.appendChild(buy_button);
	return div
}

export function updatePurchaseClass() {
	var elements = document.getElementsByClassName("shop_upgrade");
	for (var i = 0; i < elements.length; i++) {
		var upgrade_id = elements[i].id
		var upgrade = Shop_Upgrades[upgrade_id]
		if (checkProgress(upgrade.unlock[0], upgrade.unlock[1])) {
			elements[i].classList.remove("can_buy", "cannot_buy")
			elements[i].classList.add("purchased")
		} else if (Game.inventory.money >= upgrade.cost) {
			elements[i].classList.remove("cannot_buy")
			elements[i].classList.add("can_buy")
		} else {
			elements[i].classList.remove("can_buy")
			elements[i].classList.add("cannot_buy")
		}
	}
}