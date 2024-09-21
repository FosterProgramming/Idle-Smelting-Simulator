import {pushUniqueEventToQueue} from "./ui/queue.js"

export function addInputEvents() {
	addEventListener("mouseup", (event) => pushUniqueEventToQueue(["MOUSEUP"]));
}

