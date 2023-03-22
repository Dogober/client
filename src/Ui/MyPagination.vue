<template>
    <div class="text-center">
      <v-pagination
        @update:modelValue="changePage"
        v-bind:value="modelValue"
        :length="totalPages"
        rounded="circle"
      ></v-pagination>
    </div>
  </template>

<script>
    export default {
        name: 'my-pagination',
        props: {
            modelValue: {
                type: Number
            },
            totalPages: {
                type: Number
            }
        },
        methods: {
            changePage(event) {
                this.$emit('update:modelValue', event)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>