<template>

  <canvas id="canvas" width="400" height="300" ref="canvas">
    Your browser does not support HTML5
  </canvas>

</template>

<script>

import * as MainGL from "./webgl-files/main-webgl"

export default {
  name: 'WebglAttribute',
  mounted() {
    const canvas = this.$refs.canvas; // Use ref to access canvas element
    let gl = MainGL.initGlContext(canvas);
    MainGL.drawScene(gl);
  }
  // props
  // components
}
</script>

<style scoped></style>