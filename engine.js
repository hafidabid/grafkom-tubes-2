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
    
    let posAttLoc = gl.getAttribLocation(program, "a_position");
    normalAttLoc = gl.getAttribLocation(program, "a_normal");
    matrixLocation = gl.getUniformLocation(program, "u_matrix");
    
    let posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(posAttLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.vertexAttribPointer(posAttLoc, 3, gl.FLOAT, false, 0, 0);
    
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    resizeCanvas(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    renderEngine(gl, program, normals, normalAttLoc, colors, translation, rotation, scaling);
    //render()
}

function renderEngine(gl, program, normalArr, normalAtl, colorArr, trans, rotate, scale){
    const norm = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, norm)
    gl.bufferData(gl.ARRAY_BUFFER, normalArr, gl.STATIC_DRAW)

    gl.enableVertexAttribArray(normalAtl)
    gl.bindBuffer(gl.ARRAY_BUFFER, norm)
    gl.vertexAttribPointer(normalAtl, 3, gl.FLOAT, false, 0,0)

    const uniformColor = gl.getUniformLocation(program, "u_color")
    const lightReverseDirection = gl.getUniformLocation(program, "u_reverseLightDirection")

    gl.uniform4fv(uniformColor, colorArr)
    const lightDirection = [0.8, 0.9, 1];
    gl.uniform3fv(lightReverseDirection, normalize(lightDirection))

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const mat = new MatrixEngine()
    mat.generate(projectionMode, prespectiveProp)
    mat.translate(trans[0], trans[1], trans[2])
    mat.rotate(rotate[0], rotate[1], rotate[2])
    mat.scale(scale[0], scale[1], scale[2])
    gl.uniformMatrix4fv(matrixLocation, false, mat.getMatrix());

    let count = positions.length/3;
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
            console.log("ppv",f)
            const rangeInv = 1.0/(1-2000)
            this.matrix[0] = f / aspect
            this.matrix[5] = f
            this.matrix[10] = (1 + 2000)  *rangeInv
            this.matrix[14] = 2000 * 1 * rangeInv * 2
            this.matrix[11] = -1
            console.log("hmmbz",this.matrix)
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

