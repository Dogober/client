<template>
    <div class="post">
        <div class="post_main">
            <div><strong>Title:</strong> {{ post.title }}</div>
            <div><strong>Description:</strong> {{ post.body }}</div>
        </div>
        <my-btn
            v-if="showBtns"
            class="post_del"
            @click="$emit('delete', post)"
            :text="'Delete'"
        />
        <my-btn
            v-if="showBtns"
            class="post_del"
            @click="$router.push(`/posts/${post._id}`)"
            :text="'More'"
        />
    </div>
</template>

<script>
export default {
    emits: ['delete'],
    props: {
        post: {
            type: Object,
            required: true
        },
        showBtns: {
            type: Boolean
        }
    },
}
</script>

<style scoped>
    .post {
        display: flex;
        justify-content: space-between;
        width: 100%;
        border: 2px solid skyblue;
        border-radius: 0.3rem;
        padding: 1rem;
        gap: 1rem
    }
    .post_main {
        display: flex;
        flex-direction: column;
        flex: 1 auto;
        gap: 0.5rem
    }
    .post_del {
        align-self: center;
    }

</style>