<template>
    <input 
        class="input" 
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="update"
    >
</template>

<script>
export default {
    name: 'my-input',
    emits: ['update:model-value'],
    props: {
        type: String,
        placeholder: String,
        modelValue: [String, Number]
    },
    methods: {
        update(event) {
            this.$emit('update:model-value', event.target.value)
        }
    }
}
</script>

<style scoped>
    .input {
        border: 1px solid skyblue;
        border-radius: 0.2rem;
        padding: 0.3rem;
    }
</style>