define([ 'mootools',
	'./alias',
	'u/lang/isEmpty',
	'u/lang/isPlainObject'
], function (moo, alias, isEmpty, isPlainObject) {
	// each (forEach), map, filter, every, some, reduce
	// extend, isArray, isEmptyObject, isPlainObject, isFunction, makeArray (toArray), proxy (bind)
	var makeFunction = function (fn, fallback) {
			return function () {
				var args = toArray(arguments),
					obj = args.shift();

				if (obj === null || obj === undefined && fallback) {
					return fallback();
				}

				return fn.apply(obj, args);
			}
		};

	return alias({
		// Core stuff
		extend: Object.merge,
		isArray: function (arr) {
			return instanceOf(arr, Array);
		},
		isEmpty: function (arg) {
			return arg === null || arg === undefined || isEmpty.apply(this, arguments);
		},
		isPlainObject: isPlainObject,
		isFunction: function (fn) {
			return instanceOf(fn, Function);
		},
		toArray: function (arr) {
			var result = Array.from(arr);
			// If we get the same array, clone it
			if (arr === result) {
				return result.slice(0);
			}
			return result;
		},
		bind: makeFunction(Function.prototype.bind),
		keys: Object.keys,
		values: Object.values,
		// Collection functions (ES5 Arrays)
		each: function (collection) {
			if (instanceOf(collection, Array)) {
				return Array.each.apply(this, arguments);
			}
			return Object.each.apply(this, arguments);
		},
		map: makeFunction(Array.prototype.map, function () {
			return [];
		}),
		filter: makeFunction(Array.prototype.filter)
	});
});