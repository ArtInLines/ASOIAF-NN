const fs = require('fs');

const headerList = [
	['bookNr', '1'],
	['name', '-'],
	['dies', '0'],
	['sex', 'unknown'],
	['age', '30'],
	['isHighBorn', '0'],
	['isWarg', '0'],
	['isMagicUser', '0'],
	['isBastard', '0'],
	['isPOV', '0'],
	['prevChapterAmount', '0'],
	['hasValyrianSteel', '0'],
	['height', '5.5'],
	['hairColor', 'unknown'],
	['eyeColor', 'unknown'],
	['houseAllegiance', 'none'],
	['organization', 'none'],
	['location', 'unknown'],
	['title', 'none'],
];

const bookNrEnum = {
	'A Game of Thrones': 1,
	'A Clash of Kings': 2,
	'A Storm of Swords': 3,
	'A Feast For Crows': 4,
	'A Dance with Dragons': 5,
	'The Winds of Winter': 6,
	'A Dream of Spring': 7,
	// TODO: Give numbers to the novellas as well
	'The Hedge Knight': 0,
	'The Sworn Sword': 0,
	'The Mystery Knight': 0,
	'The Princess and the Queen': 0,
	'The Rogue Prince': 0,
};

const bastardNames = ['Snow', 'Waters', 'Sand', 'Pyke', 'Flowers', 'Rivers', 'Storm', 'Stone', 'Hill'];

const removeBeginFromNameList = ['"', 'Lord', 'Lady', 'Ser', 'King', 'Queen', 'Prince', 'Princess', 'Magister', 'Maester'];
const removeEndFromNameList = ['"'];

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

function transformCharname(name = '', regnalNr = '', removeBeginList = removeBeginFromNameList, removeEndList = removeEndFromNameList) {
	// return name;

	name = name.split(',')[0].split('(')[0].trim(); // Remove nicknames, etc. from Name string
	name = name.trim();

	removeBeginList.forEach((str) => {
		if (name.startsWith(str)) name = name.slice(str.length).trim();
	});

	removeEndList.forEach((str) => {
		if (name.endsWith(str)) name = name.slice(0, name.length - str.length).trim();
	});

	if (regnalNr) {
		regnalNr = regnalNr.trim() + ' '; // Add extra space, so an extra space is removed from the Name string as well
		const regnalIndex = name.indexOf(regnalNr);
		name = name.slice(0, regnalIndex) + name.slice(regnalIndex + regnalNr.length);
		console.log({ name });
	}

	return name;
}

function translateRowToCharObj(row = [], charHeader = []) {
	const find = (str) => row[charHeader.findIndex((val) => val.toLowerCase() === str.toLowerCase())];

	return {
		bookNr: bookNrEnum[find('book')],
		name: transformCharname(find('character'), find('regnal no')),
		sex: find('gender') || 'unknown',
		isBastard: bastardNames.includes(find('surname')) ? 1 : 0,
		houseAllegiance: find('surname'),
		title: find('title'),
	};
}

//
// Start programm

const CharactersTable = fs
	.readFileSync('./getData/Characters.csv')
	.toString()
	.split('\n')
	.map((row, i) => mySplit(row, ',', '"', '"').filter((str) => !str.startsWith('\\')));

const ws = fs.createWriteStream('./charData.csv');
ws.write(headerList.map((val) => (Array.isArray(val) ? val[0] : val)).join(','));

const CharHeader = CharactersTable.shift();
for (let rowI = 0; rowI < CharactersTable.length; rowI++) {
	const row = CharactersTable[rowI];
	const char = translateRowToCharObj(row, CharHeader);

	// console.log({ row });

	let out = [];
	headerList.forEach((val, i) => (out[i] = char.hasOwnProperty(val[0]) ? char[val[0]] : val[1]));
	ws.write('\n' + out.join(','));
}
ws.end();
