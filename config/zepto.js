requirejs.config({
	baseUrl: '../',
	shim: {
		zepto: {
			exports: 'Zepto'
		}
	},
	map: {
		'*': {
			'universal/core': 'src/core/zepto'
		}
	},
	paths: {
		u: 'components/mout/src',
		zepto: 'http://cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min'
	}
});