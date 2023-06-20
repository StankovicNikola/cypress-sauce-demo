// 'npm install -D del' - https://www.npmjs.com/package/del
const del = require('del');

module.exports = (on, config) => {
	require('cypress-mochawesome-reporter/plugin')(on);

	on('after:spec', (spec, results) => {
		if (results.stats.failures === 0 && results.video) {
			// `del()` returns a promise, so it's important to return it to ensure
			// deleting the video is finished before moving on
			return del(results.video);
		}
	});
};
