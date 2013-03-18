define(function() {
	return function(u) {
		return u.extend(u, {
			isEmptyObject: u.isEmpty,
			makeArray: u.toArray,
			proxy: u.bind,
			forEach: u.each
		});
	}
});
