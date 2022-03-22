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