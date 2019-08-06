
// //position = vector
// //direction = rotation matrix
// function Camera(position0,direction0){
//     this.position = position0;
//     this.rotation = direction0;
//     var viewMatrix = mat4.create();

//     this.getViewMatrix = function(){
//         var rotation = 
//         viewMatrix = mat4.fromRotationTranslation(viewMatrix,rotation,position);
//     }
// }

function OrbitingCamera(position0,center0,up0=vec3.fromValues(0,1,0)){
    this.position = position0;
    this.center = center0;
    this.up = up0;
    this.rotation = [0,0];
    var matrix = mat4.create();

    this.getViewMatrix = function(){
        var transformedPos = vec3.create();
        var xrot = mat4.create();
        mat4.fromXRotation(xrot,this.rotation[1]);
        var yrot = mat4.create();
        mat4.fromYRotation(yrot,this.rotation[0]);
        var rot = mat4.create();
        mat4.multiply(rot,yrot,xrot);
        vec3.transformMat4(transformedPos,this.position,rot);

        mat4.lookAt(matrix,transformedPos,this.center,this.up);
        return matrix;
    }

    this.rotate = function(rotation){
        vec2.add(this.rotation,rotation,this.rotation);
        this.rotation[1] = Math.max(Math.min(this.rotation[1],Math.PI/2.0),-Math.PI/2.0)
    }
}