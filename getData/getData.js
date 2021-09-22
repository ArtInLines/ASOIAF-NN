const fs = require('fs');

const headerList = require('../util/headerList');
const bookNrEnum = require('../util/bookNrEnum');

const bastardNames = ['Snow', 'Waters', 'Sand', 'Pyke', 'Flowers', 'Rivers', 'Storm', 'Stone', 'Hill'];
const removeBeginFromNameList = ['"', 'Lord', 'Lady', 'Ser', 'King', 'Queen', 'Prince', 'Princess', 'Magister', 'Maester'];
const removeEndFromNameList = ['"'];

const mySplit = require('../util/mySplit');

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
(() => {
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
})();
