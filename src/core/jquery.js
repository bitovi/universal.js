define([ 'jquery',
	'./shared/alias',
	'./shared/withContext',
	'u/collection/forEach',
	'u/collection/reduce',
	'u/object/keys',
	'u/object/values'
], function ($, alias, withContext, each, reduce, keys, values) {
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
		reduce: reduce,
		map: withContext($.map, $),
		filter: withContext($.grep, $)
	});
});
