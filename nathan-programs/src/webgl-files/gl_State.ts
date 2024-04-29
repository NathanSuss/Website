import {
  vShaderRayMarching,
  fShaderRaymarching
} from './shaders'
import Scene from './Scene'
import rayMarchingTest from './Tests/ray-marching-tests'
import { Mat3, Vec2, Vec3 } from './Webgl-Utils/all'

enum CSG {
  UNION,
  INTERSECT,
  NEGATE
}

export default class gl_State {
  public gl: WebGL2RenderingContext | null = null
  public canvas: HTMLCanvasElement | null = null

  // sphere 1
  public centerOne:[number, number, number] = [-0.04, 0, 0]
  public colorOne: number = 2.99;
  public radiusOne: number = 0.2

  // sphere 2
  public centerTwo:[number, number, number] = [0.04, 0, 0]
  public colorTwo: number = -1.35;
  public radiusTwo: number = 0.2

  // camera
  public rotation: Vec2 = new Vec2([0, 0])
  public camera: Vec3 = new Vec3([0, 0, 1])

  // CSG
  public choice: number = CSG.UNION;

  constructor(document: Document) {
    this.reset(document)
  }

  public reset(document: Document) {
    this.canvas = document.querySelector('#canvas') // matches canvas id in <template>
    if (!this.canvas) {
      console.log('canvas was null - reset() in maingl.vue.ts')
      return
    }
    let screen_square: number = 2000
    this.canvas.width  = screen_square
    this.canvas.height = screen_square
    this.gl = this.canvas.getContext('webgl2')
    if (!this.gl) {
      console.log('gl was null - reset() in maingl.vue.ts')
      return
    }
    rayMarchingTest()
    this.drawScene()
  }

  private screenCover() {
    // three 2d points in clip space
    return [
      -1, 1, -1, -1, -1, -1, 1, -1, -1,

      -1, 1, -1, 1, 1, -1, 1, -1, -1
    ]
  }

  drawScene(): void {
    if (!this.gl) return
    /** map of all scenes with their names as keys */
    let scenes: Map<string, Scene> = new Map<string, Scene>()
    const mainScene: Scene | null = Scene.newScene(
      this.gl,
      'fillScreen',
      vShaderRayMarching,
      fShaderRaymarching,
      scenes
    )
    const vecDimensions: number = 3
    if (!mainScene) {
      console.log('drawScene error, no scene')
      return
    }

    mainScene.addFloatAttribute(this.gl, 'a_screenCover', this.screenCover(), vecDimensions)
    mainScene.addUniform1f(this.gl, 'uSelected', 1) // select color based on ray hit

    // sphere 1
    mainScene.addUniform3f(this.gl, 'uCenterOne', new Vec3(this.centerOne)) // circle centerpoint
    mainScene.addUniform1f(this.gl, 'uColorOne', this.colorOne) // circle color
    mainScene.addUniform1f(this.gl, 'uRadiusOne', this.radiusOne) // circle radius

    // sphere 2
    mainScene.addUniform3f(this.gl, 'uCenterTwo', new Vec3(this.centerTwo)) // circle centerpoint
    mainScene.addUniform1f(this.gl, 'uColorTwo', this.colorTwo) // circle color
    mainScene.addUniform1f(this.gl, 'uRadiusTwo', this.radiusTwo) // circle radius

    // camera
    mainScene.addUniform3f(this.gl, 'uEye', this.camera) // camera position
    mainScene.addUniform2f(this.gl, 'uRotation', this.rotation) // scene rotation

    // CSG - UNION, INTERSECT, NEGATE
    this.choice = CSG.NEGATE;
    mainScene.addUniform1i(this.gl, 'uChoice', this.choice);

    mainScene.setCurrentScene(this.gl)
    
    // execute program
    var primitiveType = this.gl.TRIANGLES
    var offset = 0
    var count = 6 // Because the count is 3 this will execute our vertex shader 3 times.
    this.gl.drawArrays(primitiveType, offset, count)
    Scene.delete(this.gl, scenes.get('fillScreen'), scenes)
  }
}