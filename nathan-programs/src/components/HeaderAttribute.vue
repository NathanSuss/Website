<template>
  <header>
    <h1>{{ title }}</h1>
    <ButtonAttribute text="Add Task" color="green" ></ButtonAttribute>
  </header>
</template>

<script>
import ButtonAttribute from './ButtonAttribute.vue';


export default {
  name: 'HeaderAttribute',
  // make it so HeaderAttribute attributes want a title variable to be specified
  // and print a default string when none is
  props: {
    title: {
      type: String,
      default: '\'title: String\' not provided to header attribute'
    }
  },
  components: { ButtonAttribute }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>