canvas = null;
ctx = null;
touchDown = false;
imageA = null;
imageB = null;
readyA = false;
readyB = false;
stage = "a";

function init(){
	alert("Minkowski Sums! Draw something, tap the bottom of the screen, draw something else, tap the bottom of the screen, and behold!")
	
	// init canvas
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	
	// 
	canvas.addEventListener("touchstart", handleStart, false);
	canvas.addEventListener("touchend", handleEnd, false);
	canvas.addEventListener("touchcancel", handleCancel, false);
	canvas.addEventListener("touchmove", handleMove, false);
	
	clear(ctx);
	drawOrigin(ctx);
}

function handleStart(e){
	handleTouch(e,"start");
}

function handleEnd(e){
	handleTouch(e,"end");
}

function handleCancel(e){
	handleTouch(e,"cancel");
}

function handleMove(e){
	handleTouch(e,"move");
}

function handleTouch(e,type){
	pos = e.changedTouches[0];
	if(pos.pageY>canvas.height*0.95 || stage == "c"){ //if over button
		if(type=="start"){
			touchDown = false;
			if(stage == "a"){
				imageA = getImage(canvas);
				readyA = false;
				imageA.onload = function() {
					readyA = true;
				};
				stage = "b";
				clear(ctx);
				drawOrigin(ctx);
			}
			else if(stage == "b"){
				imageB = getImage(canvas);
				readyB = false;
				imageB.onload = function() {
					readyB = true;
				};
				
				stage = "c";
				clear(ctx);
				drawSum();
			}
			else if(stage == "c"){
				stage = "a";
				clear(ctx);
				drawOrigin(ctx);
			}
		}
	}
	else { //not over button
		if(type == "start") touchDown = true;
		if(type == "end") touchDown = false;
		
		if(touchDown){
			//ctx.fillRect(pos.pageX-10,pos.pageY-10,20,20);
			ctx.beginPath();
			ctx.arc(pos.pageX, pos.pageY, 10, 0, 2 * Math.PI);
			ctx.fill();
		}
	}
}

function getImage(canvas){
	var url = canvas.toDataURL();
	var newImg = document.createElement("img"); // create img tag
	newImg.src = url;
	return newImg;
}

function clear(ctx){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSum(){
	if(!readyA || !readyB){
		setTimeout(function() {
			drawSum();
		}, 10);
	} else {
		drawSumRow(getImageCTX(imageA),imageB,0);
	}
}

function drawSumRow(a,b,y){
	for(var x = 0; x < b.width; x+=5){ //only works if b dimensions are the same as a
		if(a.getImageData(x, y, 1, 1).data[0] == 100){
			ctx.drawImage(imageB, x-imageB.width/2,y-imageB.height/2);
		}
	}
	if(y < b.height && stage == "c"){
		setTimeout(function() {
			drawSumRow(a,b,y+5);
		}, 10);
	}
}

function getImageCTX(img){
	var can = document.createElement('canvas');
	can.width = img.width;
	can.height = img.height;
	var ct = can.getContext('2d');
	ct.drawImage(img, 0, 0, img.width, img.height);
	return ct;
}

function drawOrigin(ctx){
	ctx.fillStyle = "rgba(100,0,0,255)";
	ctx.fillRect(canvas.width/2-5,canvas.height/2-5,10,10);
}

window.addEventListener(
	"load",
	function(e) {
		init();
	},
	false
);