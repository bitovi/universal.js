requirejs.config({
	map: {
		'*': {
			'universal/core': 'src/core/jquery',
			'jquery': 'http://code.jquery.com/jquery-1.9.1.min.js'
		}
	},
	paths: {
		u: 'components/mout/src'
	}
});