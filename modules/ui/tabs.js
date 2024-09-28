export function unlockAllTabs() {
	for (const unlock_id of Object.keys(Game.progress)) {
		if (unlock_id.startsWith("tab-")) {
			unlockTab(unlock_id)
		}
	}
}
export function unlockTab(tab_id) {
	document.getElementById(tab_id).style.display = "inline-block";
}

export function openTab(tab_id) {
	removeTabNotification(tab_id)
	var all_tabs = document.getElementsByClassName("tab");
	for (var i = 0; i < all_tabs.length; i++) {
		all_tabs[i].style.display = "none";
	}

	var tab_headers = document.getElementsByClassName("tab-header");
	for (var i = 0; i < tab_headers.length; i++) {
		tab_headers[i].classList.remove("active");
	}

	document.getElementsByClassName(tab_id)[0].style.display = "block";
	document.getElementById(tab_id).classList.add("active");
}

function drawNotifCircle() {
	var canvas = document.createElement("canvas")
	var context = canvas.getContext("2d");
	var radius = 8
	canvas.width = radius * 2
	canvas.height = radius * 2
    context.beginPath();
	context.arc(radius, radius, radius, 0, 2 * Math.PI);
	context.fillStyle = "yellow";
	context.fill();
    return canvas
}

function removeTabNotification(tab_id) {
	var element = document.getElementById(tab_id + "_notif")
	if (element) {
		element.remove()
	}
}

export function addTabNotification(tab_id) {
	if (document.getElementById(tab_id).classList.contains("active")) {
		return
	}
	const img = new Image();
	img.setAttribute('draggable', false);
	img.id = tab_id + "_notif"
	img.className = "tab_notif"
	img.src = drawNotifCircle().toDataURL();
	document.getElementById(tab_id).appendChild(img)
}