<template>
    <div class="posts-container" v-if="posts.length > 0">
        <TransitionGroup name="post-list">
            <PostItem 
                v-for="post in posts" 
                :post="post"
                :showBtns="userStore.user.id === post.authorId"
                :key="post._id"
                @delete="$emit('delete', post)"
            />
        </TransitionGroup>
    </div>
    <h3 v-else-if="error" style="color: rebeccapurple">{{ error }}</h3>
    <h3 v-else>
        The list of posts is currently empty. Add a post
    </h3>
</template>

<script >
import PostItem from './PostItem.vue'
import { useUserStore } from '../stores/user'

export default {
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    emits: ['delete'],
    props: {
        posts: {
            type: Array,
            required: true
        },
        error: {
            type: String
        },
    },
    components: { PostItem }
}
</script>

<style scoped>
    .posts-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 2rem auto;
        gap: 1rem;
    }
    .post-list-move, .post-list-enter-active, .post-list-leave-active {
        transition: all 0.5s ease;
    }
    .post-list-enter-from, .post-list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
    h3 {
        margin: 2rem 0;
    }
</style>