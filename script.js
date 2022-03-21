const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
let program
const source = {
    "vertex" : document.getElementById("vertex").text,
    "fragment" : document.getElementById("fragment").text
}

const init = () => {
    if (!gl) {
        alert("Check again your compability against ");
    }

    const vShader = createShader(gl, gl.VERTEX_SHADER, source.vertex)
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, source.fragment)
    program = createProgram(gl, vShader, fShader)
    gl.useProgram(program)

    const buffPosition = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffPosition)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([]), gl.STATIC_DRAW)

    const locAttr = gl.getAttribLocation(program, "a_position");
}