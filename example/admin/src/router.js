import Vue from 'vue';
//引入路由
import Router from 'vue-router';
import Home from '@v/Home';
// 引入组件
//1 商品的结构页面

//2 首页
import HomeAds from '@v/home/Ads';
import HomeTypes from '@v/home/Types';
//3 用户结构页面
import UserCreate from '@v/user/Create';
import UserList from '@v/user/List';
import UserEdit from '@v/user/Edit';
// 默认页面
import Main from '@v/Main';

// 安装
Vue.use(Router);

// 实例化
export default new Router({
    // 路由规则
    routes: [
        // 首页
        {
            path: '/',
            component: Home,  //默认是首页
            // 子路由
            children: [
                // 商品模块
                { path: '/product/create', component: () => import('@v/product/Create') },
                //给路由传递参数
                { path: '/product/list/:page', component: () => import('@v/product/List'),
                     props(route) {
                       return{
                           page: +route.params.page
                           //将page转换为数字
                       }
                }
            
                },
                { path: '/product/edit/:id', component: () => import('@v/product/Edit') },
                // { path: '/product/create', component:  ProductCreate  },
                // { path: '/product/list/:page', component: ProductList },
                // { path: '/product/edit/:id', component: ProductEdit },
                // 首页模块
                { path: '/home/ads', component: HomeAds },
                { path: '/home/types', component: HomeTypes },
                // 用户模块
                { path: '/user/create', component: UserCreate },
                { path: '/user/list/:page', component: UserList },
                { path: '/user/edit/:id', component: UserEdit },
                // 默认
                { path: '*', component: Main },
            ]
        }
    ]
})