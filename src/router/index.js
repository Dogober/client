import { createRouter, createWebHistory } from 'vue-router'
import Posts from '../Pages/Posts.vue'
import Home from '../Pages/Home.vue'
import CurrentPost from '../Pages/CurrentPost.vue'
import Registration from '../Pages/Registration.vue'
import Login from '../Pages/Login.vue'
import MyAccount from '../Pages/MyAccount.vue'
import { useUserStore } from '../stores/user'

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/posts',
        component: Posts
    },
    {
        path: '/posts/:id',
        component: CurrentPost
    },
    {
        path: '/registration',
        component: Registration
    },
    {
        path: '/Login',
        component: Login,
    },
    {
        path: '/my_account',
        component: MyAccount,
        meta: {auth: true},
    }
]


const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if(to.meta.auth && !userStore.isAuth) {
        next('/login')
    } else {
        next()
    }
})

export default router