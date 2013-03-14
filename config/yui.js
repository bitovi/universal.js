requirejs.config({
	baseUrl: '../',
	shim: {
		yui: {
			exports: 'YUI'
		}
	},
	map: {
		'*': {
			'universal/core': 'src/core/yui'
		}
	},
	paths: {
		u: 'components/mout/src',
		yui: 'http://yui.yahooapis.com/3.9.0/build/yui/yui-min'
	}
});