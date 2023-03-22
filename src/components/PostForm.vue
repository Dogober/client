<template>
    <form class="form" @submit.prevent>
        <h3>Сreate a post</h3>
        <my-input
            v-model="post.title"
            :type="inputType" 
            :placeholder="titlePlaceholder" 
        />
        <my-input
            v-model="post.body"
            :type="inputType" 
            :placeholder="bodyPlaceholder" 
        />
        <my-btn class="form_add" @click="addPost" :text="'Add'"/>
    </form>
</template>

<script>
import { useUserStore } from '../stores/user'

    export default {
        emits: ['add'],
        props: {
            posts: {
                type: Array,
                required: true
            }
        },
        data() {
            const userStore = useUserStore()
            return {
                inputType: "text",
                titlePlaceholder: "Title",
                bodyPlaceholder: "Description",
                post: {
                    title: '',
                    body: ''
                },
                userStore
            }
        },
        methods: {
            addPost() {
                this.$emit('add', {...this.post, authorId: this.userStore.user.id})
                this.post = {
                    title: '',
                    body: ''
                }
            },
        }
    }
</script>

<style>
    .form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .form_add {
        margin-top: 1rem;
        align-self: end;
    }

</style>