export function isNumeric(str) {
	return !isNaN(str) && !isNaN(parseFloat(str))
}

export function filterByFullTextSearch(lens, prop, searchText) {
	const propLow = lens[prop].toLowerCase()
	const searchLow = searchText.toLowerCase()
	const foundInString = propLow.indexOf(searchLow)
	return !!~foundInString
}
