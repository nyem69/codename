

var version=1,
		reqs='layout,load,prep,viz,main'.split(',').concat([
		]);

var required = reqs.map(function(d){
	return version+'/'+d+'.js'
});

requirejs(required, function() {
	main();
});




