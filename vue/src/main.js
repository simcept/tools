import Vue from 'vue'
import App from './App.vue'
import apps from './data/apps'
import router from './router'
import './plugins/firebase'
import './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
  data: {
    apps
  }
}).$mount('#app')
