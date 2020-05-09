

function load(cb)	{
	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


	loadDatasets(fEnd);


}

//==================================================================
//
//==================================================================

function loadDatasets(cb)	{
	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };

	M.dataset={};
	M.sources={};

	d3.queue()
		.defer(d3.tsv, '_data/names.txt')
		.defer(d3.tsv, '_data/vampire.txt')
		.defer(d3.tsv, '_data/birds.tsv')
		.defer(d3.tsv, '_data/cartoon.txt')
		.defer(d3.tsv, '_data/nato.txt')
		.defer(d3.tsv, '_data/nsa.txt')
		.defer(d3.tsv, '_data/numbers.tsv')
		.defer(d3.tsv, '_data/fraternities.tsv')
		.defer(d3.tsv, '_data/minerals.txt')
		.defer(d3.tsv, '_data/drugs.txt')
		.await(function(err, grk, vamp, bds, ctn, nato, nsa, numbers, frat, minerals, drugs)	{


			if (err) throw(err);

			var data=[], key;

			//console.log('frat', frat);
			key = 'Fraternities / Sororities';
			var frats=[];
			frat.forEach(function(d){
				d.source=key;
				(d.Organization||'').replace(/\s*\(.*?\)\s*/,'').split(/\s+/).forEach(function(k){
					frats.push({
						source:key,
						type:d.type,
						name: k,
						full_name: d.Organization,
						full_name_symbol: d.Symbol,
						description: d.affiliation,
					});
				});
			});
			data = data.concat(frats);
			M.sources[key] = 'https://en.wikipedia.org/wiki/List_of_social_fraternities_and_sororities';


			key = 'Vampires';
			data = data.concat(vamp);
			M.sources[key] = 'http://www.gods-and-monsters.com/vampire-names.html';

			key = 'Numbers';
			numbers.forEach(function(d){
				d.source = key;
			});
			data = data.concat(numbers);

			key = 'Fake NSA Codenames';
			var fakensa=[];
			nsa.forEach(function(d){
				[d.name1,d.name2].forEach(function(k){
					fakensa.push({
						name:k,
						source:key,
						description:d.name1+d.name2
					});
				});
			});
			data = data.concat(fakensa);
			M.sources[key] = 'https://github.com/divergentdave/nsa-o-matic';

			key = 'NATO Phonetic Alphabet';
			nato.forEach(function(d){
				d.source = key;
			});
			data = data.concat(nato);
			M.sources[key] = 'https://en.wikipedia.org/wiki/NATO_phonetic_alphabet';


			key = 'Birds';
			var birds=[];
			bds.forEach(function(d){
				d.name.split(/[\s|\-]+/i).forEach(function(k){
					if (k.match(/\w+/) && k.length>2)	{
						birds.push({
							name:k,
							description:d.name,
							source:key,
							type:d.species
						});
					}
				});
			});
			data = data.concat(birds);


			//--------------
			// Minerals
			//--------------
			key = 'Minerals';
			M.sources[key] = 'https://en.wikipedia.org/wiki/List_of_minerals';
			var mines=[];
			minerals.forEach(function(d){
				mines.push({
					name:d.name,
					description:d.description,
					source:key,
				});
			});
			data = data.concat(mines);


			//--------------
			// drugs
			//--------------
			key = 'Drugs';
			M.sources[key] = 'https://casapalmera.com/blog/top-20-drugs-and-their-street-names/';
			var mines=[];
			drugs.forEach(function(d){
				mines.push({
					name:d.name,
					description:d.description,
					source:key,
				});
			});
			data = data.concat(mines);


			//--------------
			// cartoon
			//--------------
			var cartoon=[];
			ctn.forEach(function(d){
				d.name.split(/\s+/i).forEach(function(k){
					if (k.match(/\w+/) && k.length>2 && k!='and' && k!='the')	{
						k = k.replace(/\W+/g,'');
						cartoon.push({
							name:k,
							description:d.name,
							source:'cartoon'
						});
					}
				});
			});
			data = data.concat(cartoon);

			data = data.concat(grk);

			data.forEach(function(d){
				if (d.source=='Animals')	{
					if (!d.name && d.description)	{
						d.name = d.description;
						delete d.description;
					}
				}
				if (d.source=='Greek')	{
					d.source = 'Greek Mythology';
				}
				d.name = d.name.replace(/\'s/i,'');
				d.name = d.name.replace(/\,/,'');
				d.name = d.name.replace(/\./,'');
				d.name = d.name.replace(/\W+/,'');
			});
			M.sources['Greek Mythology']='https://en.wikipedia.org/wiki/List_of_Greek_mythological_figures';



			d3.nest()
				.key(function(d){ return d.source})
				.entries(data)
				.forEach(function(d){
					M.dataset[d.key] = d.values;
				});


			//--------------
			//
			//--------------

			M.sets = d3.entries(M.dataset).map(function(d){
				return {
					key:d.key
				}
			});

			if (M.current.set)	{
				//dbg&&console.log('M.current.set', M.current.set);
				var set = M.current.set.toLowerCase();
				M.sets.forEach(function(d){
					d.active = set == d.key.toLowerCase();
				});
			}else	{
				M.sets.forEach(function(d){
					d.active = true;
				});
			}



			loadNames(fEnd);

		});

}



//==================================================================
//
//==================================================================
function loadNames(cb)	{
	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };

	if (!M.data) M.data={};
	M.data.names=[];

	for (var i in M.dataset)	{
		M.data.names = M.data.names.concat(M.dataset[i].filter(function(d){ return d.name}));
	}

	M.data.names.forEach(function(d,i){
		d.idx = i;
		d.name = d.name.replace(/^\s*the\s+/i,'')
	});

	fEnd();
}
