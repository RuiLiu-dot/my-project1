import Vue from 'vue';// 引入vue和应用程序
import App from './App';// 引入应用程序
import ElementUI from 'element-ui';// 引入element-ui
import axios from 'axios';// 引入axios
import store from './store';// 引入store
import router from './router';//1： 引入路由
// 引入样式
import 'element-ui/lib/theme-chalk/index.css';//element-ui下引入css资源
//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
//富文本样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// 安装 
Vue.use(ElementUI);
Vue.prototype.$http = axios;

Vue.use(VueQuillEditor);

// 实例化应用程序
new Vue({
    // 前端渲染，需要上树
    render: h => h(App),
    // 注册store
    store,
    //2：注册路由
    router,
// 上树
}).$mount('#app')