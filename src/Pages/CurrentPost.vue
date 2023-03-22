<template>
    <PostItem :post="postStore.currentPost" :showBtns="false"/>
</template>

<script>
import PostItem from '../components/PostItem.vue'
import { usePostsStore } from '../stores/posts'
import { useRoute } from 'vue-router'
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const postStore = usePostsStore();
        return { postStore };
    },
    mounted() {
        this.postStore.getCurrentPost(useRoute().params.id);
    },
    components: { PostItem }
})


</script>

<style scoped>

</style>