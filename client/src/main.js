import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSuggestion from 'vue-suggestion'
import Vuesax from 'vuesax'

Vue.use(VueSuggestion)






Vue.config.productionTip = false
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../node_modules/@fortawesome/fontawesome-free/css/all.css');
require("../node_modules/vuesax/dist/vuesax.css");
require("material-icons/iconfont/material-icons.css");


Vue.use(Vuesax, {
  // options here
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
