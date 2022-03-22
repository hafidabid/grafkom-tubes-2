let canvas = document.getElementById("canvas");
let gl;
let matrixLocation;
let normalAttLoc;

let program;

const shaderSource = {
    "fragment" : `
    precision mediump float;

    varying vec3 v_normal;
    
    uniform vec3 u_reverseLightDirection;
    uniform vec4 u_color;

    void main()
    {
        vec3 normal = normalize(v_normal);

        float light = dot(normal, u_reverseLightDirection);

        gl_FragColor = u_color;

        gl_FragColor.rgb *= light;
    }
        `,
    
    "vertex" : `
    attribute  vec4 a_position;
    attribute  vec3 a_normal;

    uniform mat4 u_matrix;

    varying vec3 v_normal;

    void main()
    {
        gl_Position = u_matrix * a_position;
        v_normal =  a_normal;
    }
    `

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
 
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  }
  
  // return a shader program
function createProgram(gl, vertex, fragment){
    let program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    // return program;
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
 
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
function initEngine(){
    gl = canvas.getContext("webgl");
    if (!gl) {
        alert("Not supported");
    }

    let vertexShader =  createShader(gl, gl.VERTEX_SHADER, shaderSource.vertex);
    let fragmentShader =  createShader(gl, gl.FRAGMENT_SHADER, shaderSource.fragment);

    program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    let posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    let posAttLoc = gl.getAttribLocation(program, "a_position");
    normalAttLoc = gl.getAttribLocation(program, "a_normal");
    matrixLocation = gl.getUniformLocation(program, "u_matrix");
    
    gl.enableVertexAttribArray(posAttLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.vertexAttribPointer(posAttLoc, 3, gl.FLOAT, false, 0, 0);
    
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    resizeCanvas(canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    renderEngine();
}

function renderEngine(){

}