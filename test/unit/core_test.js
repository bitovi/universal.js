define([ 'universal/core' ], function(u) {
	module("universal/core");

	test("extend", function() {
		var result;
		equal(u.extend({}, {a:'b'}).a, 'b', 'can extend an object with the attributes of another');
		equal(u.extend({a:'x'}, {a:'b'}).a, 'b', 'properties in source override destination');
		equal(u.extend({x:'x'}, {a:'b'}).x, 'x', "properties not in source don't get overriden");
		result = u.extend({x:'x'}, {a:'a'}, {b:'b'});
		deepEqual(result, {x:'x', a:'a', b:'b'}, 'can extend from multiple source objects');
		result = u.extend({x:'x'}, {a:'a', x:2}, {a:'b'});
		deepEqual(result, {x:2, a:'b'}, 'extending from multiple source objects last property trumps');

		/* TODO
		result = u.extend({}, {a: void 0, b: null});
		equal(u.keys(result).join(''), 'ab', 'extend does not copy undefined values');
		*/

		try {
			result = {};
			u.extend(result, null, undefined, {a:1});
		} catch(ex) {}

		equal(result.a, 1, 'should not error on `null` or `undefined` sources');
	});

	test("isArray", function() {
		ok(!u.isArray(undefined), 'undefined vars are not arrays');
		ok(!u.isArray(arguments), 'the arguments object is not an array');
		ok(u.isArray([1, 2, 3]), 'but arrays are');
	});

	test("isEmpty", function() {
		ok(true, u.isEmptyObject({}), "isEmptyObject on empty object literal" );
		ok(!u.isEmptyObject({a:1}), "isEmptyObject on non-empty object literal" );

		ok(!u.isEmpty([1]), '[1] is not empty');
		ok(u.isEmpty([]), '[] is empty');
		ok(!u.isEmpty({one : 1}), '{one : 1} is not empty');
		ok(u.isEmpty({}), '{} is empty');
		ok(u.isEmpty(new RegExp('')), 'objects with prototype properties are empty');
		ok(u.isEmpty(null), 'null is empty');
		ok(u.isEmpty(), 'undefined is empty');
		ok(u.isEmpty(''), 'the empty string is empty');
		ok(!u.isEmpty('moe'), 'but other strings are not');

		var obj = {one : 1};
		delete obj.one;
		ok(u.isEmpty(obj), 'deleting all the keys from an object empties it');
	});

	test("isPlainObject", function() {
		var pass,
			fn = function() {};

		// The use case that we want to match
		ok( u.isPlainObject({}), "{}" );

		// Not objects shouldn't be matched
		ok( !u.isPlainObject(""), "string" );
		ok( !u.isPlainObject(0) && !u.isPlainObject(1), "number" );
		ok( !u.isPlainObject(true) && !u.isPlainObject(false), "boolean" );
		ok( !u.isPlainObject(null), "null" );
		ok( !u.isPlainObject(undefined), "undefined" );

		// Arrays shouldn't be matched
		ok( !u.isPlainObject([]), "array" );

		// Instantiated objects shouldn't be matched
		ok( !u.isPlainObject(new Date()), "new Date" );

		// Functions shouldn't be matched
		ok( !u.isPlainObject(fn), "fn" );

		// Again, instantiated objects shouldn't be matched
		ok( !u.isPlainObject(new fn()), "new fn (no methods)" );

		// Makes the function a little more realistic
		// (and harder to detect, incidentally)
		fn.prototype["someMethod"] = function(){};

		// Again, instantiated objects shouldn't be matched
		ok( !u.isPlainObject(new fn()), "new fn" );

		// DOM Element
		ok( !u.isPlainObject( document.createElement("div") ), "DOM Element" );

		// Window
		ok( !u.isPlainObject( window ), "window" );

		pass = false;
		try {
			u.isPlainObject( window.location );
			pass = true;
		} catch ( e ) {}
		ok( pass, "Does not throw exceptions on host objects" );
	});

	test("isFunction", function() {
		ok(!u.isFunction(undefined), 'undefined vars are not functions');
		ok(!u.isFunction([1, 2, 3]), 'arrays are not functions');
		ok(!u.isFunction('moe'), 'strings are not functions');
		ok(u.isFunction(u.isFunction), 'but functions are');
		ok(u.isFunction(function(){}), 'even anonymous ones');
	});

	test('toArray', function() {
		ok(!u.isArray(arguments), 'arguments object is not an array');
		ok(u.isArray(u.toArray(arguments)), 'arguments object converted into array');
		var a = [1,2,3];
		ok(u.toArray(a) !== a, 'array is cloned');
		equal(u.toArray(a).join(', '), '1, 2, 3', 'cloned array contains same elements');

		// test in IE < 9
		try {
			var actual = u.toArray(document.childNodes);
		} catch(ex) { }

		ok(u.isArray(actual), 'should not throw converting a node list');
	});

	test("bind", function() {
		var context = {name : 'moe'};
		var func = function(arg) { return "name: " + (this.name || arg); };
		var bound = u.bind(func, context);
		equal(bound(), 'name: moe', 'can bind a function to a context');

		bound = u.bind(func, null, 'curly');
		equal(bound(), 'name: curly', 'can bind without specifying a context');

		func = function(salutation, name) { return salutation + ': ' + name; };
		func = u.bind(func, this, 'hello');
		equal(func('moe'), 'hello: moe', 'the function was partially applied in advance');

		func = u.bind(func, this, 'curly');
		equal(func(), 'hello: curly', 'the function was completely applied in advance');

		func = function(salutation, firstname, lastname) { return salutation + ': ' + firstname + ' ' + lastname; };
		func = u.bind(func, this, 'hello', 'moe', 'curly');
		equal(func(), 'hello: moe curly', 'the function was partially applied in advance and can accept multiple arguments');

		/* TODO
		func = function(context, message) { equal(this, context, message); };
		u.bind(func, 0, 0, 'can bind a function to `0`')();
		u.bind(func, '', '', 'can bind a function to an empty string')();
		u.bind(func, false, false, 'can bind a function to `false`')();

		// These tests are only meaningful when using a browser without a native bind function
		// To test this with a modern browser, set underscore's nativeBind to undefined
		var F = function () { return this; };
		var Boundf = u.bind(F, {hello: "moe curly"});
		var newBoundf = new Boundf();
		equal(newBoundf.hello, undefined, "function should not be bound to the context, to comply with ECMAScript 5");
		equal(Boundf().hello, "moe curly", "When called without the new operator, it's OK to be bound to the context");
		ok(newBoundf instanceof F, "a bound instance is an instance of the original function");
		*/
	});

	test("keys", function() {
		equal(u.keys({one : 1, two : 2}).join(', '), 'one, two', 'can extract the keys from an object');
		// the test above is not safe because it relies on for-in enumeration order
		var a = []; a[1] = 0;
		equal(u.keys(a).join(', '), '1', 'is not fooled by sparse arrays; see issue #95');
		raises(function() { u.keys(null); }, TypeError, 'throws an error for `null` values');
		raises(function() { u.keys(void 0); }, TypeError, 'throws an error for `undefined` values');
		raises(function() { u.keys(1); }, TypeError, 'throws an error for number primitives');
		raises(function() { u.keys('a'); }, TypeError, 'throws an error for string primitives');
		raises(function() { u.keys(true); }, TypeError, 'throws an error for boolean primitives');
	});

	test("values", function() {
		equal(u.values({one: 1, two: 2}).join(', '), '1, 2', 'can extract the values from an object');
		equal(u.values({one: 1, two: 2, length: 3}).join(', '), '1, 2, 3', '... even when one of them is "length"');
	});

	test("each", function() {
		u.each([1, 2, 3], function(num, i) {
			equal(num, i + 1, 'each iterators provide value and iteration count');
		});

		var answers = [];
		u.each([1, 2, 3], function(num){ answers.push(num * this.multiplier);}, {multiplier : 5});
		equal(answers.join(', '), '5, 10, 15', 'context object property accessed');

		answers = [];
		u.forEach([1, 2, 3], function(num){ answers.push(num); });
		equal(answers.join(', '), '1, 2, 3', 'aliased as "forEach"');

		answers = [];
		var obj = {one : 1, two : 2, three : 3};
		obj.constructor.prototype.four = 4;
		u.each(obj, function(value, key){ answers.push(key); });
		equal(answers.join(", "), 'one, two, three', 'iterating over objects works, and ignores the object prototype.');
		delete obj.constructor.prototype.four;

		var answer = null;
		u.each([1, 2, 3], function(num, index, arr){ answer = true; });
		ok(answer, 'can reference the original collection from inside the iterator');

		answers = 0;
		u.each(null, function(){ ++answers; });
		equal(answers, 0, 'handles a null properly');
	});

	test('map', function() {
		var doubled = u.map([1, 2, 3], function(num){ return num * 2; });
		equal(doubled.join(', '), '2, 4, 6', 'doubled numbers');

		var tripled = u.map([1, 2, 3], function(num){ return num * this.multiplier; }, {multiplier : 3});
		equal(tripled.join(', '), '3, 6, 9', 'tripled numbers with context');

		var ifnull = u.map(null, function(){});
		ok(u.isArray(ifnull) && ifnull.length === 0, 'handles a null properly');
	});

	test('filter', function() {
		var evens = u.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
		equal(evens.join(', '), '2, 4, 6', 'selected each even number');

		evens = u.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
		equal(evens.join(', '), '2, 4, 6', 'aliased as "filter"');
	});
});
