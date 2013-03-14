define([ './shared/alias',
	'u/object/mixin',
	'u/lang/isArray',
	'./shared/isEmpty',
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

	return alias({
		extend: extend,
		isArray: isArray,
		isEmpty: isEmpty,
		isPlainObject: isPlainObject,
		isFunction: isFunction,
		toArray: toArray,
		bind: bind,
		keys: keys,
		values: values,
		each: each,
		map: map,
		filter: filter
	});
});
