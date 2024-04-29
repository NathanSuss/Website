import { Vec2, Vec3, maxDistance } from './tsm/tsm'

// source: https://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/#the-raymarching-algorithm

// TODO update for non origin
/** distance to sphere radius */
export function signedDistanceFunction(Vec: Vec3, radius: number): number {
  if (!Vec) {
    return 0
  }
  const [x, y, z] = Vec.xyz
  return length(Vec.xyz) - radius
}

export function signedDistanceToCircle(point: Vec2): number {
  return 0
}

// https://en.wikipedia.org/wiki/Norm_(mathematics)#Euclidean_norm
export function length(values: number[]): number {
  let norm = 0
  for (let i = 0; i < values.length; ++i) {
    norm += Math.pow(values[i], 2)
  }
  return Math.sqrt(norm)
}

export function createShader(gl: WebGL2RenderingContext, type: GLenum, source: string) {
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

export function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  var program: WebGLProgram | null = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  var success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }

  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
  return null
}

export function setupShaderProgram(
  gl: WebGL2RenderingContext,
  vShader: string,
  fShader: string
): WebGLProgram | null {
  var vertexShader: WebGLShader | undefined = createShader(gl, gl.VERTEX_SHADER, vShader)
  var fragmentShader: WebGLShader | undefined = createShader(gl, gl.FRAGMENT_SHADER, fShader)
  if (!vertexShader || !fragmentShader) return null
  return createProgram(gl, vertexShader, fragmentShader)
}
