window.addEventListener('load', function() {
	initScrollAnchors();
}, true);

function initScrollAnchors(){
	var anchors = document.getElementsByClassName("scroll-anchor");
	for(var i=0; i < anchors.length; i++){
		initScrollAnchor(anchors[i]);
	}
}

function initScrollAnchor(anchor){
	var speed = anchor.getAttribute("speed");
	var id = anchor.getAttribute("href").substring(1);
	var dest = document.getElementById(id);
	var position = dest.getBoundingClientRect().top + window.pageYOffset;/*- dest.ownerDocument.documentElement.clientTop;*/
	anchor.addEventListener("click", function() {
		disableScroll();
		scrollToSmoothly(-10, position, speed);
	}, true);
}

function scrollToSmoothly(previousScroll, position, speed){
	var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
	var newScroll = position*speed+currentScroll*(1-speed);
	if(Math.abs(newScroll - currentScroll) < 5){
		speed=Math.pow(speed,0.9);
		newScroll = position*speed+currentScroll*(1-speed);
	}
	if(previousScroll!=currentScroll){
		if(Math.abs(newScroll-position) < 4){
			document.documentElement.scrollTop = document.body.scrollTop = position;
			enableScroll();
		} else {
			document.documentElement.scrollTop = document.body.scrollTop = newScroll;
			window.requestAnimationFrame(function(){
				scrollToSmoothly(currentScroll,position,speed);
			});
		}
	} else {
		enableScroll();
	}
}


var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}