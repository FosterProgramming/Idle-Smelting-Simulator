import {damageOre} from "../game/ores.js"
import {Ores} from "../game/constants.js"
import {pushUniqueEventToQueue} from "../ui/queue.js"
import {startAnimationCycle} from "./animations.js"

const Ore_Size = 64
const Robot_Size = 48

//Erase all ores from the UI so they can be redrawn elsewhere
export function removeAllOres() {
	pushUniqueEventToQueue(["REMOVE_ALL_ORES"])
}

function makeZones(rect) {
	var result = {}
	result["h_margin"]  = (rect.width % (Ore_Size * 2)) / 2
	result["v_margin"]  = (rect.height % (Ore_Size * 2)) / 2
	result["zones"] = Math.floor(rect.width / (Ore_Size * 2)) * Math.floor(rect.height / (Ore_Size * 2))
	return result
}
export function refreshMineOres() {
	const layer_ores = Game.active_layer.ores
	const parent_layer = document.getElementById("layer_" + Game.active_layer.index);
	var rect =  parent_layer.getBoundingClientRect()
	var {h_margin, v_margin, zones} = makeZones(rect)
	var unused_zones = [...Array(zones).keys()];
	for (const ore_id of Object.keys(layer_ores)) {
		var img = document.getElementById(ore_id)
		if (img) {
			var row_length = Math.floor(rect.width / (Ore_Size * 2))
			var used_zone = Math.floor(parseInt(img.style.left) / (Ore_Size * 2))
			used_zone += Math.floor((parseInt(img.style.top)) / (Ore_Size * 2)) * row_length
			const index = unused_zones.indexOf(used_zone)
			unused_zones.splice(index, 1)

		}
	}
	for (const [key, value] of Object.entries(layer_ores)) {
		if (unused_zones.length === 0) {
			return
		}

		if (document.getElementById(key)) {
			continue;
		}
		
		img = addMineOrePicture(key, value)
		var {unused_zones, position} = makeOrePosition(unused_zones, rect)

		//position = [i * 50, i * 50]
		img.style.setProperty("left", position[0] + h_margin)
		img.style.setProperty("top", position[1] + v_margin)
		parent_layer.appendChild(img)

	}
}

function makeOrePosition(unused_zones, rect) {
	var index = Math.floor(Math.random() * unused_zones.length)
	var zone = unused_zones[index]
	var row_length = Math.floor(rect.width / (Ore_Size * 2))
	var position = [
		((zone % row_length) * Ore_Size * 2) +  Math.floor(Math.random() * Ore_Size),
		(Math.floor(zone / row_length) * Ore_Size * 2) + Math.floor(Math.random() * Ore_Size)

	]
	unused_zones.splice(index, 1)
	return {"unused_zones": unused_zones, "position": position}
}

function laodTransformedImageFromCache(image_name, image_id) {
	if (image_name in Cache) {
		return Cache[image_name]
	}
	var canvas = document.createElement("canvas")
	canvas.height = Ore_Size
	canvas.width = Ore_Size
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

function drawRobotCircle() {
	var canvas = document.createElement("canvas")
	canvas.height = Robot_Size
	canvas.width = Robot_Size * 2
	var context = canvas.getContext("2d");
	var radius = Robot_Size / 2
    context.beginPath();
	context.arc(radius, radius, radius, 0, 2 * Math.PI);
	context.fillStyle = "purple";
	context.fill();
	context.beginPath();
	context.arc(Robot_Size + radius, radius, radius, 0, 2 * Math.PI);
	context.fillStyle = "red";
	context.fill();
    return canvas
}

export function addRobotPicture() {
	const img = new Image();
	img.setAttribute('draggable', false);
	img.id = "robot_miner"
	img.className = "robot_image"
	img.src = drawRobotCircle().toDataURL();
	img.style.setProperty("width", Robot_Size);
	img.style.setProperty("height", Robot_Size);
	img.style.setProperty("object-position", "0px 0px");
	const parent_layer = document.getElementById("layer_" + Game.active_layer.index);
	parent_layer.appendChild(img)
	setRobotPosition()
}

export function setRobotPosition() {
	var robot = document.getElementById("robot_miner")
	if (!robot) {
		return
	}
	var ore_id = Object.keys(Game.active_layer.ores)[0]
	var ore = document.getElementById(ore_id)
	if (ore) {
		robot.style.setProperty("top", parseInt(ore.style.top) + 3 + (Ore_Size - Robot_Size) / 2)
		robot.style.setProperty("left", parseInt(ore.style.left) + 3 + (Ore_Size - Robot_Size) / 2)
	}
}

function addMineOrePicture(ore_id, ore_data) {
	
	const img = new Image();
	img.id = ore_id
	img.src = laodTransformedImageFromCache(Ores[ore_data["type"]]["image"], ore_id)
	img.className = "ore_image"
	img.setAttribute('draggable', false);
	// CLICK ORE IN MINE METHOD
	img.onclick = function() {
		damageOre(ore_id, -1)
	}
	return img
}

