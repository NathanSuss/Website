<template>
    <!-- loop through the tasks array defined in App and passed to this attribute 
    print the text field -->
    <div v-for="task in tasks" v-bind:key="task">
        <TaskAttribute v-bind:task="task"></TaskAttribute>
    </div>
</template>

<script>
import TaskAttribute from './TaskAttribute.vue';

export default {
    name: 'TasksAttribute',
    props: {
        tasks: Array
    },
    components: { TaskAttribute }
}
</script>