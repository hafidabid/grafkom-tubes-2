let canvas = document.getElementById("canvas");
let gl;
let matrixLocation;
let normalAttLoc;
let posAttLoc
let program;
let posBuffer
let colorBuffer

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
    `

}

// normalize a vector
function normalize(vector){
    let length = Math.sqrt(Math.pow(vector[0], 2), Math.pow(vector[1], 2), Math.pow(vector[2], 2));
    let result = [0, 0, 0];
    if(length > 0.00001){
        result[0] = vector[0]/length;
        result[1] = vector[1]/length;
        result[2] = vector[2]/length;
    }
    return result;
}

// canvas resizing
function resizeCanvas(canvas) {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
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
        return program
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

    //setup program
    program = createProgram(gl, vertexShader, fragmentShader);
    
    //lookup vertex and uniform data
    posAttLoc = gl.getAttribLocation(program, "a_position");
    matrixLocation = gl.getUniformLocation(program, "u_matrix");
    
    //create position buffer and set position geometry
    posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    //create color buffer and set color on each geometry
    colorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW)

    renderEngine();
}

function renderEngine(){
    resizeCanvas(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    gl.useProgram(program)

    gl.enableVertexAttribArray(posAttLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.vertexAttribPointer(posAttLoc, 3, gl.FLOAT, false, 0, 0);

    const colorLoc = gl.getAttribLocation(program, "a_color")
    gl.enableVertexAttribArray(colorLoc)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.vertexAttribPointer(colorLoc, 3, gl.UNSIGNED_BYTE, true, 0, 0)
   
    const mat = new MatrixEngine()
    mat.generate(projectionMode, prespectiveProp)
    mat.translate(translation[0], translation[1], translation[2])
    mat.rotate(rotation[0], rotation[1], rotation[2])
    mat.scale(scaling[0], scaling[1], scaling[2])
    gl.uniformMatrix4fv(matrixLocation, false, mat.getMatrix());

    let count = 16*6;
    gl.drawArrays(gl.TRIANGLES, 0, count);
}


function MatrixEngine () {
    this.matrix = [
        1, 0, 0, 0,
        0, 1, 0, 0, 
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]

    this.generate = (mode = "orthograpic", prop = {}) => {
        const l = 0
        const r = gl.canvas.clientWidth
        const top = 0
        const bot = gl.canvas.clientHeight
        const near = 800
        const far = -800
        if(mode=="prespective"){
            const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
            const f = Math.tan(Math.PI * 0.5 - 0.5 * this._degreeToRad2(prop.fov))
            const rangeInv = 1.0/(1-2000)
            this.matrix = [
                f / aspect, 0, 0, 0,
                0, f, 0, 0,
                0, 0, (1 + 2000) * rangeInv, -1,
                0, 0, 2000 * 1 * rangeInv * 2, 0
            ]
        }else if (mode=="oblique") {

        }else{
            this.matrix = [
                2 / (r-l), 0, 0, 0,
                0, 2/ (top-bot), 0, 0,
                0, 0, 2 / (near-far), 0,
                (l+r)/(l-r), (bot+top)/(bot-top), ((near+far)/(near-far)), 1,
            ]
            console.log("ort", this.matrix)
        }
    }

    this._multiplyMatrix = (mat1, mat2)=>{
        const mtemp = []
        for(let i = 0 ; i<4; i++){
            for(let j=0; j<4; j++){
                let s = 0
                for(let k=0;k<4; k++){
                    s += (parseFloat(mat2[(i*4)+k]) * parseFloat(mat1[j+(k*4)]))
                }
                mtemp.push(s)
            }
        }
        console.log("mtmp", mat2, mat1, mtemp)
        for(let i=0;i<16;i++){
            this.matrix[i] = mtemp[i]
        }
    }

    this._degreeToRad = (deg) => {
        return deg * (Math.PI/80);
    }

    this._degreeToRad2 = (deg) => {
        return deg * (Math.PI/180);
    }

    this._radToDegree = (rad) => {
        return rad * (180/Math.PI)
    }

    this.translate = (x,y,z)=>{
        const m = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x ,y , z, 1,
        ]
        this._multiplyMatrix(this.matrix, m)
    }

    this.rotate = (x,y,z) => {
        let c,s
        c = Math.cos(this._degreeToRad(x))
        s = Math.sin(this._degreeToRad(x))
        const xRot = [
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1,
        ]
        this._multiplyMatrix(this.matrix, xRot)
        c = Math.cos(this._degreeToRad(y))
        s = Math.sin(this._degreeToRad(y))
        const yRot = [
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1,
        ]
        this._multiplyMatrix(this.matrix, yRot)
        c = Math.cos(this._degreeToRad(z))
        s = Math.sin(this._degreeToRad(z))
        const zRot = [
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]
        this._multiplyMatrix(this.matrix, zRot)
    }

    this.scale = (x,y,z) => {
        const m = [
            x, 0, 0, 0,
            0, y, 0, 0, 
            0, 0, z, 0,
            0, 0, 0, 1,
        ]
        this._multiplyMatrix(this.matrix, m)
    }

    this.getMatrix = () => {
        return this.matrix
    }
}

