/*
  Copyright © VoxVision 2016
  Licensed under the GNU General Public License 3
*/

var workspace = $("#grid");
var dragger = $("#container");

var isc = false;
var dclick = false;
var sx = 0;
var sy = 0;

var cx = 0;
var cy = 0;

var snx = parseInt(dragger.css("left"),10);
var sny = parseInt(dragger.css("top"),10);


function onDragStart(e) {
	dclick = false;
	cx = e.pageX - $(dragger).offset().left;
	cy = e.pageY - $(dragger).offset().top;
	sx = parseInt(workspace.css("left"),10);
	sy = parseInt(workspace.css("top"),10);
	isc = true;
	return false;
}

function onDragStop(e) {
	isc = false;
}

function onDragMove(e) {
	if(isc)
	{
		dclick = true;
		var nx = cx - e.pageX + dragger.offset().left;
		var ny = cy - e.pageY + dragger.offset().top;
		var gbx = parseInt(workspace.css("width"),10)-snx;
		var gby = parseInt(workspace.css("height"),10)-sny;
		var cbx = parseInt(dragger.css("width"),10);
		var cby = parseInt(dragger.css("height"),10);
		var rx = sx-nx;
		var ry = sy-ny;

		if(rx > snx)
			rx = snx;

		if(ry > sny)
			ry = sny;

		if(rx < cbx-gbx)
			rx = cbx-gbx;

		if(ry < cby-gby)
			ry = cby-gby;

		workspace.css("left",rx+"px");
		workspace.css("top",ry+"px");
	}
}

$(document).mouseup(onDragStop);
$(document).mousemove(onDragMove);

workspace.mousedown(onDragStart);

workspace.click(function(e){
	if(dclick)
		e.preventDefault();
});

function setSize(w,h){
	var ol = parseInt(dragger.css("left"),10);
	var oh = parseInt(dragger.css("top"),10);

	var gszx = parseInt(workspace.css("width"),10);
	var gszy = parseInt(workspace.css("height"),10);

	var gposx = parseInt(workspace.css("left"),10);
	var gposy = parseInt(workspace.css("top"),10);

	var glimx = gszx+parseInt(workspace.css("left"),10);
	var glimy = gszy+parseInt(workspace.css("top"),10);

	var npx = ol+w-glimx;
	var npy = oh+h-glimy;

	if (npx < 0)
		npx = 0;

	if (npy < 0)
		npy = 0;

	dragger.css("width",w+"px");
	dragger.css("height",h+"px");

	workspace.css("left",(gposx+npx)+"px");
	workspace.css("top",(gposy+npy)+"px");
}

function setPosition(x,y){

	var cx = parseInt(dragger.css("left"),10);
	var cy = parseInt(dragger.css("top"),10);

	if (x < 0)
		x = 0;

	if (y < 0)
		y = 0;

	var xx = x*(-1);
	var yy = y*(-1);


	workspace.css("left",(cx+xx)+"px");
	workspace.css("top",(cy+yy)+"px");
}
