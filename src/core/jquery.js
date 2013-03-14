define([ 'jquery',
	'./alias',
	'u/collection/forEach',
	'u/object/keys',
	'u/object/values'
], function (jquery, alias, each, keys, values) {
	var $ = jQuery,
		withContext = function(fn) {
			return function(data, iterator, context) {
				if (context) {
					// Add the context by binding the iterator function
					iterator = $.proxy(iterator, context);
				}
				return fn.call(this, data || [], iterator);
			}
		};

	return alias({
		extend: $.extend,
		isArray: $.isArray,
		isEmpty: $.isEmptyObject,
		isPlainObject: $.isPlainObject,
		isFunction: $.isFunction,
		toArray: $.makeArray,
		bind: $.proxy,
		keys: keys,
		values: values,
		each: each,
		map: withContext($.map),
		filter: withContext($.grep)
	});
});
