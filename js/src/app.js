// Import Vue
import Vue from 'vue';
// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';
// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';
// Import F7 Styles
import 'framework7/css/framework7.bundle.css';
// Import prevent repeat click button
import preventReClick  from "./util/preventRepeatClick";'util/preventRepeatClick';
Vue.use(preventReClick);
// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';
// Import App Component
import App from './app.vue';
//Import Vuex
import store from './store';
import {post,get,patch,put} from './http/index.js'

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888'

//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  store,
  // Register App Component
  components: {
    app: App
  }
});
