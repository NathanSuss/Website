/*
WebGL only cares about 2 things. 
Clip space coordinates and colors. 
Your job as a programmer using WebGL is to provide WebGL with those 2 things. 
You provide your 2 "shaders" to do this. 
A Vertex shader which provides the clip space coordinates, 
and a fragment shader that provides the color.

Clip space coordinates always go from -1 to +1 no matter what size your canvas is.
*/

/* 
NOTE: #version 300 es MUST BE THE VERY FIRST LINE OF YOUR SHADER. 
No comments or blank lines are allowed before it! 
#version 300 es tells WebGL2 you want to use WebGL2's shader language called GLSL ES 3.00. 
If you don't put that as the first line the shader language defaults to WebGL 1.0's GLSL ES 1.00 
which has many differences and far less features.
*/

export const vShaderRayMarching = `#version 300 es
in vec4 a_screenCover;
out vec4 coord;
void main() {
  gl_Position = a_screenCover;
  coord = a_screenCover;
}
`

export const fShaderRaymarching = `#version 300 es
precision highp float;
out vec4 outColor;
in vec4 coord;

// Enum
uniform int uChoice;
const int UNION = 0;
const int INTERSECT = 1;
const int NEGATE = 2;

// object 1
uniform float uColorOne;
uniform vec3 uCenterOne;
uniform float uRadiusOne;

// object 2
uniform float uColorTwo;
uniform vec3 uCenterTwo;
uniform float uRadiusTwo;

// camera 
uniform vec3 uEye; // position
uniform vec2 uRotation;

// which one is closest
int uSelected;

// used for ray marching
const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 1.0;
const float EPSILON = 0.0001;

// begin is eye
vec3 rayDirection(vec3 begin) {
  return normalize(vec3(coord.xyz) - begin);
}

// camera rotation : pitch, yaw https://www.shadertoy.com/view/XsB3Rm
mat3 rotationXY( vec2 angle ) {
	vec2 c = cos( angle );
	vec2 s = sin( angle );
	
	return mat3(
		c.y      ,  0.0, -s.y,
		s.y * s.x,  c.x,  c.y * s.x,
		s.y * c.x, -s.x,  c.y * c.x
	);
}

// default case
float sphereSDF(vec3 p) {
    float radOne = length(uCenterOne - p) - uRadiusOne;
    float radTwo = length(uCenterTwo - p) - uRadiusTwo;
    if (radOne > radTwo) {
      uSelected = 2;
      return radTwo;
    }
    uSelected = 1;
    return radOne;
}

float sphereUnionSDF(vec3 p) {
  float radOne = length(uCenterOne - p) - uRadiusOne;
  float radTwo = length(uCenterTwo - p) - uRadiusTwo;
  if (radOne > radTwo) {
    uSelected = 2;
    return radTwo;
  }
  uSelected = 1;
  return radOne;
}

float sphereIntersectSDF(vec3 p) {
  float radOne = length(uCenterOne - p) - uRadiusOne;
  float radTwo = length(uCenterTwo - p) - uRadiusTwo;
  if (radOne < radTwo) {
    uSelected = 1;
    return radTwo;
  }
  uSelected = 2;
  return radOne;
}

float sphereNegateSDF(vec3 p) {
  float radOne = length(uCenterOne - p) - uRadiusOne;
  float radTwo = -(length(uCenterTwo - p) - uRadiusTwo);
  if (radOne < radTwo) {
    uSelected = 2;
    return radTwo;
  }
  uSelected = 1;
  return radOne;
}

// done (needs not sure if it works)
float sphereSelectSDF(int choice, vec3 p) {
  if (choice == UNION) {
    return sphereUnionSDF(p);
  } else if (choice == INTERSECT) {
    return sphereIntersectSDF(p);
  } else if (choice == NEGATE) {
    return sphereNegateSDF(p);
  }
  return sphereSDF(p);
}

// ray marching algorithm for a single ray (a single iteration of this fragment shader)
float rayMarch(vec3 eye, vec3 marchingDirection, float start, float end) {
    float depth = start;
    for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
        float dist = sphereSelectSDF(uChoice, eye + depth * marchingDirection);
        // float dist = sphereSDF(eye + depth * marchingDirection, uRadius);
        if (dist < EPSILON) {
			    return depth;
        }
        depth += dist;
        if (depth >= end) {
          return end;
        }
    }
    return end;
}

// ray marching setup for a single ray (a single iteration of this fragment shader)
// also handles coloring
void main() {

  // default ray dir
	// vec3 dir = ray_dir( 45.0, vec2(2000,2000), coord.xy );
	vec3 dir = rayDirection(uEye);
	
	// default ray origin
	vec3 eye = uEye;

	// rotate camera https://www.shadertoy.com/view/XsB3Rm
	mat3 rot = rotationXY( uRotation );
	dir = rot * dir;
	eye = rot * eye;
  float dist = rayMarch(eye, dir, MIN_DIST, MAX_DIST);
  
  if (dist > MAX_DIST - EPSILON) {
    // didn't hit background color
    outColor = vec4(0.2, 0.0, 0.3, 0.1);
	  return;
  }
  
  // some funky stuff for making coloring look cool based on our hardcoded values and distance traveled by the ray
  outColor = vec4(1.0, 1.0, 1.0, 1.0);
  if (uSelected == 1) {
    outColor = normalize(vec4(sin(dist * uColorOne), cos(dist * uColorOne), cos(dist * uColorOne), 1.0));
  }
  
  if (uSelected == 2) {
    outColor = normalize(vec4(sin(dist * uColorTwo), cos(dist * uColorTwo), cos(dist * uColorTwo), 1.0));
  }
}
`
const refernce = `#version 300 es

/**
 * Part 1 Challenges
 * - Make the circle yellow
 * - Make the circle smaller by decreasing its radius
 * - Make the circle smaller by moving the camera back
 * - Make the size of the circle oscillate using the sin() function and the iTime
 *   uniform provided by shadertoy
 */

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float EPSILON = 0.0001;

/**
 * Signed distance function for a sphere centered at the origin with radius 1.0;
 */
float sphereSDF(vec3 samplePoint) {
    return length(samplePoint) - 1.0;
}

/**
 * Signed distance function describing the scene.
 * 
 * Absolute value of the return value indicates the distance to the surface.
 * Sign indicates whether the point is inside or outside the surface,
 * negative indicating inside.
 */
float sceneSDF(vec3 samplePoint) {
    return sphereSDF(samplePoint);
}

/**
 * Return the shortest distance from the eyepoint to the scene surface along
 * the marching direction. If no part of the surface is found between start and end,
 * return end.
 * 
 * eye: the eye point, acting as the origin of the ray
 * marchingDirection: the normalized direction to march in
 * start: the starting distance away from the eye
 * end: the max distance away from the ey to march before giving up
 */
float shortestDistanceToSurface(vec3 eye, vec3 marchingDirection, float start, float end) {
    float depth = start;
    for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
        float dist = sceneSDF(eye + depth * marchingDirection);
        if (dist < EPSILON) {
			return depth;
        }
        depth += dist;
        if (depth >= end) {
            return end;
        }
    }
    return end;
}
     

/**
 * Return the normalized direction to march in from the eye point for a single pixel.
 * 
 * fieldOfView: vertical field of view in degrees
 * size: resolution of the output image
 * fragCoord: the x,y coordinate of the pixel in the output image
 */
vec3 rayDirection(float fieldOfView, vec2 size, vec2 fragCoord) {
    vec2 xy = fragCoord - size / 2.0;
    float z = size.y / tan(radians(fieldOfView) / 2.0);
    return normalize(vec3(xy, -z));
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec3 dir = rayDirection(45.0, iResolution.xy, fragCoord);
    vec3 eye = vec3(0.0, 0.0, 5.0);
    float dist = shortestDistanceToSurface(eye, dir, MIN_DIST, MAX_DIST);
    
    if (dist > MAX_DIST - EPSILON) {
        // Didn't hit anything
        fragColor = vec4(0.0, 0.0, 0.0, 0.0);
		return;
    }
    
    fragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

export const copyme = `#version 300 es

`
