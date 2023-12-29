<template>
    <div class="task">
        <h3>
            {{ task.text }}
        </h3>
        <p>{{ task.day }}</p>
    </div>
</template>

<script>

export default {
    name: 'TaskAttribute',
    // handle displaying a single task from the tasks array defined in App.vue
    // or elsewhere
    props: {
        task: Object
    }
}
</script>

<style scoped>
.task {
    background: #f4f4f4;
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

.task.reminder {
    border-left: 5px solid green;
}

.task h3 {
    display:flex;
    align-items: center;
    justify-content: space-between;
}
</style>