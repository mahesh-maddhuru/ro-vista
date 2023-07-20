import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import * as labsComponents from 'vuetify/labs/components'
import HighchartsVue from 'highcharts-vue'

const vuetify = createVuetify({
    directives,
    icons: {
        defaultSet: 'mdi'
    },
    components: {
        ...components,
        ...labsComponents,
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(HighchartsVue)
app.mount('#app')
