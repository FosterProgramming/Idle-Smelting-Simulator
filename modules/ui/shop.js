import {Shop_Upgrades} from "../game/unlocks.js"
import {buyShopUpgrade} from "../game/shop.js"

export function loadShop() {
	for (const [key, value] of Object.entries(Shop_Upgrades)) {
		var div = makeShopItemDiv(key)
		document.querySelector('.buy_container').appendChild(div)
	}
}

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
		if (Game.unlocks[upgrade.unlock] === true) {
			elements[i].classList.remove("can_buy", "cannot_buy")
			elements[i].classList.add("purchased")
		} else if (Game.money >= upgrade.cost) {
			elements[i].classList.remove("cannot_buy")
			elements[i].classList.add("can_buy")
		} else {
			elements[i].classList.remove("can_buy")
			elements[i].classList.add("cannot_buy")
		}
	}
}