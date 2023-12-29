<template>
    <button v-bind:style="{background: color}" class="btn">{{text}}</button>
</template>

<script>
export default {
    name: "ButtonAttribute",
    props: {
        text: String,
        color: String
    }
}

</script>