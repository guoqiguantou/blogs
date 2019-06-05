import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(iView);

// use
Vue.use(mavonEditor)


Vue.config.productionTip = false;
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')

