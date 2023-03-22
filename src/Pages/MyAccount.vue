<template>
    <div>
        It,s my Account
    </div>
    <div>
        Email: {{ userStore.user.email }}
    </div>
</template>

<script>
import { useUserStore } from '../stores/user'

export default {
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    mounted(){
    }
}
</script>

<style scoped>

</style>