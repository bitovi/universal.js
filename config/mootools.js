requirejs.config({
	baseUrl: '../',
	map: {
		'*': {
			'universal/core': 'src/core/mootools'
		}
	},
	paths: {
		u: 'components/mout/src',
		mootools: 'http://ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed'
	}
});