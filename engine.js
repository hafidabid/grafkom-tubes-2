const shaderSource = {
    "fragment" : `
    precision mediump float;

    // Passed in from the vertex shader.
    varying vec4 v_color;
    
    void main() {
       gl_FragColor = v_color;
    }
        `,
    
    "vertex" : `
    attribute vec4 a_position;
    attribute vec4 a_color;
    
    uniform mat4 u_matrix;
    
    varying vec4 v_color;
    
    void main() {
      // Multiply the position by the matrix.
      gl_Position = u_matrix * a_position;
    
      // Pass the color to the fragment shader.
      v_color = a_color;
    }
    `,
    "fragment-norm" : `
    precision mediump float;

    // Passed in from the vertex shader.
    varying vec3 v_normal;

    uniform vec3 u_reverseLightDirection;
    uniform vec4 u_color;

    void main() {
    // because v_normal is a varying it's interpolated
    // so it will not be a unit vector. Normalizing it
    // will make it a unit vector again
    vec3 normal = normalize(v_normal);

    float light = dot(normal, u_reverseLightDirection);

    gl_FragColor = u_color;

    // Lets multiply just the color portion (not the alpha)
    // by the light
    gl_FragColor.rgb *= light;
    }
    `,
    "vertex-norm" : `
    attribute vec4 a_position;
    attribute vec3 a_normal;
    
    uniform mat4 u_matrix;
    
    varying vec3 v_normal;
    
    void main() {
      // Multiply the position by the matrix.
      gl_Position = u_matrix * a_position;
    
      // Pass the normal to the fragment shader
      v_normal = a_normal;
    }
    `
}
function createProgram(gl, vertex, fragment){
    let program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    // return program;
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program
    }
 
    //console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function createShader(gl, type, source){
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
  
    // return shader;
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
 
    //console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}
function resizeCanvas(canvas){
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
}
function renderEngine(){
    resizeCanvas(gl.canvas)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.useProgram(program)

    gl.enableVertexAttribArray(posLoc)
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuff)
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0)

    if(shaderMode==1){
        gl.enableVertexAttribArray(clrLoc)
        gl.bindBuffer(gl.ARRAY_BUFFER, clrBuff)
        gl.vertexAttribPointer(clrLoc, 3, gl.UNSIGNED_BYTE, true, 0, 0)
    }else{
        gl.enableVertexAttribArray(normLoc)
        gl.bindBuffer(gl.ARRAY_BUFFER, normBuff)
        gl.vertexAttribPointer(normLoc, 3, gl.FLOAT, false, 0, 0)
    }

    

    const mat = new MatrixEngine()
    mat.generate(projectionMode, projAttr)
    mat.camera(cameraValue[0], cameraValue[1])
    mat.translate(translation[0], translation[1], translation[2])
    mat.rotate(rotation[0], rotation[1], rotation[2])
    mat.scale(scale[0], scale[1], scale[2])
    
    if(shaderMode != 1){
        gl.uniform4fv(uniClrLoc, uniColor)
        gl.uniform3fv(rLightLoc, normalize(lightDirection));
    }

    gl.uniformMatrix4fv(matLoc, false, mat.getMatrix());

    var primitiveType = gl.TRIANGLES;
    gl.drawArrays(gl.TRIANGLES, 0, points.length/3);
}