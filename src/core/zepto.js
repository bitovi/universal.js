define([ 'zepto',
	'./shared/alias',
	'./shared/curry',
	'u/collection/forEach',
	'u/collection/reduce',
	'u/lang/toArray',
	'u/object/keys',
	'u/object/values',
	'./shared/withContext'
], function ($, alias, curried, each, reduce, toArray, keys, values, withContext) {
	return alias({
		extend: $.extend,
		isArray: $.isArray,
		isEmpty: $.isEmptyObject,
		isPlainObject: $.isPlainObject,
		isFunction: $.isFunction,
		toArray: toArray,
		bind: function(fn, context) {
			return $.proxy(curried(fn, arguments, toArray), context);
		},
		reduce: reduce,
		keys: keys,
		values: values,
		each: each,
		map: withContext($.map, $),
		filter: withContext($.grep, $)
	});
});
