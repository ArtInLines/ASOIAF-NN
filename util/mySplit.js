function mySplit(str = '', splitter = ',', ignoreStart = '"', ignoreEnd = ignoreStart) {
	let out = [];
	let temp = '';
	let ignore = false;
	for (let i = 0; i < str.length; i++) {
		// Check whether to ignore
		if (ignoreStart === ignoreEnd) {
			if (str.slice(i, i + ignoreStart.length) === ignoreStart) {
				ignore = !ignore;
				continue;
			}
		} else {
			if (str.slice(i, i + ignoreStart.length) === ignoreStart) {
				ignore = true;
				continue;
			} else if (str.slice(i, i + ignoreEnd.length) === ignoreEnd) {
				ignore = false;
				continue;
			}
		}

		if (!ignore && str.slice(i, i + splitter.length) === splitter) {
			out.push(temp);
			temp = '';
		} else temp += str[i];
	}
	out.push(temp);
	return out;
}

module.exports = mySplit;
