define([ 'yui', './shared/alias',
	'u/lang/isPlainObject',
	'u/function/bind',
	'u/collection/map',
	'u/collection/filter'
], function (YUI, alias, isPlainObject, bind, map, filter) {

	var Y = YUI().use('*'),
		each = function (obj) {
			if (Y.Lang.isArray(obj)) {
				return Y.Array.each.apply(this, arguments);
			}
			return Y.Object.each.apply(this, arguments);
		};

	return alias({
		extend: function (first) {
			var deep = first === true ? 1 : 0,
				target = arguments[deep];

			each(arguments, function(arg) {
				if(arg && arg !== true) {
					Y.mix(target, arg, true, null, null, !!deep);
				}
			});

			return target;
		},
		isArray: Y.Lang.isArray,
		isEmpty: Y.Object.isEmpty,
		isPlainObject: isPlainObject,
		isFunction: Y.Lang.isFunction,
		toArray: function (arr) {
			if (!arr) {
				return [];
			}
			return Y.Array(arr);
		},
		bind: bind,
		keys: Y.Object.keys,
		values: Y.Object.values,
		each: each,
		map: map,
		filter: filter
	});
});
