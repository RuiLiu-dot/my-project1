import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import List from './views/List'
import Detail from './views/Detail'
import Payment from './views/Payment'

Vue.use(Router)

export default new Router({
    routes: [
        // 分类页面
        { path: '/list/:id', component: List },
        // 详情页
        { path: '/detail/:id', component: Detail },
        // 购买页面
        { path: '/payment', component: Payment },
        { path: '*', component: Home },
    ]

})
