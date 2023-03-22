<template>
    <div class="nav" v-if="isAuth">
        <my-btn class="nav-btn" @click="$router.push('/')" :text="'Home'"/>
        <my-btn class="nav-btn" @click="$router.push('/posts')" :text="'Posts'"/>
        <my-btn class="nav-btn" @click="$router.push('/my_account')" :text="'My Account'"/>
        <my-btn class="nav-btn" @click="logOut" :text="'Log out'"/>
    </div>
    <div class="nav" v-if="!isAuth">
        <my-btn class="nav-btn" @click="$router.push('/')" :text="'Home'"/>
        <my-btn class="nav-btn" @click="$router.push('/posts')" :text="'Posts'"/>
        <my-btn class="nav-btn" @click="$router.push('/login')" :text="'Log in'"/>
        <my-btn class="nav-btn" @click="$router.push('/registration')" :text="'Registration'"/>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user';

export default {
    setup(){
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    name: 'my-nav',
    props: {
        isAuth: {
            type: Boolean,
            requied: true
        }
    },
    methods: {
        logOut(){
            this.userStore.setUser({})
            this.userStore.setAuth(false)
            localStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
    .nav-btn {
        color: rgb(94, 114, 114);
        font-weight: 700;
        border: none
    }
    .nav-btn:hover {
        transition: 0.2s;
        color: azure;
    }
    .nav {
        padding: 0 2rem;
        width: 100%;
        height: 3rem;
        display: flex;
        gap: 1rem;
        background: rgb(210, 234, 243);
    }
</style>