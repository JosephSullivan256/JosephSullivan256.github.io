function Vec2(x1,y1){
	this.x = x1;
	this.y = y1;
	
	this.plus = function(v1){
		return new Vec2(this.x+v1.x,this.y+v1.y);
	}
	this.minus = function(v1){
		return new Vec2(this.x-v1.x,this.y-v1.y);
	}
	this.scaledBy = function(s1){
		return new Vec2(s1*this.x,s1*this.y);
	}
	this.dot = function(v1){
		return v1.x*this.x+v1.y*this.y;
	}
	this.cross = function(v1){
		return this.x*v1.y-v1.x*this.y;
	}
	this.abs = function(){
		return new Vec2(Math.abs(this.x),Math.abs(this.y));
	}
	this.magSquared = function(){
		return this.dot(this);
	}
	this.mag = function(){
		return Math.sqrt(this.magSquared());
	}
	this.perp1 = function(){
		return new Vec2(-this.y,this.x);
	}
	this.perp2 = function(){
		return new Vec2(this.y,-this.x);
	}
}

rr = {
	// html elements
	canvas: null,
	ctx: null,
	
	// points of path, in order
	points: null,
	
	// distance mouse must move before adding next sample point
	sampleDist: 30,
	
	// input info
	mouseDown: false,
	mx: 0,
	my: 0,
	
	init: function(){
		rr.canvas = document.getElementById("canvas");
		rr.ctx = rr.canvas.getContext('2d');
		
		// add button event listener
		document.getElementById("start").addEventListener(
			"click",
			function(e){
				rr.start();
			},
			false
		);
		document.getElementById("reset").addEventListener(
			"click",
			function(e){
				rr.reset();
			},
			false
		);
		
		canvas.onmousedown = function(e){
			rr.mDown(e);
		};
		canvas.onmouseup = function(e){
			rr.mUp(e);
		}
		canvas.onmousemove = function(e){
			rr.mMove(e);
		}
		canvas.onmouseleave = function(e){
			rr.mUp(e);
		}
		
		// init points array
		rr.points = [ new Vec2(300,300) ];
		
		rr.update();
	},
	
	update: function(){
		rr.draw();
		
		if(rr.mouseDown){
			var pos = new Vec2(rr.mx,rr.my);
			if(pos.minus(rr.points[rr.points.length-1]).mag() > rr.sampleDist){
				rr.points.push(pos);
			}
		}
		
		window.requestAnimationFrame(rr.update);
	},
	
	draw: function(){
		rr.ctx.fillStyle = 'white';
		rr.ctx.fillRect(0,0,600,600);
		
		rr.ctx.fillStyle = 'black';
		for(var i = 0; i < rr.points.length; i++){
			rr.ctx.fillRect(rr.points[i].x-5,rr.points[i].y-5,10,10);
		}
	},
	
	mDown: function(e){
		var pos = new Vec2(e.clientX,e.clientY);
		var d = pos.minus(rr.points[0]).mag();
		if(d < 20 && rr.points.length == 1){
			rr.mouseDown = true;
		}
	},
	
	mUp: function(e){
		rr.mouseDown = false;
	},
	
	mMove: function(e){
		rr.mx = e.clientX;
		rr.my = e.clientY;
	},
	
	start: function(){
		
	},
	
	reset: function(){
		rr.mouseDown = false;
		rr.points = [new Vec2(300,300)];
	},
}

window.addEventListener(
	"load",
	function(e) {
		rr.init();
	},
	false
);