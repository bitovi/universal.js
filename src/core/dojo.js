define([ 'dojo', './shared/alias',
	'./shared/isEmpty',
	'u/lang/isPlainObject',
	'u/object/keys',
	'u/object/values'
], function(dojo, alias, isEmpty, isPlainObject, keys, values) {

	return alias({
		extend: function( first ) {
			if ( first === true ) {
				var args = can.makeArray(arguments);
				args.shift();
				return dojo.mixin.apply(dojo, args)
			}
			return dojo.mixin.apply(dojo, arguments)
		},
		isArray: dojo.isArray,
		isEmpty: isEmpty,
		isPlainObject: isPlainObject,
		isFunction: function( f ) {
			return dojo.isFunction(f);
		},
		toArray: function( arr ) {
			var array = [];
			dojo.forEach(arr, function( item ) {
				array.push(item)
			});
			return array;
		},
		bind: function( func, context ) {
			return dojo.hitch(context, func)
		},
		keys: keys,
		values: values,
		each: dojo.forEach,
		map: dojo.map,
		filter: dojo.filter
	});
});
