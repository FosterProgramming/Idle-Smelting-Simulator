import {formatDuration} from "../ui/format.js"

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
		// TODO:
		// push alert to ui event insetad
	}
  Game.current_time = current_time;
}

export function updateGame(delta_time) {
	//delta_time, total_time are in milliseconds
	//Game.ores.A += 1.2 * delta_time
 	//Game.ores.B += 0.1 * delta_time
}
