import {formatInteger, formatDuration} from './format.js'

export function gameLoop() {
	const current_time = Date.now();
	if (Game.current_time === null) {
		Game.current_time = current_time;
    	Game.total_time = 0;
    	return;
	}
	const delta_time = current_time - Game.current_time;
	if (delta_time > 0) {
		Game.total_time += delta_time;
		updateGame(delta_time, Game.total_time);
	}
	if (delta_time > 60000) {
		alert("You have been offline for " + formatDuration(delta_time))
	}
  Game.current_time = current_time;
}

export function uiLoop() {
	var uiList = ["stone", "iron", "gold"]
	for (var i = 0; i < uiList.length; i++)  {
		var elements = document.getElementsByClassName(uiList[i])
		for (var j = 0; j < elements.length; j++)  {
			elements[j].innerHTML = formatInteger(Game[uiList[i]])
		}
	}
}

function updateGame(delta_time) {
	//delta_time, total_time are in milliseconds
  Game.stone += Game.iron * delta_time / 1000
  Game.iron += Game.gold * delta_time / 1000
  Game.gold += delta_time / 1000
}
