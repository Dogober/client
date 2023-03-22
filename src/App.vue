<template>
    <my-nav :isAuth="userStore.isAuth"/>
    <div class="app">
        <RouterView></RouterView>
    </div>
</template>

<script>
import { check } from './http/userAPI';
import { useUserStore } from './stores/user';
    export default {
        setup() {
            const userStore = useUserStore()
            return {
                userStore
            }
        },
        mounted() {
            check().then(userData => {
                console.log(userData)
                this.userStore.setAuth(true)
                this.userStore.setUser(userData)
            })
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .app {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        max-width: 650px;
        margin: auto;
        padding: 1rem;
    }
</style>