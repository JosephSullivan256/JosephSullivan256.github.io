window.addEventListener("load",function(){
	main();
});

function main(){
	const canvas = document.getElementById("canvas");
	const gl = canvas.getContext("webgl");
	if(gl===null){
		alert("Unable to initialize WebGL. Your browser or machine may not support it.");
		return;
	}
	
	var mouseInfo = addEventsToElement(canvas);
	
	var marchingCubesModel = new MarchingCubesModel(sphereDensityField);
	marchingCubesModel.init(gl);

	var scene = new Scene(new GlobalUniforms(gl),[marchingCubesModel]);

	var dt = 0;
	var then = 0;
	
	function loop(now){
		now *= 0.001;
		dt = now-then;
		then = now;

		updateScene(scene,dt,mouseInfo);
		drawScene(gl,scene);
		window.requestAnimationFrame(loop);
	}
	window.requestAnimationFrame(loop);
}

function updateScene(scene,dt,mouseInfo){
	scene.update(dt);
	if(mouseInfo.down){
		scene.globalUniforms.camera.rotate([-dt*mouseInfo.vel[0],dt*mouseInfo.vel[1]]);
		mouseInfo.vel = [0,0];
	}
}

function drawScene(gl,scene){
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	scene.render(gl);
}

function Scene(globalUniforms,models=[]){
	this.globalUniforms = globalUniforms;
	this.models = models;
	this.update = function(dt){
		models.forEach(model => model.update(dt));
	}
	this.render = function(gl){
		models.forEach(model => {
			model.render(gl,globalUniforms);
		});
	}
}

function GlobalUniforms(gl){
	// Create a perspective matrix, a special matrix that is
	// used to simulate the distortion of perspective in a camera.
	// Our field of view is 45 degrees, with a width/height
	// ratio that matches the display size of the canvas
	// and we only want to see objects between 0.1 units
	// and 100 units away from the camera.

	const fieldOfView = 45 * Math.PI / 180;   // in radians
	const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	const zNear = 0.1;
	const zFar = 100.0;
	this.projectionMatrix = mat4.create();

	// note: glmatrix.js always has the first argument
	// as the destination to receive the result.
	mat4.perspective(this.projectionMatrix,
		fieldOfView,
		aspect,
		zNear,
		zFar);

	this.camera = new OrbitingCamera([0.0,0.0,-10.0],[0.0,0.0,0.0]);
}

/*
setup:

create programs and lookup attribute and uniform locations
create buffers
create texture


drawing:

for each model
  for each attribute
    bindBuffer(ARRAY_BUFFER, model's buffer for attribute)
    vertexAttribPointer(...)
  bindBuffer(ELEMENT_ARRAY_BUFFER, model's ebo)
  set uniforms and bind textures 
  glDrawElements
*/