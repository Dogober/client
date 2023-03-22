<template>
    <button class="btn">
        <slot>{{ text }}</slot>
    </button>
</template>

<script>
    export default {
        name: 'my-btn',
        props: {
            text: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .btn {
        padding: 0.25rem 0.5rem;
        background: none;
        border: 1px solid skyblue;
        border-radius: 0.2rem;
        color: skyblue;
        cursor: pointer;
    }
</style>