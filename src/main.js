import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// import { Button, Table, Input, Carousel, CarouselItem, BackTop, Divider, Layout, Menu, MenuItem, Submenu, Content, Icon, Sider, Form, FormItem, Row, Col } from 'iview';
// Vue.component('Button', Button);
// Vue.component('Table', Table);
// Vue.component('Input', Input);
// Vue.component('Carousel', Carousel);
// Vue.component('CarouselItem', CarouselItem);
// Vue.component('BackTop', BackTop);
// Vue.component('Divider', Divider);
// Vue.component('Layout', Layout);
// Vue.component('Menu', Menu);
// Vue.component('MenuItem', MenuItem);
// Vue.component('Submenu', Submenu);
// Vue.component('Content', Content);
// Vue.component('Icon', Icon);
// Vue.component('Sider', Sider);
// Vue.component('Form', Form);
// Vue.component('FormItem', FormItem);
// Vue.component('Row', Row);
// Vue.component('Col', Col);


Vue.config.productionTip = false;
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')

