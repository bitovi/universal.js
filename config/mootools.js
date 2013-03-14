requirejs.config({
	map: {
		'*': {
			'universal/core': 'src/core/mootools',
			'mootools': 'http://ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed.js'
		}
	},
	paths: {
		u: 'components/mout/src'
	}
});