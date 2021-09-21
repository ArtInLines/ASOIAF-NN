const tf = require('@tensorflow/tfjs');

const a = tf.tensor([
	[1, 2],
	[3, 4],
]);
console.log(tf.getBackend());
