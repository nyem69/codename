

M.title = 'codename finder';
M.timer={};
M.style={
	header:{
		enabled:false,
	},
	subnav:{
		enabled:false,
		bg:'#171717',
		color:'#ddd',
	},
	sidenav:{
		enabled:false,
		collapsed:false,
		bg:'#999',
		color:'#ddd',
	}
}


function main()	{
	var f = arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
			dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };

	document.title = M.title;


	layout();

	load(function(){
//		prep(function(){
			viz(fEnd);
//		});
	});


}
