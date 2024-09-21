import {damageOre} from "../game/ores.js"
import {Ores} from "../game/constants.js"
import {pushUniqueEventToQueue} from "../ui/queue.js"

const Ore_Size = 64

//Erase all ores from the UI so they can be redrawn elsewhere
export function removeAllOres() {
	pushUniqueEventToQueue(["REMOVE_ALL_ORES"])
}

export function refreshMineOres() {
	const layer_ores = Game.active_layer.ores
	const parent_layer = document.getElementById("layer_" + Game.active_layer.index);
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
	const max_tries = 50;
	var i = 0;
	while (!valid_position) {
		i++;
		valid_position = true
		var x = Math.floor(Math.random() * (rect.width - Ore_Size * 2) + Ore_Size)
		var y = Math.floor(Math.random() * (rect.height - Ore_Size * 2) + Ore_Size)
		for (var i = 0; i < all_positions.length; i++) {
			if (Math.abs(x - all_positions[i][0]) < Ore_Size * 1.5 && Math.abs(y - all_positions[i][1]) < Ore_Size * 1.5) {
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

function laodTransformedImageFromCache(image_name, image_id) {
	if (image_name in Cache) {
		return Cache[image_name]
	}
	var canvas = document.createElement("canvas")
	canvas.height = 64
	canvas.width = 64
	var context = canvas.getContext("2d");
	const img = new Image();
	img.onload = () => {
		context.drawImage(img, 0, 0)
		const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  		const data = imageData.data;
  		for (let i = 0; i < data.length; i += 4) {
			if (data[i] == 70 && data[i + 1] == 70 && data[i + 2] == 70) {
				data[i + 3] = 0
			}
		}
		context.putImageData(imageData, 0, 0);
		var data_url = canvas.toDataURL();
		Cache[image_name] = data_url;
		document.getElementById(image_id).src = data_url
	}
	img.src = "images/" + image_name
	return ""
}

function addMineOrePicture(ore_id, ore_data) {
	
	const img = new Image();
	img.id = ore_id
	img.src = laodTransformedImageFromCache(Ores[ore_data["type"]]["image"], ore_id)
	img.className = "ore_image"

	// CLICK ORE IN MINE METHOD
	img.onclick = function() {
		damageOre(ore_id, -1)
	}
	return img
}

