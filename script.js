function init(){
    gl = canvas.getContext("webgl")
    if(!gl){
        alert("error with init webgl")
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, shaderSource.vertex)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shaderSource.fragment)
    program = createProgram(gl, vertexShader, fragmentShader)

    posLoc = gl.getAttribLocation(program, "a_position")
    clrLoc = gl.getAttribLocation(program, "a_color")
    matLoc = gl.getUniformLocation(program, "u_matrix")

    posBuff = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuff)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)

    clrBuff = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, clrBuff)
    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors),gl.STATIC_DRAW)

    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    renderEngine();
}

function sliderFactory(v,i){
    return function(){
        this.nextElementSibling.value = this.value;
        v[i] = this.value;
        renderEngine()
    }
}




selectMode.onchange = (e) => {
    if(e.target.value == "prespective"){
        prespectiveDiv[0].style.visibility="visible"
        
    }else{
        prespectiveDiv[0].style.visibility="hidden"
    }

    if(e.target.value == "oblique"){
        obliqueDiv[0].style.visibility="visible"
        
    }else{
        obliqueDiv[0].style.visibility="hidden"
    }
    projectionMode = e.target.value
    renderEngine()
}


init();
xTranslation.oninput = sliderFactory(translation, 0)
yTranslation.oninput = sliderFactory(translation, 1)
zTranslation.oninput = sliderFactory(translation, 2)

xRotation.oninput = sliderFactory(rotation, 0)
yRotation.oninput = sliderFactory(rotation, 1)
zRotation.oninput = sliderFactory(rotation, 2)

xScaling.oninput = sliderFactory(scale,0)
yScaling.oninput = sliderFactory(scale,1)
zScaling.oninput = sliderFactory(scale,2)

angleSlider.oninput = sliderFactory(cameraValue, 0)
radiusSlider.oninput = sliderFactory(cameraValue,1)

fovScale.oninput = sliderFactory(projAttr, "fov")
obliqueScale.oninput = sliderFactory(projAttr, "obangel")

isUsingShader.onchange = (e) => {
    if(isUsingShader.checked){
        alert("uraa")
    }
}


function resetAdapter(components, value){
    components.value = value
    components.nextElementSibling.value = value
}

function resetButton(){
    cameraValue[0] = 0
    cameraValue[1] = 200
    resetAdapter(angleSlider, 0)
    resetAdapter(radiusSlider, 200)

    translation[0] = 90
    translation[1] = 150
    translation[2] = 0
    resetAdapter(xTranslation, 90)
    resetAdapter(yTranslation, 150)
    resetAdapter(zTranslation, 0)

    rotation[0] = 40
    rotation[1] = 25
    rotation[2] = 325
    resetAdapter(xRotation, 40)
    resetAdapter(yRotation, 25)
    resetAdapter(zRotation, 325)

    scale[0] = 1
    scale[1] = 1
    scale[2] = 1
    resetAdapter(xScaling, 1)
    resetAdapter(yScaling, 1)
    resetAdapter(zScaling, 1)

    projectionMode = "orthograpic"
    projAttr.fov = 60
    projAttr.obangel = 63.4
    selectMode.value = "orthograpic"
    prespectiveDiv[0].style.visibility="hidden"
    obliqueDiv[0].style.visibility="hidden"

    isUsingShader.checked = false
    renderEngine()
}