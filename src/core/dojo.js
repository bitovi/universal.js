define([ 'dojo', './shared/alias',
	'./shared/isEmpty',
	'./shared/curry',
	'u/object/forOwn',
	'u/lang/isPlainObject',
	'u/object/keys',
	'u/object/values'
], function (dojo, alias, isEmpty, curried, forOwn, isPlainObject, keys, values) {
	var toArray = function (arr) {
		var array = [];
		dojo.forEach(arr, function (item) {
			array.push(item)
		});
		return array;
	};

	return alias({
		extend: function (first) {
			if (first === true) {
				var args = can.makeArray(arguments);
				args.shift();
				return dojo.mixin.apply(dojo, args)
			}
			return dojo.mixin.apply(dojo, arguments)
		},
		isArray: dojo.isArray,
		isEmpty: isEmpty,
		isPlainObject: isPlainObject,
		isFunction: function (f) {
			return dojo.isFunction(f);
		},
		toArray: toArray,
		bind: function (fn, context) {
			return dojo.hitch(context, curried(fn, arguments, toArray));
		},
		keys: keys,
		values: values,
		each: function (obj) {
			if (dojo.isArray(obj)) {
				return dojo.forEach.apply(this, arguments);
			}
			return forOwn.apply(this, arguments);
		},
		map: dojo.map,
		filter: dojo.filter
	});
});
