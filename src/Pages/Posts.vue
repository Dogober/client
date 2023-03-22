<template>
    <div v-if="userStore.isAuth">
        <PostForm 
            :posts="postStore.posts" 
            @add="addPost" 
        />
        <my-select v-model="postStore.selectedSort" :options="postStore.sortOptions" />
        <my-input 
            :type="inputType" 
            :placeholder="inputPlaceholder" 
            class="search"
            v-model="postStore.searchQuerry" 
        />
        <PostList 
            :posts="sortedAndSearchedPosts" 
            :error="postStore.error" 
            @delete="deletePost" 
            v-if="!postStore.loading" 
        />
        <my-pagination 
            v-model="postStore.page" 
            :totalPages="postStore.totalPages" 
            :style="{
                visibility: postStore.loading ? 'hidden' : 'visible'
            }" 
        />
    </div>
    <div v-else>
        <PostList 
            :posts="sortedAndSearchedPosts" 
            :error="postStore.error" 
            @delete="deletePost" 
            v-if="!postStore.loading" 
        />
        <my-pagination 
            v-model="postStore.page" 
            :totalPages="postStore.totalPages" 
            :style="{
                visibility: postStore.loading ? 'hidden' : 'visible'
            }" 
        />
    </div>
</template>

<script>
import PostForm from '../components/PostForm.vue'
import PostList from '../components/PostList.vue'
import { usePostsStore } from '../stores/posts'
import { useUserStore } from '../stores/user'
import { mapActions, storeToRefs } from 'pinia'
import { watch } from 'vue';

export default {
    setup() {
        const postStore = usePostsStore()
        const userStore = useUserStore()
        const { page } = storeToRefs(postStore)
        watch(page, () => {
            postStore.fetchPosts()
        })
        return {
            inputType: "text",
            inputPlaceholder: "Search",
            postStore,
            userStore
        }
    },
    methods: {
        ...mapActions(usePostsStore, ['addPost', 'deletePost', 'fetchPosts', 'setSocket']),
    },
    components: { PostForm, PostList },
    mounted() {
        if(!this.postStore.posts.length) {
            const socket = new WebSocket('ws://quiet-bayou-70608.herokuapp.com/')
            this.setSocket(socket)
            this.fetchPosts()
        }
    },
    computed: {
        sortedPosts() {
            return this.postStore.sortedPosts
        },
        sortedAndSearchedPosts() {
            return this.postStore.sortedAndSearchedPosts
        }
    }
}
</script>

<style>
.search {
    width: 300px;
    position: absolute;
    top: 9.65rem;
    left: 16rem
}
</style>