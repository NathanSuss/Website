import {
  signedDistanceFunction,
  length,
  createProgram,
  createShader,
  setupShaderProgram
} from './ray-marching2d'
import { epsilon, maxDistance, Mat2, Mat3, Mat4, Quat, Vec2, Vec3, Vec4 } from './tsm/tsm'

import { type Shape2D, Circle, Rectangle } from './Shapes/Shape'
import { type Shape3D, Sphere } from './Shapes/Shape'

export {
  signedDistanceFunction,
  length,
  createProgram,
  createShader,
  setupShaderProgram,
  epsilon,
  maxDistance,
  Mat2,
  Mat3,
  Mat4,
  Quat,
  Vec2,
  Vec3,
  Vec4,
  type Shape2D,
  Circle,
  Rectangle,
  type Shape3D,
  Sphere
}
