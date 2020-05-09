
function layout()	{

	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


	//layoutBootstrap();
	layoutClarity();

	fEnd();
}


//----------------------------------------
//
//----------------------------------------

function layoutClarity()	{

	//----------------
	// MAIN
	//----------------

	d3.select('body')
	.call(function(sel)	{

//		var el = [
//	//			{ el:'div', class:'alert alert-app-level'},
//				//{ el:'header', class:'header header-6'},
//				{ el:'nav', class:'subnav'},
//				//{ el:'nav', class:'subnav-search'},
//				{ el:'div', class:'content-container'},
//				//{ el:'nav', class:'footer'},
//		];

		var el=[];
		if (M.style.alert		&&	M.style.alert.enabled) el.push({ el:'div', class:'alert alert-app-level'});
		if (M.style.header	&&	M.style.header.enabled) el.push({ el:'header', class:'header header-6'});
		if (M.style.subnav	&&	M.style.subnav.enabled) el.push({ el:'nav', class:'subnav'});
		el.push({ el:'div', class:'content-container'});
		if (M.style.footer	&&	M.style.footer.enabled) el.push({ el:'nav', class:'footer'});


		sel.append('div').attr('class','main-container')
		.call(function(sel)	{

			el.forEach(function(k)	{
				sel.append(k.el).attr('class',k.class);
			});

	//		layoutHeader();
	//		layoutSubNav();
	//		layoutContentArea();
	//		layoutSideNav();


		});


		//————————————————————
		// svg filters
		//————————————————————
		//layoutSVGFilter(sel);




	});



	//--------------
	// content-container > content-area
	//--------------


	var elContent=[];

	if (M.style.sidenav		&&	M.style.sidenav.enabled) elContent.push({ el:'nav', class:'sidenav'});
	elContent.push({ el:'div', class:'content-area' });

	d3.select('.content-container')
	.call(function(sel)	{


		elContent.forEach(function(k)	{
			sel.append(k.el).attr('class',k.class);
		});
//
//		sel.append('nav').attr('class','sidenav sidenav1')
//			.styles({
//				top:'23px',
//				left:'0px',
//				width:'400px',
//				transform: 'translateX(-400px)',
//			});
//
////			.style('display','none');
////		sel.append('nav').attr('class','sidenav sidenav2')
////			.style('display','none');
//
//		sel.append('div').attr('class','content-area');

	});


	//--------------
	// content-container > content-area > sidenav
	//--------------

	if (M.style.sidenav		&&	M.style.sidenav.enabled)	{

		d3.select('.sidenav')
			.styles({
				top:'23px',
				left:'0px',
				width:'400px',
				transform: M.style.sidenav.collapsed ? 'translateX(-400px)' : 'translateX(px)',
			});

	}else	{
	}



	//--------------
	//
	//--------------
//	sel.select('.


	//--------------
	// rows
	//--------------
//	d3.select('.content-area')
//	.call(function(sel)	{
//
//
//		//----------------------------------------
//		// row-0
//		//----------------------------------------
////		sel
////		.append('div').attr('class','row flex-items-xs-center row-0')
////		.call(function(sel)	{
////
////			// spinner
////			//--------------
////			sel.append('div').attr('class','col-xs-12 text-center spinner-container')
////			.styles({
////				margin:'auto',
////				'text-align':'center',
////			})
////			.append('span').attr('class','spinner spinner-inverse');
////
////		});
////
////		//----------------------------------------
////		// row-1
////		//----------------------------------------
////		sel
////		.append('div').attr('class','row flex-items-xs-center')
////		.call(function(sel)	{
////
////
////
////			//----------------------------------------
////			// panel-container-2
////			//----------------------------------------
////			sel
////			.append('div').attr('class','col-xs-12 panel-container-2')
////			.call(function(sel)	{
////
////
////				//--------------
////				// map
////				//--------------
////				sel.append('div').attr('class','row map-container')
////					.styles({
////						//background:'#333',
////					})
////					.append('div').attr('class','map')
////					.styles({
//////						'max-width':'800px',
////						height:'100%'
////					});
////
////				//----------------------------------------
////				// panel-container-3
////				//----------------------------------------
//////				sel
//////				.append('div').attr('class','row  row-parlimen')
//////				.styles({
//////					'padding-bottom': (innerHeight/2)+'px',
//////				});
////
////
////				sel
////				.append('div').attr('class','row  panel-parlimen')
////				.styles({
////					'padding-bottom': (innerHeight/2)+'px',
////				});
////
////			}); // panel-container-2
////
////
////		}); // row-1
//
//
//
//
//	}); // content-area


	layoutSubnav();
	layoutSidenav();

//	layoutHeader();
//	layoutFooter();
}



//==================================================================
//
//==================================================================
function layoutSubnav()	{
	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };

	d3.select('.subnav')
	.styles({
		background:M.style.subnav.bg,
		color:M.style.subnav.color,
	})
//	.append('div').attr('class','row')
	.call(function(sel)	{

		sel.append('div').attr('class','btn-group btn-danger')
		.call(function(sel)	{

//
//				//--------------
//				// toggle sidenav2
//				//--------------
//				sel.append('button')
//				.attrs({
//					type:'button',
//					class:'btn',
//					//class:'btn btn-icon btn-sm btn-primary'
//				})
//				.styles({
//					'border-radius':0,
//					background:M.style.subnav.bg,
//					border:0,
//					'min-width':'40px',
//				})
//				.on('click', function(){
//
//					$(d3.select('.sidenav2').node() ).slideToggle(400);
//					$(d3.select('.sidenav1').node() ).slideUp(400);
//
//				})
//				.append('clr-icon')
//					.attr('class','is-solid')
//					.attr('shape','bookmark');

				//--------------
				// toggle sidenav1
				//--------------
				sel.append('button')
				.attrs({
					type:'button',
					class:'btn',
				})
				.styles({
					'border-radius':0,
					background:M.style.subnav.bg,
					border:0,
					'min-width':'40px',
				})
				.on('click', function(){

//					$(d3.select('.sidenav1').node() ).slideToggle(400);
//					$(d3.select('.sidenav2').node() ).slideUp(400);

//-webkit-transform: translateX(300px);
//transform: translateX(300px);
//
					if (M.timer.toggleSidenav) window.clearTimeout(M.timer.toggleSidenav);
					M.timer.toggleSidenav = window.setTimeout(function(){

						var tf = !d3.select('.sidenav').classed('offscreen');
						//console.log('tf', tf);

						d3.select('.sidenav')
							.classed('offscreen', tf)
							.transition()
								.styles({
									transform: tf ? 'translateX(-400px)' : 'translateX(0)'
								});

						d3.select('.content-area')
							.transition()
								.styles({
									transform: tf ? 'translateX(-400px)' : 'translateX(0)'
								});

					},100);


				})
				.append('clr-icon')
					.attr('class','is-solid')
					.attr('shape','bars');

/*
				//--------------
				// toggle map
				//--------------
				sel.append('button')
				.attrs({
					type:'button',
					class:'btn',
				})
				.styles({
					'border-radius':0,
					background:M.style.subnav.bg,
					border:0,
					'min-width':'40px',
				})
				.on('click', function(){

					$(d3.select('.map').node() ).slideToggle(400);

				})
				.append('clr-icon')
					.attr('class','is-solid')
					.attr('shape','map');


				//--------------
				// toggle table
				//--------------
				sel.append('button')
				.attrs({
					type:'button',
					class:'btn',
				})
				.styles({
					'border-radius':0,
					background:M.style.subnav.bg,
					border:0,
					'min-width':'40px',
				})
				.on('click', function(){

					$(d3.select('.panel-parlimen').node() ).slideToggle(400);

					d3.select('.map')
						.transition()
							.styles({
								height: (innerHeight -100 - +d3.select('.subnav').style('height').replace('px','') )+'px',
							});

				})
				.append('clr-icon')
					.attr('class','is-solid')
					.attr('shape','rack-server');

*/


		});



//
//			});
//		});


		//----------------------------------------
		// left
		//----------------------------------------
//		sel.append('div').attr('class','col-xs-4 subnav-left')
//		.call(function(sel)	{




//
//		});


		//----------------------------------------
		// mid
		//----------------------------------------
//		sel.append('div').attr('class','col-xs-4 subnav-mid')
//		.call(function(sel)	{

			//--------------
			// title
			//--------------
			sel.append('div')
				.styles({
					color:M.style.subnav.color,
				})
				.html(M.title);

//
//		});


		//----------------------------------------
		// right
		//----------------------------------------
//		sel.append('div').attr('class','col-xs-4 subnav-right')
//		.call(function(sel)	{


//			console.log('M',M);
//			console.log('M.style.subnav',M.style.subnav);

			//--------------
			// toggle modal
			//--------------
			sel.append('button')
			.attrs({
				type:'button',
				class:'btn btn-primary'
			})
			.styles({
				'border-radius':0,
				background:M.style.subnav.bg,
				border:0,
			})
			.on('click', function(){
				modal();
			})
			.append('clr-icon')
				//.attr('class','is-solid')
				.attr('shape','info-standard');

//
//
//		});






	});


	fEnd();

}


//==================================================================
// sidenav
//==================================================================
function layoutSidenav()	{

	d3.select('.sidenav')
	.styles({
//		display:'none',
		background:M.style.sidenav.bg,
		color:M.style.sidenav.color,
	})
	.call(function(sel)	{

			sel.append('div').attr('class','row')
			.styles({
				width:'400px',
			})
			.call(function(sel)	{
			});

			//----------------------------------------
			// panel-container
			//----------------------------------------
			sel.append('div').attr('class','panel-container')
			.styles({
//				'width':'400px',
				height:innerHeight+'px',
				overflow:'auto',
			})
			.call(function(sel)	{

				sel.append('div').attr('class','col panel-list' );

				//--------------
				// facets
				//--------------
				sel.append('div').attr('class','col panel-stateid' )
				sel.append('div').attr('class','col panel-agensi');
				sel.append('div').attr('class','col panel-projek');

			});


	});


}



//==================================================================
// sidenav2
//==================================================================
function layoutSidenav2()	{

	d3.select('.sidenav2')
	.styles({
		display:'none',
		background:'#00f',
		color:M.style.sidenav.color,
		width:'100px',
	})
	.call(function(sel)	{

			sel.append('div').attr('class','row')
			.styles({
				width:'100px',
			})
			.call(function(sel)	{
			});


	});


}

//==================================================================
//
//==================================================================

function layoutHeader()	{

	var w=444.971,
			h=330.887,
			f=.2;

	d3.select('body')
		.append('img')
			.attrs({
				src:'aga-research-color-black.svg',
			})
			.styles({
				'pointer-events':'none',
				position:'fixed',
				top:'-15px',
				right:'50px',
				width: (w*f)+'px',
				height: (h*f)+'px',
				opacity:.75,
//				'max-width':'200px',
//				'max-height':'100px',
				'z-index':9999,
			});

}
