
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

function subtractVectors(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
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
        const orthoMat = [
            2 / (r-l), 0, 0, 0,
            0, 2/ (top-bot), 0, 0,
            0, 0, 2 / (near-far), 0,
            (l+r)/(l-r), (bot+top)/(bot-top), ((near+far)/(near-far)), 1,
        ]
        if(mode=="prespective"){
            const aspect = r/bot
            const f = Math.tan(Math.PI * 0.5 - 0.5 * this._degreeToRad(prop.fov))
            const rangeInv = 1.0/(1-2000)
            this.matrix = [
                f / aspect, 0, 0, 0,
                0, f, 0, 0,
                0, 0, (1 + 2000) * rangeInv, -1,
                0, 0, 2000 * 1 * rangeInv * 2, 0
            ]
            //console.log("presp", this.matrix)
        }else if (mode=="oblique") {
            const s = 0.5*Math.sin(prop.obangel)
            const c = 0.5*Math.cos(prop.obangel)
            const obMat = [
                1, 0, 0, s,
                0, 1, 0, c,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ]
            this._multiplyMatrix(obMat, orthoMat)
        }else{
            this.matrix = [
                ...orthoMat
            ]
        }
    }
    
    this._multiplyMatrix = (mat1, mat2)=>{
        const mtemp = this._retMultiplyMatrix(mat1,mat2)
        //console.log("mtmp", mat2, mat1, mtemp)
        for(let i=0;i<16;i++){
            this.matrix[i] = mtemp[i]
        }
    }

    this._retMultiplyMatrix = (mat1, mat2) => {
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
        return mtemp
    }

    this._degreeToRad = (deg) => {
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

    this.camera = (degree, rad) =>{
        const internalTranlsate = (m0,x,y,z) => {
            const m = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                x ,y , z, 1,
            ]
            return this._retMultiplyMatrix(m0, m)
        }

        const fpos = [rad, 0, 0]
        let c,s
        c = Math.cos(this._degreeToRad(degree))
        s = Math.sin(this._degreeToRad(degree))
        const yRotMat = [
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1,
        ]
        
        let camMat = internalTranlsate(yRotMat, 0, 0, rad * 1.5)
        // const camPos = [camMat[12], camMat[13], camMat[14]]
        // const up = [0,1,0]
        
        // camMat = this._lookAt(camPos, fpos, up)
        const viewMat = this._inverse(camMat)
        //console.log("cammat", viewMat)
        this._multiplyMatrix(this.matrix, viewMat)
    }

    this._lookAt = (cp, fp, up) => {
        const zX = normalize(subtractVectors(cp, fp))
        const xX = normalize(cross(up, zX))
        const yX = normalize(cross(zX, xX))
        return [
            xX[0], xX[1], xX[2], 0,
            yX[0], yX[1], yX[2], 0,
            zX[0], zX[1], zX[2], 0,
            cp[0], cp[1], cp[2], 1
        ]
    }

    this._inverse = (mat) => {
        return inverseMat(mat)
    }  

}

function cross(a,b) {
    return [a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]];
}