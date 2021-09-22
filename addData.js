const puppeteer = require('puppeteer');
const writeData = require('./writeData');

// ['dies', 'name', 'sex', 'age', 'isHighBorn', 'isWarg', 'isMagicUser', 'isBastard', 'isPOV', 'wasPOV', 'hasValyrianSteel', 'appears', 'height'];

// TODO: Add more than dummy data

writeData('./test')
	.add({ dies: true, name: 'Robert Baratheon', sex: 'm', age: 36, isHighBorn: true, appears: true, height: 6.5 })
	.add({ dies: true, name: 'Robert Baratheon', sex: 'm', age: 36, isHighBorn: true, appears: true, height: 6.5 })
	.close();

async function main(charNames = []) {
	const BASE_URL = 'https://awoiaf.westeros.org/index.php/';
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	for (let i = 0; i < charNames.length; i++) {
		const url = BASE_URL + charNames[i];
		await page.goto(url);

		// Get Data from Character Page
	}

	await browser.close();
}
