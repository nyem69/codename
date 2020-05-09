

function viz(cb)	{
	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


	vizLayout();
	vizList(M.data.names);


	fEnd();

}


//==================================================================
//
//==================================================================

function vizLayout()	{
	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


	d3.select('.content-area')
	.call(function(sel)	{


		sel.append('div').attr('class','row flex-items-xs-center container-head')
			.call(function(sel)	{

				sel
					//.append('div')
					.append('h1')
					.html('CodeName Generator');


			});

		sel.append('div').attr('class','row flex-items-xs-center container-subhead')
			.call(function(sel)	{

				sel
					.append('div')
					.styles({
						color:'#333',
						'font-size':'120%',
					})
					.html('Find inspiration for naming your projects, apps, codewords, etc');
					//.html('Create your own app name, codename, codeword or project name using the generator');

			});

		sel.append('div').attr('class','row flex-items-xs-center flex-items-xs-top container-dataset');
		sel.append('hr');

//		sel.append('div').attr('class','row flex-items-xs-center flex-items-xs-top container-codename');
//		sel.append('hr');

//		sel.append('hr');


		sel.append('div').attr('class','row flex-items-xs-center flex-items-xs-top')
		.call(function(sel)	{

			sel.append('div').attr('class','col-xs-12	col-sm-5 col-md-4	col-lg-3 col-xl-2')
				.append('div').attr('class','row flex-items-xs-center flex-items-xs-top panel-list');

//			sel.append('div').attr('class','col-xs-12	col-sm-7 col-md-8 col-lg-9 col-xl-10')
			sel.append('div').attr('class','col-xs-12	col-sm-2 col-md-4 col-lg-6 col-xl-8')
			.call(function(sel)	{

				sel.append('div').attr('class','row flex-items-xs-center flex-items-xs-top container-form');
				sel.append('div').attr('class','row flex-items-xs-center flex-items-xs-top container-list');


			});

			sel.append('div').attr('class','col-xs-12	col-sm-5 col-md-4	col-lg-3 col-xl-2')
				.append('div').attr('class','row flex-items-xs-center flex-items-xs-top panel-list');


		});
	});


	vizDataset();
	vizForm();
	vizCodename();


	fEnd();

}


//==================================================================
//
//==================================================================
function vizDataset(cb)	{
	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


//	var datasets = [];
//	d3.entries(M.dataset).forEach(function(d){
//		datasets.push(d.key);
//	});

	d3.select('.container-dataset')
//		.append('div').attr('class','btn-group')
		.selectAll('button').data(d3.entries(M.dataset), function(d){ return d.key})
			.enter()
				.append('button')
					.attr('class',function(d){
						var active = M.sets.find(function(k){ return d.key==k.key }).active;
						return 'btn '+(active?'btn-primary':'')+' btn-sm dataset-select'
					})
					.styles({
						margin:'1px',
					})
					.on('click', function(d){

						var tf = !d3.select(this).classed('btn-primary');
						d3.select(this).classed('btn-primary', tf);

						if (M.timer) window.clearTimeout(M.timer);
						M.timer = window.setTimeout(function(){
							refreshNames();
							vizFilter();
						},100);

					})
					.html(function(d){ return d.key });


	refreshNames();

	function refreshNames()	{

		if (!M.data) M.data={};
		M.data.names=[];
		d3.selectAll('.dataset-select.btn-primary')
		.data().forEach(function(d){

			//console.log('d', d);

			M.data.names = M.data.names.concat(d.value.filter(function(d){ return d.name}));
		});

	}




	fEnd();
}


//==================================================================
//
//==================================================================

function vizForm()	{

	d3.select('.container-form')
//		.append('form')
			.append('section').attr('class','form-block')
			.call(function(sel)	{

				sel.append('div').attr('class','form-group row')
					.call(function(sel)	{

						sel.append('div').attr('class','col-xs-6')
							.styles({
								'text-align':'right',
								'vertical-align':'bottom',
								'padding-top':'20px',
								'font-size':'20px',
							})
							.append('input')
								.attrs({
									type:'text',
									class:'form-control q',
									placeholder:'search...',
								})
								.styles({
									width:'100%',
								})
								.on('keyup', function(){

									vizFilter();

								});

						sel.append('div').attr('class','col-xs-6')
							.call(function(sel)	{

//								sel.append('button').attr('class','btn btn-primary')
//									.html('Go');

								sel.append('button').attr('class','btn btn-primary')
									.on('click', function(){
										d3.select('.q').property('value','');
										vizFilter();
									})
									.html('Reset');

							});

					});

			});


}

//==================================================================
//
//==================================================================

function vizFilter()	{
	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


	var q = d3.select('.q').property('value');
//	console.log('q', q);


	if (q)	{
		var regex = new RegExp( q, 'ig' );
		vizList(
			M.data.names
				.filter(function(d){ return d.name.match(regex)||(d.description&&d.description.match(regex)) })
		);
	}else	{
		vizList(
			M.data.names
		);
	}


	vizCodename();

	fEnd();
}

//==================================================================
//
//==================================================================

function vizList(data)	{
	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };



	var nest = d3.nest()
		.key(function(d){ return d.name })
    .rollup(function(d){return d3.sum(d, function(g){return 1})})
		.entries(
			data
				.filter(function(d){ return d.name })
		);

	nest.sort(d3.comparator().order(d3.ascending, function(d){ return d.key }));

	var dat = d3.select('.container-list')
		.styles({
			height:null,
//			'min-height':(innerHeight - 60 - h)+'px',
			overflow:'auto',
		})
		.selectAll('button')
		.data(nest, function(d){ return d.key });

	dat.exit().remove();
	dat.enter()
		.append('button').attr('class','btn btn-primary')
			.styles({
				display:'inline-block',
				margin:'1px',
//				padding:'5px',
			})
			.on('click', vizDetail)
			.html(function(d){ return d.key });

//
//	window.setTimeout(function(){
//
//
//		var h1 = +d3.select('.container-form').style('height').replace(/\D+/g,''),
//				h2 = +d3.select('.container-codename').style('height').replace(/\D+/g,''),
//				h3 = +d3.select('.container-dataset').style('height').replace(/\D+/g,''),
//				h = h1 + h2 + h3,
//				availHeight = (innerHeight - 60 - h);
//
//		var hh = +d3.select('.container-list').style('height').replace(/\D+/g,'');
//		if (hh > availHeight)	{
//			d3.select('.container-list').style('height',availHeight+'px')
//		}
//
//	},100);


	fEnd();
}


//==================================================================
//
//==================================================================

function vizDetail(d)	{
	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };

//	console.log('d', d);

	var name = d.key;

	var filtered = M.data.names.filter(function(d){ return d.name==name });

//	console.log('filtered', filtered);

//	vizCodename();


	var sel = d3.select('.panel-list')
		.styles({
			overflow:'auto'
		});


	var current = sel.selectAll('.card').data();
	var selected = current.filter(function(d){ return d.selected });
	var data = filtered.concat(selected);

	data.forEach(function(d,i){
		d._selectedIdx = i;
	});

	var cards = sel.selectAll('.card-holder').data(data, function(d){ return d.idx });

	cards
		.exit()
//		.filter(function(d){
//			console.log('d',d);
//			//return d3.select(this).classed('selected') ? false : true;
//			return !d.selected;
//		})
		.remove();

	cards.enter()
		.append('div').attr('class','col card-holder')
			.styles({
				'width':'272px',
				display:'inline-block',
			})
		.call(function(sel)	{

			sel.append('div').attr('class','card')
				.styles({
					'font-size':'16px',
					background:'#f2f2f2',
				})
			.call(function(sel)	{

				sel.append('div').attr('class','card-header')
					.styles({
						background:'#127DB9',
						'text-align':'center',
						'font-weight':700,
						cursor:'pointer',
					})
					.on('click', function(d){
						d.selected = true;
						d3.select(this.parentNode).classed('selected', true);
						d3.select(this)
							.styles({
								background:'#9400D3',
							});

					})
					.html(function(d){ return d.name + (d.name_source ? ', '+d.name_source : '') });

				sel.append('div').attr('class','card-block row-1')
					.styles({
						'border-bottom':'none',
					});

//				sel.append('div').attr('class','card-block row-2')
//					.styles({
//						'border-bottom':'none',
//						color:'#333',
//					});
//
////				sel.append('div').attr('class','card-block row-3')
////					.styles({
////						'border-bottom':'none',
////						color:'#333',
////					});
////
////				sel.append('div').attr('class','card-block row-4')
////					.styles({
////						'padding-bottom':'20px',
////						color:'#333',
////					});
//
//
//
//					//--------------
//					// description
//					//--------------
//					sel.select('.row-2')
//					.call(function(sel)	{
//
//						['description'].forEach(function(k){
//
//							var labels = sel.selectAll('.label-'+k).data(function(d){
//								var buckets=[];
//								if (d[k]) buckets.push( d[k] );
//								return buckets;
//							}, function(d){ return d });
//							labels.exit().remove();
//							labels.enter().append('div').attr('class','label-'+k)
//								.html(function(d){ return d });
//
//						});
//
//
//					});

					//--------------
					// description
					//--------------
					var keys = ['description'];
					sel.selectAll('.row-2').data(function(d){
						var buckets=[];
						keys.forEach(function(k){
							if (d[k]) buckets.push(d[k]);
						});
						return buckets;
					})
						.enter().append('div').attr('class','card-block row-2')
							.styles({
								'border-bottom':'none',
								color:'#333',
							})
							.selectAll('descr').data(function(d){
								return [d];
							})
							.enter().append('div')
								.attrs({
									'class':'descr',
								})
								.html(function(d){ return d });



					//--------------
					// source
					//--------------
					var key = 'source';
					sel.selectAll('.row-3').data(function(d){

						var buckets=[];
						[key].forEach(function(k){
							if (d[k]&&M.sources[d[k]]) buckets.push(M.sources[d[k]]);
						});
						return buckets;

					})
					.enter()
						.append('div').attr('class','card-block row-3')
							.styles({
								'border-bottom':'none',
								color:'#333',
							})
							.selectAll('.label').data(function(d){
								return [d];
							})
							.enter().append('a')
								.attrs({
									//'class':'btn btn-link label-'+key,
									'class':'label label',
									'href':function(d){ return d },
									target:'_blank',
								})
								.html(function(d){
									return URI(d).host().split('.').reverse().slice(0,2).reverse().join('.');
								});





					//--------------
					// link
					//--------------
					sel.selectAll('.row-4').data(function(d){
						return [d]
					}, function(d){ return d.idx })
						.enter()
							.append('div')
								.attr('class',function(d){ return 'card-block row-4 idx-'+d.idx })
								.styles({
									'padding-bottom':'20px',
									color:'#333',
								})
								.call(function(sel)	{

									sel.selectAll('.btn').data(function(d){

										var	url = {
											google:'https://www.google.com/search?q=',
											wiki:'https://en.wikipedia.org/wiki/',
											'domain name':'https://my.godaddy.com/dpp/find?checkAvail=1&tmskey=&domainToCheck='
										};

										var buckets = d3.entries(url);
										buckets.forEach(function(k){
											k.href = k.value+d.name;
										});

										return buckets;

									},function(d){ return d.key})
									.enter()
										.append('a')
											.attrs({
												class:'btn btn-sm',
												href:function(d){ return d.href },
												target:'_blank',
											})
											.html(function(d){ return d.key });

								});




			})
		})
		.merge(cards)
			.call(function(sel)	{


				sel.sort(d3.comparator().order(d3.ascending, function(d){ return d._selectedIdx }));


				//--------------
				// fields
				//--------------
				sel.select('.row-1')
				.call(function(sel)	{

					['full_name_symbol','full_name','name_source','full_name','source','type'].forEach(function(k){

						var labels = sel.selectAll('.label-'+k).data(function(d){
							var buckets=[];
							if (d[k]) buckets.push( d[k] );
							return buckets;
						}, function(d){ return d });
						labels.exit().remove();
						labels.enter().append('span').attr('class','label label-'+k)
							.html(function(d){ return d });

					});

				});


		}); // merge

	fEnd();
}



//==================================================================
//
//==================================================================
function vizCodename(cb)	{
	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


	d3.select('.container-codename')

	var data = d3.shuffle(M.data.names)
							.map(function(d){ return d.name })
							.slice(0,3)
							.join(' ');

	var k = d3.select('.container-codename')
		.selectAll('.codename').data([data]);
	k.exit().remove();
	k.enter()
		.append('h1').attr('class','codename')
			.styles({
				'font-size':'32px',
				'font-weight':700,
			})
		.merge(k)
			.html(function(d){ return d.toUpperCase() });


	fEnd();
}
