import { Vec2, type Shape2D } from '../all'

export default class Rectangle implements Shape2D {
  setPosition(point: Vec2): void {
    if (!point) {
      console.log('Circle setPosition error, null vector argument')
    }
    this.center.xy = point.xy
  }

  constructor(
    public center: Vec2,
    public width: number,
    public length: number
  ) {
    if (!center) {
      console.log('Rectangle constructor error - center = null | undefined')
    }

    if (width <= 0 || length <= 0) {
      console.log('Rectangle constructor error - width or height <= 0')
    }
  }

  /* https://www.ronja-tutorials.com/post/034-2d-sdf-basics/#2d-sdf-functions
float rectangle(float2 samplePosition, float2 halfSize){
    float2 componentWiseEdgeDistance = abs(samplePosition) - halfSize;
    float  outsideDistance           = length(max(componentWiseEdgeDistance, 0));
    float  insideDistance            = min(max(componentWiseEdgeDistance.x, componentWiseEdgeDistance.y), 0);
    return outsideDistance + insideDistance;
}
*/

  public signedDistanceFunction(point: Vec2): number {
    return 0
  }
}
