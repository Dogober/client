import { createApp, markRaw} from 'vue'
import App from './App.vue'
import myComponents from './Ui/index.js'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
    },
    components,
    directives,
})

const app = createApp(App)

myComponents.forEach(component => {
    app.component(component.name, component)
})

app.use(vuetify)
    .use(pinia)
    .use(router)
    .mount('#app')
