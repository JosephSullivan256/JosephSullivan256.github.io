
function addEventsToElement(ele){
    const rect = ele.getBoundingClientRect();
    const mouseInfo = {
        pos: [0,0],
        vel: [0,0],
        down: 0,
    };
    ele.addEventListener('mousedown', e => {
		mouseInfo.pos[0] = e.clientX - rect.left;
		mouseInfo.pos[1] = e.clientY - rect.top;
		mouseInfo.down++;
	});
	ele.addEventListener('mousemove', e => {
		var newX = e.clientX - rect.left;
        var newY = e.clientY - rect.top;
        mouseInfo.vel = [newX-mouseInfo.pos[0],newY-mouseInfo.pos[1]];
        mouseInfo.pos = [newX,newY];
	});
	  
	window.addEventListener('mouseup', e => {
		mouseInfo.pos[0] = e.clientX - rect.left;
		mouseInfo.pos[1] = e.clientY - rect.top;
		mouseInfo.down--;
    });

    ele.addEventListener('touchstart', evt => {
		mouseInfo.pos[0] = evt.changedTouches[0].clientX - rect.left;
		mouseInfo.pos[1] = evt.changedTouches[0].clientY - rect.top;
		mouseInfo.down++;
	});
	ele.addEventListener('touchmove', evt => {
		var newX = evt.changedTouches[0].clientX - rect.left;
        var newY = evt.changedTouches[0].clientY - rect.top;
        mouseInfo.vel = [newX-mouseInfo.pos[0],newY-mouseInfo.pos[1]];
        mouseInfo.pos = [newX,newY];
	});
	  
	window.addEventListener('touchend', evt => {
		mouseInfo.pos[0] = evt.changedTouches[0].clientX - rect.left;
		mouseInfo.pos[1] = evt.changedTouches[0].clientY - rect.top;
		mouseInfo.down--;
    });
    
    return mouseInfo;
}