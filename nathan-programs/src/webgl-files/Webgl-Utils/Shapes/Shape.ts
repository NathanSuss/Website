import { Vec2, Vec3 } from '../tsm/tsm'
import Circle from './Circle'
import Rectangle from './Rectangle'
import Sphere from './Sphere'

export interface Shape2D {
  setPosition(pos: Vec2): void
  signedDistanceFunction(point: Vec2): number
}

export interface Shape3D {
  setPosition(pos: Vec3): void
  signedDistanceFunction(point: Vec3): number
}

/** list of all shapes for cleaner importing */
export { Circle, Rectangle, Sphere }
