
let x_translation = document.getElementById("x-translation");
let y_translation = document.getElementById("y-translation");
let z_translation = document.getElementById("z-translation");

let x_rotation = document.getElementById("x-rotation");
let y_rotation = document.getElementById("y-rotation");
let z_rotation = document.getElementById("z-rotation");

let x_scaling = document.getElementById("x-scale");
let y_scaling = document.getElementById("y-scale");
let z_scaling = document.getElementById("z-scale");

let translation = [x_translation.value, y_translation.value, z_translation.value];
let rotation = [x_rotation.value, y_rotation.value, z_rotation.value];
let scaling = [x_scaling.value, y_scaling.value, z_scaling.value];

x_translation.oninput = function(){
    this.nextElementSibling.value = this.value;
    translation[0] = this.value;
    render();
}

y_translation.oninput = function(){
    this.nextElementSibling.value = this.value;
    translation[1] = this.value;
    render();
}

z_translation.oninput = function(){
    this.nextElementSibling.value = this.value;
    translation[2] = this.value;
    render();
}

x_rotation.oninput = function(){
    this.nextElementSibling.value = this.value;
    rotation[0] = this.value;
    render();
}

y_rotation.oninput = function(){
    this.nextElementSibling.value = this.value;
    rotation[1] = this.value;
    render();
}

z_rotation.oninput = function(){
    this.nextElementSibling.value = this.value;
    rotation[2] = this.value;
    render();
}

x_scaling.oninput = function(){
    this.nextElementSibling.value = this.value;
    scaling[0] = this.value;
    render();    
}

y_scaling.oninput = function(){
    this.nextElementSibling.value = this.value;
    scaling[1] = this.value;
    render();
}

z_scaling.oninput = function(){
    this.nextElementSibling.value = this.value;
    scaling[2] = this.value;
    render();
}


function updateColor(){
    colors = [];

    const  rgb = hexToRgb(colorPicker());
    colors.push(rgb.r, rgb.g, rgb.b, 1);

    render();
}

function render(){
    let normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

    gl.enableVertexAttribArray(normalAttLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.vertexAttribPointer(normalAttLoc, 3, gl.FLOAT, false, 0, 0);

    let colorUniformLoc = gl.getUniformLocation(program, "u_color");
    let reverseLightDirectionLocation = gl.getUniformLocation(program, "u_reverseLightDirection");
   
    gl.uniform4fv(colorUniformLoc, colors);

    let lightDirection = [0.8, 0.9, 1];
    gl.uniform3fv(reverseLightDirectionLocation, normalize(lightDirection));

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let matrix = createM4Identity();
    console.log("on render", {
        t: translation,
        r: rotation,
        s: z_scaling
    })
    matrix = translateM4(matrix, translation[0], translation[1], translation[2]);
    matrix = rotateM4x(matrix, rotation[0]);
    matrix = rotateM4y(matrix, rotation[1]);
    matrix = rotateM4z(matrix, rotation[2]);
    matrix = scaleM4(matrix, scaling[0], scaling[1], scaling[2]);

    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    let count = positions.length/3;
    gl.drawArrays(gl.TRIANGLES, 0, count);
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

// return a "matrix" identity
function createM4Identity(){
    return [
        1, 0, 0, 0,
        0, 1, 0, 0, 
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]
}

// multiply 4x4 matrix
function multiplyM4(a, b){
    let a00 = a[0];
    let a01 = a[1];
    let a02 = a[2];
    let a03 = a[3];
    let a10 = a[4];
    let a11 = a[5];
    let a12 = a[6];
    let a13 = a[7];
    let a20 = a[8];
    let a21 = a[9];
    let a22 = a[10];
    let a23 = a[11];
    let a30 = a[12];
    let a31 = a[13];
    let a32 = a[14];
    let a33 = a[15];
    let b00 = b[0];
    let b01 = b[1];
    let b02 = b[2];
    let b03 = b[3];
    let b10 = b[4];
    let b11 = b[5];
    let b12 = b[6];
    let b13 = b[7];
    let b20 = b[8];
    let b21 = b[9];
    let b22 = b[10];
    let b23 = b[11];
    let b30 = b[12];
    let b31 = b[13];
    let b32 = b[14];
    let b33 = b[15];

    return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
      ];
}

// return translated 4x4 matrix 
function translateM4(matrix, x, y, z){
    const translation = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1,
    ];

    return multiplyM4(matrix, translation);
}

// return rotated 4x4 matrix on x-axis 
function rotateM4x(matrix, angle){
    let angleInRad = degreeToRadian(angle);

    let c = Math.cos(angleInRad);
    let s = Math.sin(angleInRad);

    const xRotation = [
        1, 0, 0, 0,
        0, c, s, 0,
        0, -s, c, 0,
        0, 0, 0, 1,
    ];

    return multiplyM4(matrix, xRotation);
}

// return rotated 4x4 matrix on y-axis 
function rotateM4y(matrix, angle){
    let angleInRad = degreeToRadian(angle);

    let c = Math.cos(angleInRad);
    let s = Math.sin(angleInRad);

    const yRotation = [
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1,
    ];

    return multiplyM4(matrix, yRotation);
}

// return rotated 4x4 matrix on z-axis 
function rotateM4z(matrix, angle){
    let angleInRad = degreeToRadian(angle);

    let c = Math.cos(angleInRad);
    let s = Math.sin(angleInRad);

    const zRotation = [
        c, s, 0, 0,
        -s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];

    return multiplyM4(matrix, zRotation);
}

// return scaled 4x4 matrix 
function scaleM4(matrix, x, y, z){
    const scaling = [
        x, 0, 0, 0,
        0, y, 0, 0, 
        0, 0, z, 0,
        0, 0, 0, 1,
    ]
    
    return multiplyM4(matrix, scaling);
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

// convert degree to radian
function degreeToRadian(deg){
    return deg * (Math.PI/80) 
}

initEngine()