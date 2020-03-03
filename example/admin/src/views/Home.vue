<template>
<!-- 首页布局start -->
<el-container class="page-home">

    <el-header class="home-header">
        <router-link tag="h1" to="/">爱创课堂后台管理系统</router-link>
        <div>您好 <strong>{{$store.state.username}}</strong>  欢迎回来!<a href="/admin/logout"> 退出</a></div>
    </el-header>
<!-- 左边列表模块展示start -->
    <el-container>
         <el-aside width="230px">
          <el-menu :router="true">
              <el-submenu v-for="(item, index) in menu" :key="index" :index="String(index)">
                  <!-- 不引入元素，可以使用template -->
                  <template slot="title">
                      <!-- 引入图标 -->
                      <i class="el-icon-menu"></i>
                      <span>{{item.name}}</span>
                  </template>
                  
                  <el-menu-item v-for="childItem in item.children" :key="childItem.link" :index="childItem.link">{{childItem.name}}</el-menu-item>
              </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>
<style lang="scss">
.page-home {
    height: 100%;
    .home-header {
        display: flex;
        margin-bottom: 15px;
        div {
            padding-top: 30px;
            a{
                text-decoration: none;
                color: orange;
            }
        }
        h1 {
            flex: 1;
        }
    }
    .el-header,
    .el-main,
    .el-aside{
        background: #fff;
    }
    .el-main {
        margin-left: 10px;
    }
    // 将title写到父组件中，所有的子组件都可以接受到该样式
    .page-title{
        font-size: 25px;
        font-weight: normal;
        
    }
    .el-form{
        border-top: solid 2px #efefef;
        padding: 20px 0px;
        font-size: 14px;
    }
    .el-input,
    .el-textarea,
    .el-select{
        width: 50%;
    }

}
</style>
<script>
export default {
    data(){
        return{
            menu:[
                {
                    name:'商品模块',
                    children:[
                        {
                          name:'创建商品',link:'/product/create'},
                        { name: '商品列表', link: '/product/list/1'}
                    ]
                },
                {
                    name: '首页模块',
                    children: [
                        
                           { name: '首页广告', link: '/product/create'},
                           { name: '首页分类', link: '/product/list/1'}

                    ]

                },
                {
                    name:'用户模块',
                    children: [
                        { name: '创建用户', link: '/user/create'},
                        { name: '用户列表', link: '/user/list/1'}
                    ]
                },
                {
                    name:'新闻导航模块',
                    children:[
                        { name: '创建新闻', link: '/news/create'},
                        { name: '新闻列表', link: '/news/list/1'}
                    ]
                }

            ]
        }
    }
}
</script>