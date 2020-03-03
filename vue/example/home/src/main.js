import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// 引入axios   异步数据 会变的
import axios from 'axios';


// Vue.config.productionTip = false

// 安装
Vue.prototype.$http=axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
