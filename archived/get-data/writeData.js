const fs = require('fs');

const DEFAULT_AGE = 30;
const DEFAULT_HEIGHT = 5.5;
const headers = ['dies', 'name', 'sex', 'age', 'isHighBorn', 'isWarg', 'isMagicUser', 'isBastard', 'isPOV', 'wasPOV', 'hasValyrianSteel', 'appears', 'height'];

function startDataFile(path, keys = headers) {
	if (!path.endsWith('.csv')) path += '.csv';
	const ws = fs.createWriteStream(path);
	ws.write(keys.join(','));
	return ws;
}

function writeToDataFile(ws, data, keys = headers) {
	if (!data) return startDataFile(ws, keys);

	let chunk = '';
	if (!Array.isArray(data)) {
		for (let i = 0; i < keys.length; i++) {
			const header = keys[i];
			chunk += (i === 0 ? '' : ',') + data[header];
		}
	} else chunk = data.join(',');
	ws.write('\n' + chunk);
	return ws;
}

function end(ws, ...args) {
	return ws.end(...args);
}

function getBooleanInt(v) {
	if (typeof v === 'boolean') return v ? 1 : 0;
	if (typeof v === 'number') return v >= 1 ? 1 : 0;
	if (typeof v === 'string') return Number(v) && Number(v) >= 1 ? 1 : 0;
	return 0;
}

function createChar(obj, keys = headers) {
	if (Array.isArray(obj)) {
		let temp = {};
		obj.forEach((val, i) => (temp[keys[i]] = val));
		obj = temp;
	}

	const result = {};

	['dies', 'isHighBorn', 'isWarg', 'isMagicUser', 'isBastard', 'isPOV', 'wasPOV', 'hasValyrianSteel', 'appears'].forEach((key) => (result[key] = getBooleanInt(obj[key])));

	// Rest: ['name', 'sex', 'age', 'height']
	['name'].forEach((key) => (result[key] = obj[key] || ''));
	[
		['age', DEFAULT_AGE],
		['height', DEFAULT_HEIGHT],
	].forEach((arr) => {
		const key = arr[0];
		const defaultOpt = arr[1];
		result[key] = Number(obj[key]) || defaultOpt;
	});
	result.sex = obj.sex === 'm' ? -1 : obj.sex === 'f' ? 1 : 0;

	return result;
}

function addCharToFile(ws, data) {
	return writeToDataFile(ws, createChar(data));
}

function writeDataFile(path, keys = headers, ...data) {
	const ws = startDataFile(path, keys);

	function close(...args) {
		return end(ws, ...args);
	}

	function add(...data) {
		data.forEach((char) => addCharToFile(ws, char));
		return { ws, add, close };
	}

	add(...data);

	return { ws, add, close };
}

module.exports = writeDataFile;
