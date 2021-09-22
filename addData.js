const writeData = require('./writeData');

// ['dies', 'name', 'sex', 'age', 'isHighBorn', 'isWarg', 'isMagicUser', 'isBastard', 'isPOV', 'wasPOV', 'hasValyrianSteel', 'appears', 'height'];

// TODO: Add more than dummy data

writeData('./test')
	.add({ dies: true, name: 'Robert Baratheon', sex: 'm', age: 36, isHighBorn: true, appears: true, height: 6.5 })
	.add({ dies: true, name: 'Robert Baratheon', sex: 'm', age: 36, isHighBorn: true, appears: true, height: 6.5 })
	.close();
