function joinArrsToObj(keyArr = [], valArr = []) {
	let obj = {};
	keyArr.forEach((key, i) => (obj[key] = valArr[i]));
	return obj;
}

module.exports = joinArrsToObj;
