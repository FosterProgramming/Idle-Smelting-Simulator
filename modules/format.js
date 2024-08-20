export function formatInteger(num) {
	return Math.floor(num)
}

export function formatDuration(duration) {
	//duration inout is in milliseconds
	var string = ""
	var days = Math.floor(duration / 86400000) // 24 * 3600 * 1000
	if (days > 0) {
		string = days + "d"
	}
	var remainder = duration % 86400000
	var hours = Math.floor(remainder / 3600000)
	if (hours > 0) {
		string += hours + "h"
	}
	remainder = remainder % 3600000
	var mins = Math.floor(remainder / 60000)
	if (mins > 0) {
		string += mins + "m"
	}
	remainder = remainder % 60000
	var seconds = Math.floor(remainder / 1000)
	string += seconds + "s"
	return string
}