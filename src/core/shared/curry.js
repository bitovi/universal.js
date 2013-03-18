define(function() {
	return function(fn, origArgs, toArray) {
		var args = toArray(origArgs),
			sliced = args.slice(2);

		if(sliced.length) {
			return function () {
				return fn.apply(this, sliced.concat(toArray(arguments)));
			}
		}

		return fn;
	}
});
