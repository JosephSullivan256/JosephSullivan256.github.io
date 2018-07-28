rr = {
	canvas: null,
	ctx: null,
	
	x: 0,
	
	init: function(){
		rr.canvas = document.getElementById("canvas");
		rr.ctx = rr.canvas.getContext('2d');
		
		rr.update();
	},
	
	update: function(){
		rr.x += 0.1;
		
		rr.ctx.fillRect(100-rr.x,0,100,100);
		
		window.requestAnimationFrame(rr.update);
	},
}

window.addEventListener(
	"load",
	function(e) {
		rr.init();
	},
	false
);