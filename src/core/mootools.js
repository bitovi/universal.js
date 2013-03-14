define([ 'mootools',
	'./shared/alias',
	'./shared/isEmpty',
	'u/lang/isPlainObject'
], function (moo, alias, isEmpty, isPlainObject) {
	var toArray = function (arr) {
			var result = Array.from(arr);
			// Array.from returns the same array if it was already
			// there. The expected behaviour is to get a cloned array
			if (arr === result) {
				return result.slice(0);
			}
			return result;
		},
		makeFunction = function (fn, fallback) {
			return function () {
				var args = toArray(arguments),
					obj = args.shift();

				if (obj === null || obj === undefined) {
					return [];
				}

				return fn.apply(obj, args);
			}
		};

	return alias({
		extend: Object.merge,
		isArray: function (arr) {
			return instanceOf(arr, Array);
		},
		isEmpty: isEmpty,
		isPlainObject: isPlainObject,
		isFunction: function (fn) {
			return instanceOf(fn, Function);
		},
		toArray: toArray,
		bind: function (fn, context) {
			var args = toArray(arguments),
				sliced = args.slice(2),
				curried = sliced.length ? function () {
					return fn.apply(this, sliced.concat(toArray(arguments)));
				} : fn;

			return Function.prototype.bind.call(curried, context)
		},
		keys: Object.keys,
		values: Object.values,
		each: function (collection) {
			if (instanceOf(collection, Array)) {
				return Array.each.apply(this, arguments);
			}
			return Object.each.apply(this, arguments);
		},
		map: makeFunction(Array.prototype.map),
		filter: makeFunction(Array.prototype.filter)
	});
});