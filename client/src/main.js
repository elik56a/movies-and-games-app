import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import Api from './services/Api';


// global components
Vue.component('poster-image', () => import('@/components/Image'));
Vue.component('tooltip', () => import('@/components/Tooltip'));
Vue.component('alert', () => import('@/components/Alert'));

// prototypes
Vue.prototype.$Api = Api; // set the Api as global prototype

// filters
Vue.filter('capitalize', val => val.charAt(0).toUpperCase() + val.slice(1));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
