/**
 * @page universal.core
 */
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
		/**
		 * @function u.extend
		 *
		 * extend(object, other...)
		 */
		extend: extend,
		/**
		 * @function u.isArray
		 *
		 * isArray(collection)
		 */
		isArray: isArray,
		/**
		 * @function u.isEmpty
		 *
		 * isEmpty(obj) *alias: isEmptyObject*
		 */
		isEmpty: isEmpty,
		/**
		 * @function u.isPlainObject
		 *
		 * isPlainObject(obj)
		 */
		isPlainObject: isPlainObject,
		/**
		 * @function u.isFunction
		 *
		 * isFunction(fn)
		 */
		isFunction: isFunction,
		/**
		 * @function u.toArray
		 *
		 * toArray(array) *alias: makeArray*
		 */
		toArray: toArray,
		/**
		 * @function u.bind
		 *
		 * bind(fn, context) *alias: proxy*
		 */
		bind: bind,
		/**
		 * @function u.keys
		 *
		 * keys(object)
		 */
		keys: keys,
		/**
		 * @function u.values
		 *
		 * values(object)
		 */
		values: values,
		/**
		 * @function u.each
		 *
		 * each(collection, iterator , context) *alias: forEach*
		 */
		each: each,
		/**
		 * @function u.map
		 *
		 * map(collection, iterator, context)
		 */
		map: map,
		/**
		 * @function u.filter
		 *
		 * filter(collection, iterator, context)
		 */
		filter: filter
	});
});
