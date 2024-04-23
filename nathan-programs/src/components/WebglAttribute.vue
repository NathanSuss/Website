<template>
  <canvas id="canvas"> Your browser does not support HTML5 </canvas>
</template>

<script>
import { mainGL } from './webgl-files/maingl.vue'

// this is the typescript entrypoint (where all the typescript starts to run from)
export default {
  name: 'WebglAttribute',
  mounted() {
    mainGL(document)
  }
  // props
  // components
}
</script>

<style scoped>
#canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
