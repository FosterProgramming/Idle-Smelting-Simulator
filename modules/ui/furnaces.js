import {Smelter_Load_Time} from "../game/constants.js"
import {startSmelter, emptySmelter} from "../game/smelters.js"
import {getSmelterTime} from "../game/player_stats.js"

export function loadAllFurnaces() {
	for (const ore_type of Object.keys(Game.furnaces)) {
		loadFurnace(ore_type)
		updateFurnaceState(ore_type, Game.furnaces[ore_type].state)
	}
}

export function loadFurnace(ore_type) {
	var div = makeFurnaceDiv(ore_type)
	document.querySelector("#smelter_container").appendChild(div)
}

export function smelterLoop() {
	for (const ore_type of Object.keys(Game.furnaces)) {
		updateFurnaceBar(ore_type)
	}
}

function makeFurnaceDiv(ore_type) {
	var div = document.createElement("div")
	div.id = "furnace_" + ore_type
	div.className = "furnace loading"

	var furnace_square = document.createElement("div")
	furnace_square.className = "furnace_square"
	furnace_square.textContent = "LOADING"

	var bar = document.createElement("div")
	bar.className = "background_bar"
	var time_bar = document.createElement("div")
	time_bar.className = "time_bar"
	bar.appendChild(time_bar)

	var button = document.createElement("button")
	button.textContent = "Load"
	button.onmousedown = function() {
		Game.furnaces[ore_type].holding = true
	}
	div.appendChild(furnace_square)
	div.appendChild(bar)
	div.appendChild(button)
	return div
}

export function updateFurnaceHolding() {
	for (var furnace of Object.values(Game.furnaces)) {
		furnace.holding = false
	}
}
export function updateFurnaceBar(ore_type) {
	var div = document.querySelector("#furnace_" + ore_type + " .time_bar")
	const furnace = Game.furnaces[ore_type]
	var max_time = Smelter_Load_Time
	if (furnace.state == "WAITING" || furnace.state == "FINISHED") {
		max_time = getSmelterTime(ore_type)
	}
	var width = Math.round(Game.furnaces[ore_type].time_bar / max_time * 100)
	var class_list = document.querySelector("#furnace_" + ore_type).classList
	if (class_list.contains(furnace.state.toLowerCase())) {
		// we do this check to avoid visual glitch during transition period
		div.style.width = width + "%"
	}
	
}

export function updateFurnaceState(ore_type, new_state) {
	var div = document.querySelector("#furnace_" + ore_type)
	div.classList.remove("loading", "ready", "waiting", "finished")
	var square = document.querySelector("#furnace_" + ore_type + " .furnace_square")
	var bar = document.querySelector("#furnace_" + ore_type + " .time_bar")
	square.textContent = new_state

	var button = document.querySelector("#furnace_" + ore_type + " button")
	if (new_state == "LOADING") {
		div.classList.add("loading")
		button.removeAttribute("onclick");
		button.textContent = "Load"
		button.onmousedown = function() {
			Game.furnaces[ore_type].holding = true
		}
	} else if (new_state == "READY") {
		div.classList.add("ready")
		button.textContent = "Start"
		button.removeAttribute("onmousedown");
		button.onmousedown = function() {
			startSmelter(ore_type)
		}
	} else if (new_state == "WAITING") {
		button.removeAttribute("onmousedown");
		div.classList.add("waiting")
	} else if (new_state == "FINISHED") {
		div.classList.add("finished")
		button.textContent = "Empty"
		button.onclick = function() {
			emptySmelter(ore_type)
		}	
	}
}