let projectionMode = document.getElementById("modeselection").value
const xTranslation = document.getElementById("x-translation");
const yTranslation = document.getElementById("y-translation");
const zTranslation = document.getElementById("z-translation");

const xRotation = document.getElementById("x-rotation");
const yRotation = document.getElementById("y-rotation");
const zRotation = document.getElementById("z-rotation");

const xScaling = document.getElementById("x-scale");
const yScaling = document.getElementById("y-scale");
const zScaling = document.getElementById("z-scale");

const fovScale = document.getElementById("fov-scale")
const obliqueScale = document.getElementById("oblique-scale")

const selectMode = document.getElementById("modeselection")
const prespectiveDiv = document.getElementsByClassName("prespective-slider")
const obliqueDiv = document.getElementsByClassName("oblique-slider")
prespectiveDiv[0].style.visibility="hidden"
obliqueDiv[0].style.visibility="hidden"

const isUsingShader = document.getElementById("isshader")
const angleSlider = document.getElementById("cam-rotation")
const radiusSlider = document.getElementById("cam-radius")

let canvas = document.getElementById("canvas");
let gl, program, pointLoc, colorLoc, matrixLoc
let posLoc, clrLoc, matLoc
let posBuff, clrBuff

const cameraValue = [0,200]

const translation = [90, 150, 0]
const rotation = [40, 25, 325]
const scale = [1,1,1]
60
const projAttr = {
    "fov" : 60,
    "obangel" : 63.4
}