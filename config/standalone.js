requirejs.config({
	baseUrl: '../',
	map: {
		'*': {
			'universal/core': 'src/core/standalone'
		}
	},
	paths: {
		u: 'components/mout/src'
	}
});