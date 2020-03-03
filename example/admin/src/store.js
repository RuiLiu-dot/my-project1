import Vue from 'vue';
import Vuex, { Store } from 'vuex';

// 安装
Vue.use(Vuex);

// 实例化
export default new Store({
    // 数据
    state: {
        // 用户名
        // username: 'ickt'//有用户，则会显示主页，没有则会显示登录页面
        username: ''
    },
    // 登陆成功，发送同步消息
    mutations: {
        // 更新用户名
        updateUsername(state, username) {
            // 直接存储
            state.username = username;
        }
    }
})