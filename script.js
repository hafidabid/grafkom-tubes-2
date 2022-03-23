
let projectionMode = document.getElementById("modeselection").value
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
    renderEngine()
}

y_translation.oninput = function(){
    this.nextElementSibling.value = this.value;
    translation[1] = this.value;
    renderEngine()
}

z_translation.oninput = function(){
    this.nextElementSibling.value = this.value;
    translation[2] = this.value;
    renderEngine()
}

x_rotation.oninput = function(){
    this.nextElementSibling.value = this.value;
    rotation[0] = this.value;
    renderEngine()
}

y_rotation.oninput = function(){
    this.nextElementSibling.value = this.value;
    rotation[1] = this.value;
    renderEngine()
}

z_rotation.oninput = function(){
    this.nextElementSibling.value = this.value;
    rotation[2] = this.value;
    renderEngine()
}

x_scaling.oninput = function(){
    this.nextElementSibling.value = this.value;
    scaling[0] = this.value;
    renderEngine()   
}

y_scaling.oninput = function(){
    this.nextElementSibling.value = this.value;
    scaling[1] = this.value;
    renderEngine()
}

z_scaling.oninput = function(){
    this.nextElementSibling.value = this.value;
    scaling[2] = this.value;
    renderEngine()
}

const selectMode = document.getElementById("modeselection")
const prespectiveDiv = document.getElementsByClassName("prespective-slider")
prespectiveDiv[0].style.visibility="hidden"
selectMode.onchange = function(e) {
    if(e.target.value == "prespective"){
        prespectiveDiv[0].style.visibility="visible"
        
    }else{
        prespectiveDiv[0].style.visibility="hidden"
    }
    projectionMode = e.target.value
    renderEngine()
}

const fovScale = document.getElementById("fov-scale")
let prespectiveProp = {
    fov: 60
}

fovScale.oninput = function() {
    this.nextElementSibling.value = this.value
    prespectiveProp.fov = this.value
    renderEngine()
}



initEngine()