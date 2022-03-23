let points = [
  0, 0, 0,
  0, 30, 0,
  140, 0, 0,
  0, 30, 0,
  140, 30, 0,
  140, 0, 0,

  140, 0, 140,
  140, 0, 0,
  140, 30, 140, 
  140, 30, 140,
  140, 0, 0,
  140, 30, 0,

  
  140, 0, 140,
  0, 30, 140,
  0, 0, 140,
  140, 0, 140,
  140, 30, 140,
  0, 30, 140,

  
  0, 0, 140,
  0, 30, 140,
  0, 0, 0,
  0, 30, 140,
  0, 30, 0,
  0, 0, 0,

  
  0, 0, 0,
  10, 0, 0,
  10, 0, 140,
  10, 0, 140,
  0, 0, 140,
  0, 0, 0,

  
  10, 0, 0,
  100, 0, 0,
  100, 0, 10,
  100, 0, 10,
  10, 0, 10,
  10, 0, 0,

  
  100, 0, 0,
  140, 0, 0,
  140, 0, 140,
  140, 0, 140,
  100, 0, 140,
  100, 0, 0,

  
  10, 0, 100,
  100, 0, 100,
  100, 0, 140,
  100, 0, 140,
  10, 0, 140,
  10, 0, 100,

  
  0, 30, 140,
  140, 30, 140,
  140, 30, 100,
  140, 30, 100,
  0, 30, 100,
  0, 30, 140,

  
  100, 30, 100,
  140, 30, 100,
  140, 30, 10,
  140, 30, 10,
  100, 30, 10,
  100, 30, 100,

  
  0, 30, 0,
  140, 30, 10,
  140, 30, 0,
  140, 30, 10,
  0, 30, 0,
  0, 30, 10,

  
  0, 30, 10,
  10, 30, 100,
  10, 30, 10,
  10, 30, 100,
  0, 30, 10,
  0, 30, 100,
  
  10, 0, 0,
  100, 0, 0,
  10, 30, 0,
  10, 30, 0,
  100, 0, 0,
  100, 30, 0,

  
  100, 0, 140,
  100, 30, 140, 
  100, 0, 0,
  100, 30, 140,
  100, 30, 0,
  100, 0, 0,

    
  100, 0, 140,
  10, 0, 140,
  10, 30, 140,
  100, 0, 140,
  10, 30, 140,
  100, 30, 140,

  
  10, 0, 140,
  10, 0, 0,
  10, 30, 140,
  10, 30, 140,
  10, 0, 0,
  10, 30, 0,

  // segitiga
  0, 30, 140,
  10, 30, 140,
  50, 100, 60,
  50, 100, 60,
  50, 140, 50,
  0, 30, 140,

  100, 30, 140,
  140, 30, 140,
  50, 140, 50,
  50, 140, 50,
  50, 100, 60,
  100, 30, 140,

  0, 30, 140,
  50, 100, 60,
  10, 30, 140,
  50, 100, 60,
  0, 30, 140,
  50, 140, 50,

  100, 30, 140,
  50, 140, 50,
  140, 30, 140,
  50, 140, 50,
  100, 30, 140,
  50, 100, 60,

  140, 30, 140,
  140, 30, 100,
  60, 100, 50,
  60, 100, 50,
  50, 140, 50,
  140, 30, 140,

  140, 30, 10,
  140, 30, 0,
  50, 140, 50,
  50, 140, 50,
  60, 100, 50,
  140, 30, 10,

  140, 30, 140,
  60, 100, 50,
  140, 30, 100,
  60, 100, 50,
  140, 30, 140,
  50, 140, 50,

  140, 30, 10,
  50, 140, 50,
  140, 30, 0,
  50, 140, 50,
  140, 30, 10,
  60, 100, 50,

  0, 30, 0,
  50, 140, 50,
  50, 100, 40,
  50, 100, 40,
  10, 30, 0,
  0, 30, 0,

  100, 30, 0,
  50, 140, 50,
  140, 30, 0,
  50, 140, 50,
  100, 30, 0,
  50, 100, 40,

  0, 30, 0,
  50, 100, 40,
  50, 140, 50,
  50, 100, 40,
  0, 30, 0,
  10, 30, 0,

  100, 30, 0,
  140, 30, 0,
  50, 140, 50,
  50, 140, 50,
  50, 100, 40,
  100, 30, 0,

  0, 30, 0,
  0, 30, 10,
  40, 100, 50,
  40, 100, 50,
  50, 140, 50,
  0, 30, 0,

  0, 30, 100,
  0, 30, 140,
  50, 140, 50,
  50, 140, 50,
  40, 100, 50,
  0, 30, 100,

  0, 30, 0,
  0, 30, 10,
  40, 100, 50,
  40, 100, 50,
  50, 140, 50,
  0, 30, 0,

  0, 30, 100,
  0, 30, 140,
  50, 140, 50,
  50, 140, 50,
  40, 100, 50,
  0, 30, 100
]

let colors = [
      // left column front
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,

        // top rung front
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,

        // middle rung front
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,

        // left column back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

        // top rung back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

        // middle rung back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

        // top
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,

        // top rung right
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,

        // under top rung
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,

        // between top rung and middle
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,

        // top of middle rung
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,

        // right of middle rung
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,

        // bottom of middle rung.
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,

        // right of bottom
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,

        // bottom
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,

        // left side
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      // left column front
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,

        // top rung front
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,

        // middle rung front
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,

        // left column back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

        // top rung back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

        // middle rung back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

        // top
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,

        // top rung right
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,

        // under top rung
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,

        // between top rung and middle
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,

        // top of middle rung
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,

        // right of middle rung
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,

        // bottom of middle rung.
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,

        // right of bottom
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,

        // bottom
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,

        // left side
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,

        // top
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
  
          // top rung right
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
  
          // under top rung
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
  
          // between top rung and middle
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
  
          // top of middle rung
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
  
          // right of middle rung
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
  
          // bottom of middle rung.
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
  
          // right of bottom
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
  
          // bottom
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
  
          // left side
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220
]

let normals = [
   /* TOP */
    // top
    // left
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // right
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // back
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // front
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // bottom
    // left
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // right
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // back
     0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // front
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // inside
    // right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // left
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    /// front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // back
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // outside
    // right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // left
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    /// front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // back
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    
    /* BOTTOM */
    // bottom
    // left
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // right
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // back
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // front
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // top
    // left
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // right
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // back
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // front
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,


    // inside
    // right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // left
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    /// front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    // back
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // outside
    // right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // left
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    /// front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // back
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // RIGHT FRONT PILLAR
    // right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // left
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    /// front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // back
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // RIGHT BACK PILLAR
    // right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // left
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    /// front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // back
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // LEFT FRONT PILLAR
    // left
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0, 
    // right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0, 

     /// front
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
 
     // back
    0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,

    // LEFT BACK PILLAR
    // left
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0, 

    // right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0, 

     /// front
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
 
     // back
    0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
]

uniColor = [0.8, 1, 0.2, 1]
console.log("panjang", points.length, colors.length, normals.length)