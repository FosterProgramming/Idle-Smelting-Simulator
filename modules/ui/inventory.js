export function loadInventory() {
	for (const ore_type of Object.keys(Game.inventory.ores)) {
		loadOre(ore_type)
	}
	for (const ore_type of Object.keys(Game.inventory.ingots)) {
		loadInventoryIngot(ore_type)
	}
	document.querySelector('#ores-dropdown').onclick = function() {
		var classList = document.querySelector('#ores-dropdown').classList
		if (classList.contains("closed")) {
			openItemList("ore")
			classList.replace("closed", "opened")
		} else if (classList.contains("opened")) {
			closeItemList("ore")
			classList.replace("opened", "closed")
		}
	}
	document.querySelector('#ingots-dropdown').onclick = function() {
		var classList = document.querySelector('#ingots-dropdown').classList
		if (classList.contains("closed")) {
			openItemList("ingot")
			classList.replace("closed", "opened")
		} else if (classList.contains("opened")) {
			closeItemList("ingot")
			classList.replace("opened", "closed")
		}
	}
}

function closeItemList(item_type) {
	var items = document.getElementsByClassName("inventory_" + item_type);
		for (var i = 0; i < items.length; i++) {
			items[i].style.display = "none";
	}
}

function openItemList(item_type) {
	var items = document.getElementsByClassName("inventory_" + item_type);
		for (var i = 0; i < items.length; i++) {
			items[i].style.display = "block";
	}
}

export function loadOre(ore_type) {
	//var div = makeSellableOreDiv(ore_type)
	//document.querySelector('.sell_container').appendChild(div)
	var div = makeOreValueDiv(ore_type)
	document.querySelector('.inventory #ores-dropdown').appendChild(div)
}

function makeOreValueDiv(ore) {
	const div = document.createElement("div")
	div.className = "inventory_ore"
	const text = document.createTextNode("Ore " + ore + ":  ")
	
	const variableDiv = document.createElement("div");
	variableDiv.className = "ore ore_" + ore
	variableDiv.style.display = "inline";
	div.appendChild(text)
	div.appendChild(variableDiv)
	return div

}

export function loadInventoryIngot(ore_type) {
	var div = makeIngotValueDiv(ore_type)
	document.querySelector('.inventory #ingots-dropdown').appendChild(div)
}

function makeIngotValueDiv(ore_type) {
	const div = document.createElement("div")
	div.className = "inventory_ingot"
	const text = document.createTextNode("Ingot " + ore_type + ":  ")
	
	const variableDiv = document.createElement("div");
	variableDiv.className = "ingot ingot_" + ore_type
	variableDiv.style.display = "inline";
	div.appendChild(text)
	div.appendChild(variableDiv)
	return div
}