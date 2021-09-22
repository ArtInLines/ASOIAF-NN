const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const mySplit = require('../util/mySplit');
const joinArrsToObj = require('../util/joinArrsToObj');

async function main() {
	const oldDataTable = fs.readFileSync(path.resolve(__dirname, 'charData.csv')).toString().split('\n'); // Leave rows as string, since we loop over every row anyways

	const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
	const page = await browser.newPage();

	const headerArr = mySplit(oldDataTable.shift(), ',', '"');
	let newDataStr = '';
	while (oldDataTable.length > 0) {
		// Get row (& remove it from table, to safe space) and transform it to an Object
		let row = oldDataTable.shift();
		row = mySplit(row, ',', '"');
		row = joinArrsToObj(headerArr, row);

		// Go to page corresponding to the character
		await goToCharPage(row.name, page);
	}
}

/**
 * @param {String} name Name of the Character
 * @param {puppeteer.Page} page Page instance
 * @param {String} [baseURL] Base URL. Defaults to the A wiki of Ice and Fire website
 */
async function goToCharPage(name = '', page, baseURL = 'https://www.awoiaf.westeros.org/index.php/') {
	const testURL = baseURL + name.replace(' ', '_');
	try {
		await page.goto(testURL);
		return;
	} catch (err) {}
}
