<template>
  <!-- this is essentially the frontpage (for now) -->
  <div class="container">
    <h1>Development of this site is still in its early stages. Once I have a more firm grasp of how to use Vue.js, I intend to present projects I undertake - accompanied by documentation and tutorials which could help another programmer learn the same way I did.</h1>
  </div>
  <div class="container">
    <HeaderAttribute title="Task Tracker"></HeaderAttribute>
    <TasksAttribute v-bind:tasks="tasks"></TasksAttribute>
  </div>
</template>

<script>
// renaming imports has no effect as the export is default
import HeaderAttribute from './components/HeaderAttribute.vue';
import TasksAttribute from './components/TasksAttribute.vue';

export default {
  name: 'App',
  components: {
    // these are jargon: "Registered" components
    HeaderAttribute,
    TasksAttribute
  },
  // create the tasks array
  data() {
    return {
      tasks: []
    }
  },
  // fill the task array using this 'lifecycle' method
  // lifecycle methods are used at certain points for components, and we can
  // hook into them to run our logic at those points in the life cycle
  // created is when the component is being created
  created() {
    this.tasks = [
      {
        id: 1,
        text: 'Doctors appointment',
        day: 'March 1st at 2:30pm',
        reminder: true
      },
      {
        id: 2,
        text: 'Meeting at school',
        day: 'March 3rd at 3:30pm',
        reminder: true
      },
      {
        id: 3,
        text: 'Vet appointment',
        day: 'March 5th at 5:30pm',
        reminder: false
      }
    ]
  }
}
</script>

<style>
/* these are global styles */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
