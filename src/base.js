var provide = function(namespace) {
	var subspaces = namespace.split('.');
	var object = window;
	subspaces.forEach(function(subspace) {
		object[subspace] = object[subspace] || {};
		object = object[subspace];
	});
};

var require = function(namespace) {
	var subspaces = namespace.split('.');
	var object = window;
	subspaces.forEach(function(subspace) {
		object = object[subspace];
		if (!object) {
			throw namespace + ' required but ' + subspace + ' not provided.';
		}
	});
};
