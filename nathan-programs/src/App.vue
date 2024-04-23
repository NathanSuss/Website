<script setup lang="ts">
// renaming imports has no effect as the export is default
import WebglAttribute from './components/WebglAttribute.vue'
</script>

<template>
  <div class="container">
    <p>Development of this site is still in its early stages. Once I have a more firm grasp of how to use Vue.js, I
      intend to present projects I undertake - accompanied by documentation and tutorials which could help another
      programmer learn the same way I did.</p>
  </div>
  <WebglAttribute class="webgl"></WebglAttribute>
</template>

<style scoped>
.container {
  box-sizing: border-box;
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.webgl {
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
  margin: 30px auto;
  overflow: auto;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
</style>
