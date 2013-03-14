define(function() {
	return function (fn, $) {
		return function (data, iterator, context) {
			if (context) {
				// Add the context by binding the iterator function
				iterator = $.proxy(iterator, context);
			}
			return fn.call(this, data || [], iterator);
		}
	}
});
