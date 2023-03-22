import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        isAuth: false,
        user: {}
    }),
    getters: {},
    actions: {
        setAuth(isAuth) {
            this.isAuth = isAuth
        },
        setUser(user) {
            this.user = {...user}
        }
    },
})