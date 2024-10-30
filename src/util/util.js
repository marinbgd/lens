export function isNumeric(str) {
	return !isNaN(str) && !isNaN(parseFloat(str))
}

export function filterByFullTextSearch(lens, prop, searchText) {
	const propLow = lens[prop].toLowerCase()
	const searchLow = searchText.toLowerCase()
	const foundInString = propLow.indexOf(searchLow)
	return !!~foundInString
}

export function filterBySpeed(lens, searchText) {
	let foundInMax = false
	if (lens.maxSpeed) {
		foundInMax = !!~lens.maxSpeed.toString().indexOf(searchText)
	}

	let foundInMin = false
	if (lens.minSpeed) {
		foundInMin = !!~lens.minSpeed.toString().indexOf(searchText)
	}

	let foundInSpeed = false
	if (lens.speed) {
		foundInSpeed = !!~lens.speed.toString().indexOf(searchText)
	}

	return foundInMax || foundInMin || foundInSpeed
}

export function filterByFocalLength(lens, searchText) {
	let foundInMax = false
	if (lens.maxFocalLength) {
		foundInMax = !!~lens.maxFocalLength.toString().indexOf(searchText)
	}

	let foundInMin = false
	if (lens.minFocalLength) {
		foundInMin = !!~lens.minFocalLength.toString().indexOf(searchText)
	}

	let foundInFocalLength = false
	if (lens.focalLength) {
		foundInFocalLength = !!~lens.focalLength.toString().indexOf(searchText)
	}

	return foundInMax || foundInMin || foundInFocalLength
}
