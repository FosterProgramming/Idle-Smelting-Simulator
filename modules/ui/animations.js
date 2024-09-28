

export function startAnimationCycle(img_id, animation_data) {
	nextAnimationStep(img_id, animation_data, 0)
}

function nextAnimationStep(img_id, animation_data, index) {
	var {time, frame, callback} = animation_data[index]
	var image = document.getElementById(img_id)
	if (image.getAttribute('interruptAnimation') === "true") {
		image.setAttribute('interruptAnimation', "false");
		return
	}
	var objectPosition = "-" + parseInt(image.style.width) * frame[0] + "px -" +  parseInt(image.style.height) * frame[1] + "px"
	image.style.setProperty("object-position", objectPosition);

	if (index + 1 < animation_data.length) {
	 	setTimeout( 
			() => {callback(); nextAnimationStep(img_id, animation_data, index + 1)},
			time
		)
 	} else if (time > 0) {
 		setTimeout( 
			() => {callback(); nextAnimationStep(img_id, animation_data, 0)},
			time
		)
 	}
}