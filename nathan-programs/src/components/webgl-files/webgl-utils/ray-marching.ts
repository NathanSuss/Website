import { Vec3 } from './tsm/Vec3'

// source: https://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/#the-raymarching-algorithm

// TODO update for non origin
/** distance to sphere radius */
export function signedDistanceFunction(Vec: Vec3, radius: number): number {
  if (!Vec) {
    return 0
  }
  const [x, y, z] = Vec.xyz
  return norm(Vec.xyz) - radius
}

// https://en.wikipedia.org/wiki/Norm_(mathematics)#Euclidean_norm
export function norm(values: number[]): number {
  let norm = 0
  for (let i = 0; i < values.length; ++i) {
    norm += Math.pow(values[i], 2)
  }
  return Math.sqrt(norm)
}
