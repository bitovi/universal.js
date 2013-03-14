define([ 'jquery',
	'./shared/alias',
	'./shared/withContext',
	'u/collection/forEach',
	'u/object/keys',
	'u/object/values'
], function ($, alias, withContext, each, keys, values) {
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
		map: withContext($.map, $),
		filter: withContext($.grep, $)
	});
});
