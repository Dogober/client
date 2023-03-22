<template>
    <div>
        <v-select
            @update:modelValue="changeSort"
            v-bind:value="modelValue"
            label="Sort"
            class="select"
            :items="options"
            item-title="name"
            item-value="value"
            density="compact"
            variant="solo"
        ></v-select>
    </div>
</template>

<script>
    export default {
        name: 'my-select',
        props: {
            options: {
                type: Array,
                default: () => []
            },
            modelValue: {
                type: String
            }
        },
        methods: {
            changeSort(event) {
                this.$emit('update:modelValue', event)
            }
        }
    }
</script>

<style scoped>
    .select {
        width: 200px;
        position: absolute;
        top: 9.5rem
    }
</style>