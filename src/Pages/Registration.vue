<template>
    <form class="form" @submit.prevent>
        <h3>Registration</h3>
        <my-input
            v-model="user.email"
            :type="inputType.email" 
            :placeholder="inputPlaceholder.email" 
        />
        <my-input
            v-model="user.password"
            :type="inputType.password" 
            :placeholder="inputPlaceholder.password" 
        />
        <my-btn class="form_add" @click="send" :text="'Send'"/>
    </form>
</template>

<script>
import { registration } from '../http/userAPI'
import { useUserStore } from '../stores/user'

export default {
    setup() {
        const userStore = useUserStore()
        return {
            user: {
                email: '',
                password: ''
            },
            inputType: {
                email: "text",
                password: "password"
            },
            inputPlaceholder: {
                email: "Email",
                password: "Password"
            },
            userStore
        }
    },
    methods: {
        async send() {
            try {
                const response = await registration(this.user.email, this.user.password)
                this.userStore.setUser(response)
                this.userStore.setAuth(true)
                this.user = {
                    email: '',
                    password: ''
                }
                this.$router.push('/my_account')
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>

</style>