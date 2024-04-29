import { setupShaderProgram, Vec3 , Vec2} from './Webgl-Utils/all'

export default class Scene {
  public vao: WebGLVertexArrayObject | null
  public program: WebGLProgram | null
  public buffers: GLint[]

  constructor(
    gl: WebGL2RenderingContext,
    public name: string,
    vShader: string,
    fShader: string
  ) {
    this.buffers = []
    this.program = setupShaderProgram(gl, vShader, fShader)
    this.vao = gl.createVertexArray()
    if (!this.program || !this.vao) {
      console.log('scene unsuccessfully initialized')
    }
  }

  public static newScene(
    gl: WebGL2RenderingContext,
    name: string,
    vShader: string,
    fShader: string,
    sceneMap?: Map<string, Scene>
  ): Scene | null {
    const scene: Scene = new Scene(gl, name, vShader, fShader)
    if (!scene) return null
    if (sceneMap) sceneMap.set(name, scene)
    return scene
  }

  /** false if unsuccessful */
  public setCurrentScene(gl: WebGL2RenderingContext): boolean {
    if (!this.program || !this.vao) return false
    gl.bindVertexArray(this.vao)
    gl.useProgram(this.program)
    for (let i = 0; i < this.buffers.length; ++i) {
      gl.enableVertexAttribArray(this.buffers[i])
    }

    // resize canvas with css
    // TODO https://webgl2fundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(90.0 / 255.0, 90.0 / 255.0, 90.0 / 255.0, 1.0) // gray
    gl.clear(gl.COLOR_BUFFER_BIT)
    return true
  }

  private addUniform(gl: WebGL2RenderingContext, name: string): WebGLUniformLocation | null {
    if (!this.program || !this.vao) {
      console.log('addFloatAttribute error')
      return null
    }
    gl.bindVertexArray(this.vao)
    gl.useProgram(this.program)
    if (!this.program) return null
    const uLocation: WebGLUniformLocation | null = gl.getUniformLocation(this.program, name)
    if (!uLocation) return null
    return uLocation
  }

  public addUniform1f(gl: WebGL2RenderingContext, name: string, value: number): boolean {
    const uLocation = this.addUniform(gl, name)
    if (!uLocation) return false
    gl.uniform1f(uLocation, value)
    return true
  }

  public addUniform2f(gl: WebGL2RenderingContext, name: string, vec: Vec2): boolean {
    if (!vec) return false
    const uLocation = this.addUniform(gl, name)
    if (!uLocation) return false
    gl.uniform2f(uLocation, vec.x, vec.y)
    return true
  }

  public addUniform3f(gl: WebGL2RenderingContext, name: string, vec: Vec3): boolean {
    if (!vec) return false
    const uLocation = this.addUniform(gl, name)
    if (!uLocation) return false
    gl.uniform3f(uLocation, vec.x, vec.y, vec.z)
    return true
  }

  public addUniform1i(gl: WebGL2RenderingContext, name: string, value: number): boolean {
    const uLocation = this.addUniform(gl, name)
    if (!uLocation) return false
    gl.uniform1i(uLocation, value)
    return true
  }

  private addAttribute(
    gl: WebGL2RenderingContext,
    name: string,
    data: Float32Array | number[] | Uint32Array,
    size: number
  ): GLint {
    if (!this.program || !this.vao) {
      console.log('addFloatAttribute error')
      return -1
    }
    gl.bindVertexArray(this.vao)
    gl.useProgram(this.program)
    const dataAttributeLocation: GLint = gl.getAttribLocation(this.program, name)
    const dataBuffer: WebGLBuffer | null = gl.createBuffer()
    if (!dataBuffer) return -1
    this.buffers.push(dataAttributeLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer)
    return dataAttributeLocation
  }

  /** size is components per iteration (2 for vec2, 3 for vec3) */
  public addFloatAttribute(
    gl: WebGL2RenderingContext,
    name: string,
    data: Float32Array | number[],
    size: number
  ): boolean {
    const dataAttributeLocation: GLint = this.addAttribute(gl, name, data, size)
    if (dataAttributeLocation == -1) return false
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
    const type = gl.FLOAT // the data is 32bit floats
    const normalize = false // don't normalize the data
    const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0 // start at the beginning of the buffer
    gl.vertexAttribPointer(dataAttributeLocation, size, type, normalize, stride, offset) // frees buffer for next binding
    return true
  }

  /** size is components per iteration (2 for vec2, 3 for vec3) */
  public addUIntAttribute(
    gl: WebGL2RenderingContext,
    name: string,
    data: Uint32Array,
    size: number
  ): boolean {
    const dataAttributeLocation: GLint = this.addAttribute(gl, name, data, size)
    if (dataAttributeLocation == -1) return false
    gl.bufferData(gl.ARRAY_BUFFER, new Uint32Array(data), gl.STATIC_DRAW)
    // gl.enableVertexAttribArray(dataAttributeLocation) //TODO idk if this is necessary
    const type = gl.UNSIGNED_INT // the data is UInt32
    const normalize = false // don't normalize the data
    const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0 // start at the beginning of the buffer
    gl.vertexAttribPointer(dataAttributeLocation, size, type, normalize, stride, offset) // frees buffer for next binding
    // gl.disableVertexAttribArray(dataAttributeLocation); //TODO idk if this is necessary
    return true
  }

  public static delete(
    gl: WebGL2RenderingContext,
    scene: Scene | undefined,
    sceneMap: Map<string, Scene> | undefined
  ): void {
    if (!scene) {
      return
    }
    if (scene.vao) {
      gl.deleteVertexArray(scene.vao)
    }
    if (scene.program) {
      gl.deleteProgram(scene.program)
    }
    // for (let i = 0; i < scene.buffers.length; ++i) {
    // gl.deleteBuffer(scene.buffers[i])
    // memory leak?
    // }
    if (sceneMap) {
      sceneMap.delete(scene.name)
    }
  }
}
