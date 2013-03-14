requirejs.config({
	baseUrl: '../',
	map: {
		'*': {
			'universal/core': 'src/core/jquery'
		}
	},
	paths: {
		u: 'components/mout/src',
		jquery: 'http://code.jquery.com/jquery-1.9.1.min'
	}
});