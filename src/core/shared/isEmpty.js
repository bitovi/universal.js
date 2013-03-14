define([ 'u/lang/isEmpty' ], function(isEmpty) {
	return function(arg) {
		// `null` and `undefined` are empty, too
		return arg === null || arg === undefined || isEmpty.apply(this, arguments);
	}
});
