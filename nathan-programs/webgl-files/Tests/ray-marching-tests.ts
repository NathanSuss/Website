import { Vec3 } from '../webgl-utils/tsm/Vec3'
import { signedDistanceFunction, norm } from '../webgl-utils'

// add new tests function names to this array to test them
var functions: Function[] = [normTest, signedDistanceFunctionTest]

export function rayMarchingTest() {
  console.log('begin: ', rayMarchingTest.name)
  let success: boolean = true
  for (let i = 0; i < functions.length; ++i) {
    if (!functions[i]()) {
      success = false
      console.log('ERROR:', functions[i].name, 'in ray-marching.ts')
    }
  }
  if (success) {
    console.log('rayMarchingTest success')
  }
}

function normTest(): boolean {
  let input: Vec3[] = [new Vec3([3, 4, 0])]
  let expected: number[] = [5]
  for (let i = 0; i < input.length; ++i) {
    if (norm(input[i].xyz) != expected[i]) {
      return false
    }
  }
  return true
}

function signedDistanceFunctionTest(): boolean {
  let input: any[][] = [[new Vec3([0, 0, 3]), 1]]
  let expected: number[] = [2]
  for (let i = 0; i < input.length; ++i) {
    if (signedDistanceFunction(input[i][0], input[i][1]) != expected[i]) {
      return false
    }
  }
  return true
}
