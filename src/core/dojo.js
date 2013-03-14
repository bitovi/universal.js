define([ 'dojo', './shared/alias',
	'./shared/isEmpty',
	'u/object/forOwn',
	'u/lang/isPlainObject',
	'u/object/keys',
	'u/object/values'
], function (dojo, alias, isEmpty, forOwn, isPlainObject, keys, values) {
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
			var args = toArray(arguments),
				sliced = args.slice(2),
				curried = sliced.length ? function () {
					return fn.apply(this, sliced.concat(toArray(arguments)));
				} : fn;

			return dojo.hitch(context, curried);
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
