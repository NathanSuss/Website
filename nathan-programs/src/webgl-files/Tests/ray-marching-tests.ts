import * as Test from '../Webgl-Utils/all'
import { Vec2, Vec3 } from '../Webgl-Utils/all'

// add new tests function names to this array to test them
var functions: Function[] = [
  lengthTest,
  signedDistanceFunctionTest,
  circleSignedDistanceFunctionTest
]

export default function rayMarchingTest() {
  console.log('begin: ', rayMarchingTest.name)
  let success: boolean = true
  for (let i = 0; i < functions.length; ++i) {
    let numErrors: number = functions[i]()
    if (numErrors > 0) {
      success = false
      console.log('ERROR: ', functions[i].name, ' has ', numErrors, ' errors')
    }
  }
  if (success) {
    console.log(rayMarchingTest.name, 'success')
  }
}

function lengthTest(): number {
  let numErrors: number = 0
  let input: Vec3[] = [new Vec3([3, 4, 0])]
  let expected: number[] = [5]
  for (let i = 0; i < input.length; ++i) {
    if (Test.length(input[i].xyz) != expected[i]) {
      ++numErrors
    }
  }
  return numErrors
}

function signedDistanceFunctionTest(): number {
  let numErrors: number = 0
  let input: any[][] = [[new Vec3([0, 0, 3]), 1]]
  let expected: number[] = [2]
  for (let i = 0; i < input.length; ++i) {
    if (Test.signedDistanceFunction(input[i][0], input[i][1]) != expected[i]) {
      ++numErrors
    }
  }
  return numErrors
}

function circleSignedDistanceFunctionTest(): number {
  let numErrors: number = 0
  let circles: Test.Shape2D[] = [
    new Test.Circle(Vec2.zero, 5),
    new Test.Circle(new Vec2([2, 0]), 5),
    new Test.Circle(new Vec2([2, 0]), 5)
  ]
  let input: Vec2[] = [
    new Vec2([3, 0]), // inside
    new Vec2([8, 0]), // outside
    new Vec2([7, 0]) // on radius circumference
  ]
  let expected: number[] = [-2, 1, 0]
  for (let i = 0; i < input.length; ++i) {
    if (circles[i].signedDistanceFunction(input[i]) != expected[i]) {
      ++numErrors
    }
  }
  return numErrors
}
