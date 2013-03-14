define([ './alias',
	'u/object/mixin',
	'u/lang/isArray',
	'u/lang/isEmpty',
	'u/lang/isPlainObject',
	'u/lang/isFunction',
	'u/lang/toArray',
	'u/function/bind',
	'u/object/keys',
	'u/object/values',
	'u/collection/forEach',
	'u/collection/map',
	'u/collection/filter'
], function(alias, extend, isArray, isEmpty, isPlainObject,
            isFunction, toArray, bind, keys, values, each, map, filter) {
	// each (forEach), map, filter, every, some, reduce
	// extend, isArray, isEmptyObject, isPlainObject, isFunction, makeArray (toArray), proxy (bind)
	return alias({
		// Core stuff
		extend: extend,
		isArray: isArray,
		isEmpty: function(arg) {
			return arg === null || arg === undefined || isEmpty.apply(this, arguments);
		},
		isPlainObject: isPlainObject,
		isFunction: isFunction,
		toArray: toArray,
		bind: bind,
		keys: keys,
		values: values,
		// Collection functions (ES5 Arrays)
		each: each,
		map: map,
		filter: filter
	});
});
