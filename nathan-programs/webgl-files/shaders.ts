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

export const vertexShaderSource = `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
 
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
}
`

export const fragmentShaderSource = `#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
  // Just set the output to a constant reddish-purple
  outColor = vec4(1, 0, 0.5, 1);
}
`
/** shortest distance function in GLSL (centered on origin)
https://iquilezles.org/articles/distfunctions/*/
export const sphereSDF = `#version 300 es
float sphereSDF(vec3 p, float radius) {
    return length(p) - radius;
}
`

/** https://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/#the-raymarching-algorithm */
export const rayMarchingAlgorithm = `#version 300 es
float depth = start;
for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
    float dist = sceneSDF(eye + depth * viewRayDirection);
    if (dist < EPSILON) {
        // We're inside the scene surface!
        return depth;
    }
    // Move along the view ray
    depth += dist;

    if (depth >= end) {
        // Gone too far; give up
        return end;
    }
}
return end;
`

/** https://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/#the-raymarching-algorithm */
export const estimateNormal = `#version 300 es
/**
 * Using the gradient of the SDF, estimate the normal on the surface at point p.
 */
vec3 estimateNormal(vec3 p) {
    return normalize(vec3(
        sceneSDF(vec3(p.x + EPSILON, p.y, p.z)) - sceneSDF(vec3(p.x - EPSILON, p.y, p.z)),
        sceneSDF(vec3(p.x, p.y + EPSILON, p.z)) - sceneSDF(vec3(p.x, p.y - EPSILON, p.z)),
        sceneSDF(vec3(p.x, p.y, p.z  + EPSILON)) - sceneSDF(vec3(p.x, p.y, p.z - EPSILON))
    ));
}
`

export const viewMatrix = `#version 300 es
/**
 * Return a transformation matrix that will transform a ray from view space
 * to world coordinates, given the eye point, the camera target, and an up vector.
 *
 * This assumes that the center of the camera is aligned with the negative z axis in
 * view space when calculating the ray marching direction.
 */
mat4 viewMatrix(vec3 eye, vec3 center, vec3 up) {
	vec3 f = normalize(center - eye);
	vec3 s = normalize(cross(f, up));
	vec3 u = cross(s, f);
	return mat4(
		vec4(s, 0.0),
		vec4(u, 0.0),
		vec4(-f, 0.0),
		vec4(0.0, 0.0, 0.0, 1)
	);
}
`

export const CSG = `#version 300 es
float intersectSDF(float distA, float distB) {
    return max(distA, distB);
}

float unionSDF(float distA, float distB) {
    return min(distA, distB);
}

float differenceSDF(float distA, float distB) {
    return max(distA, -distB);
}
`
export const copyme = `#version 300 es

`
