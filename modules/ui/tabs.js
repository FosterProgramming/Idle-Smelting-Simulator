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
	var all_tabs = document.getElementsByClassName("tab");
	for (var i = 0; i < all_tabs.length; i++) {
		all_tabs[i].style.display = "none";
	}

	var tab_headers = document.getElementsByClassName("tab-header");
	for (var i = 0; i < tab_headers.length; i++) {
		tab_headers[i].className = tab_headers[i].className.replace(" active", "");
	}

	document.getElementsByClassName(tab_id)[0].style.display = "block";
	document.getElementById(tab_id).className += " active";
}