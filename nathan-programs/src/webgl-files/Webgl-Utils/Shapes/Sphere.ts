import { Vec3 } from '../all'
export default class Sphere implements Shape3D {
  //   setPosition(point: Vec2): void {
  //     if (!point) {
  //       console.log('Circle setPosition error, null vector argument')
  //       return
  //     }
  //     this.center.xy = point.xy
  //   }
  //   setRadius(radius: number): void {
  //     if (radius <= 0) {
  //       console.log('setRadius error - radius <= 0')
  //       return
  //     }
  //     this.radius = radius
  //   }
  //   constructor(
  //     public center: Vec2,
  //     public radius: number
  //   ) {
  //     if (!center) {
  //       console.log('Circle constructor error - center = null | undefined')
  //     }
  //     if (radius <= 0) {
  //       console.log('Circle constructor error - radius <= 0')
  //     }
  //   }
  //   public signedDistanceFunction(point: Vec2): number {
  //     let temp = Vec2.difference(this.center, point)
  //     return length(temp.xy) - this.radius
  //   }
}
