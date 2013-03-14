define([ 'zepto',
	'./shared/alias',
	'u/collection/forEach',
	'u/lang/toArray',
	'u/object/keys',
	'u/object/values',
	'./shared/withContext'
], function ($, alias, each, toArray, keys, values, withContext) {
	return alias({
		extend: $.extend,
		isArray: $.isArray,
		isEmpty: $.isEmptyObject,
		isPlainObject: $.isPlainObject,
		isFunction: $.isFunction,
		toArray: toArray,
		bind: function(fn, context) {
			var args = toArray(arguments),
				sliced = args.slice(2),
				curried = sliced.length ? function() {
					return fn.apply(this, sliced.concat(toArray(arguments)));
				} : fn;
			return $.proxy(curried, context);
		},
		keys: keys,
		values: values,
		each: each,
		map: withContext($.map, $),
		filter: withContext($.grep, $)
	});
});
