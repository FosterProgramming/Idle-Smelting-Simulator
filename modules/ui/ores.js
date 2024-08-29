import {sellOre, damageOre} from "../game/ores.js"

export function loadOres() {
	for (const [key, value] of Object.entries(Game.ores)) {
		var div = makeSellableOreDiv(key)
		document.querySelector('.sell_container').appendChild(div)
		div = makeOreValueDiv(key)
		document.querySelector('.ore_inventory').appendChild(div)
	}
}

function makeOreValueDiv(ore) {
	const div = document.createElement("div")
	const text = document.createTextNode("ore " + ore + ":  ")
	
	const variableDiv = document.createElement("div");
	variableDiv.className = "ore ore_" + ore
	variableDiv.style.display = "inline";
	div.appendChild(text)
	div.appendChild(variableDiv)
	return div

}

function makeSellableOreDiv(ore) {
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

//Erase all ores from the UI so they can be redrawn elsewhere
export function removeAllOres() {
	var event_already_exists = false;
	for (var i = 0; i < window.Ui_queue.length; i++) {
		if (window.Ui_queue[i][0] == "REMOVE_ALL_ORES") {
			event_already_exists = true;
		}
	}
	if (!event_already_exists) {
		window.Ui_queue.push(["REMOVE_ALL_ORES"])
	}
	
}

export function refreshMineOres() {
	const layer_ores = Game.active_layer.ores
	const parent_layer = document.getElementById("mine_layer");
	var all_positions = []
	for (const [key, value] of Object.entries(layer_ores)) {
		var img = document.getElementById(key)
		if (img) {
			all_positions.push([parseInt(img.style.left), parseInt(img.style.top)])
		}
	}
	for (const [key, value] of Object.entries(layer_ores)) {
		if (document.getElementById(key)) {
			continue;
		}
		
		img = addMineOrePicture(key, value)
		var position = makeOrePosition(parent_layer, all_positions)
		if (position == null) {
			continue;
		}
		all_positions.push(position)
		//position = [i * 50, i * 50]
		img.style.setProperty("left", position[0])
		img.style.setProperty("top", position[1])
		parent_layer.appendChild(img)
	}
}

function makeOrePosition(parent_layer, all_positions) {
	var valid_position = false
	var rect =  parent_layer.getBoundingClientRect()
	const size = 32
	const max_tries = 50;
	var i = 0;
	while (!valid_position) {
		i++;
		valid_position = true
		var x = Math.floor(Math.random() * (rect.width - size * 2) + rect.x + size)
		var y = Math.floor(Math.random() * (rect.height - size * 2) + rect.y + size)
		for (var i = 0; i < all_positions.length; i++) {
			if (Math.abs(x - all_positions[i][0]) < size * 1.5 && Math.abs(y - all_positions[i][1]) < size * 1.5) {
				valid_position = false;
				break;
			}
		}
		if (i > max_tries) {
			return null;
		}
	}
	
	var position = [x, y]
	return position
}

function addMineOrePicture(ore_id, ore_data) {
	var img = document.createElement("img")
	if (ore_data["type"] == "A") {
		img.src = "images/green_square.png"
	} else if  (ore_data["type"] == "B") {
		img.src = "images/blue_square.png"
	} else if  (ore_data["type"] == "C") {
		img.src = "images/red_square.png"
	}
	img.id = ore_id
	img.className = "ore_image"

	// CLICK ORE IN MINE METHOD
	img.onclick = function() {
		damageOre(ore_id, -1)
	}
	return img
}

