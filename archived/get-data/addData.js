const getData = require('./getData');
const writeData = require('./writeData');

const headers = ['dies', 'name', 'sex', 'age', 'isHighBorn', 'isWarg', 'isMagicUser', 'isBastard', 'isPOV', 'prevChapterAmount', 'hasValyrianSteel', 'appears', 'height'];

// writeData('./test')
// 	.add({ dies: true, name: 'Robert Baratheon', sex: 'm', age: 36, isHighBorn: true, appears: true, height: 6.5 })
// 	.add({ dies: true, name: 'Robert Baratheon', sex: 'm', age: 36, isHighBorn: true, appears: true, height: 6.5 })
// 	.close();

async function addData(toWrite, charList, { close = true, headerList = headers, batch_size = 100, currentBook = 'A Game of Thrones' }) {
	if (typeof toWrite === 'string') toWrite = writeData(toWrite, headerList);
	else console.assert(typeof toWrite === 'object' && toWrite.add && toWrite.close && toWrite.ws, 'First parameter to "addData" call is of invalid form: %s', toWrite);

	let batch = [];
	let i = 0;
	while (i < charList.length) {
		const char = charList[i];

		if (typeof char === 'string') char = { name: char };
		else if (Array.isArray(char)) {
			let obj = {};
			char.forEach((val, i) => (obj[headerList[i]] = val));
			char = obj;
		}
		batch[i] = char;

		i++;
		if (i % batch_size === 0 || i === charList) {
			const data = await getData(
				batch.map((char) => char.url || char.name.replace(' ', '_')),
				{ currentBook: currentBook }
			);
			data.forEach((char, i) => toWrite.add(...batch[i], ...char));
			batch = [];
		}
	}

	if (close) return toWrite.close();
	return toWrite;
}

module.exports = addData;
