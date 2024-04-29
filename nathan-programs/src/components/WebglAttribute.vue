<template>
  <canvas id="canvas"> Your browser does not support HTML5 </canvas>
</template>

<script>
import gl_State from '../webgl-files/gl_State'

var state;

// this is the typescript entrypoint (where all the typescript starts to run from)
export default {
  name: 'WebglAttribute',
  mounted() {
    state = new gl_State(document);
    state.drawScene();
  },
  props: {
    state
  },
  components: {
    gl_State
  }
  // components
}
</script>

<style scoped>
#canvas {
  width: 50%;
  height: 50%;
  display: block;
}
</style>
