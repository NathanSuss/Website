import { vertexShaderSource, fragmentShaderSource } from './shaders'

export function mainGL(document: Document) {
  var canvas: HTMLCanvasElement | null = document.querySelector('#canvas') // matches canvas id in <template>
  if (!canvas) {
    console.log('canvas was null - startWebGL in maingl.vue.ts')
    return
  }
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
  resizeCanvasToDisplaySize(canvas)
  let gl: WebGL2RenderingContext | null = canvas.getContext('webgl2')
  if (!gl) {
    console.log('gl was null - startWebGL in maingl.vue.ts')
    return
  }
  drawScene(gl)
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth = canvas.clientWidth
  const displayHeight = canvas.clientHeight

  // Check if the canvas is not the same size.
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight

  console.log('resze')
  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth
    canvas.height = displayHeight
  }

  return needResize
}

function createShader(gl: WebGL2RenderingContext, type: GLenum, source: string) {
  var shader: WebGLShader | null = gl.createShader(type)
  if (!shader) return
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader
  }

  console.log(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  var program: WebGLProgram | null = gl.createProgram()
  if (!program) return
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  var success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }

  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

function setupShaderProgram(gl: WebGL2RenderingContext) {
  var vertexShader: WebGLShader | undefined = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  var fragmentShader: WebGLShader | undefined = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  )
  if (!vertexShader || !fragmentShader) return
  return createProgram(gl, vertexShader, fragmentShader)
}

function getPositions() {
  // three 2d points in clip space
  return [0, 0, 0, 0.5, 0.7, 0]
}

function drawScene(gl: WebGL2RenderingContext) {
  var program: WebGLProgram | undefined = setupShaderProgram(gl)
  if (!program) return
  // setup attributes
  // Looking up attribute locations (and uniform locations) is something you should do during initialization, not in your render loop.
  var positionAttributeLocation: GLint = gl.getAttribLocation(program, 'a_position')
  var positionBuffer: WebGLBuffer | null = gl.createBuffer()
  if (!positionBuffer) return
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  /*
gl.bufferData then copies that data to the positionBuffer on the GPU. 
It's using the position buffer because we bound it to the ARRAY_BUFFER bind point above.

The last argument, gl.STATIC_DRAW is a hint to WebGL about how we'll use the data. 
WebGL can try to use that hint to optimize certain things. 
gl.STATIC_DRAW tells WebGL we are not likely to change this data much.
  */
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(getPositions()), gl.STATIC_DRAW)

  /*
Now that we've put data in a buffer we need to tell the attribute how to get data out of it. 
First we need to create a collection of attribute state called a Vertex Array Object.

And we need to make that the current vertex array so that all of our attribute 
settings will apply to that set of attribute state

Now we finally setup the attributes in the vertex array. 
First off we need to turn the attribute on. 
This tells WebGL we want to get data out of a buffer. 
If we don't turn on the attribute then the attribute will have a constant value.
  */
  var vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  gl.enableVertexAttribArray(positionAttributeLocation)

  var size = 2 // 2 components per iteration
  var type = gl.FLOAT // the data is 32bit floats
  var normalize = false // don't normalize the data
  var stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0 // start at the beginning of the buffer
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset) // frees buffer for next binding

  // resize canvas with css
  // TODO https://webgl2fundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html

  // map clip space (-1 to +1) to screen space (canvas pixels)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(90.0 / 255.0, 90.0 / 255.0, 90.0 / 255.0, 1.0) // gray
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.useProgram(program)
  gl.bindVertexArray(vao) // specify which vao to use

  // execute program
  var primitiveType = gl.TRIANGLES
  var offset = 0
  var count = 3 // Because the count is 4 this will execute our vertex shader 4 times.
  gl.drawArrays(primitiveType, offset, count)
}
