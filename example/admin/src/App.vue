<template>
<div id="app">

    <!--v-if判断显示首页/登录页面  -->
    <!-- <home v-if="store.state.username"></home> -->
      <!-- 可以通过路由的方式渲染首页  首页是主路由-->
    <router-view v-if="$store.state.username"></router-view>
    <login v-else></login>
</div>
</template>
<style>
html,
body {
    background: #efefef;
    height: 100%;
}
#app {
    height: 100%;
}
body {
    padding: 0;
    margin: 0;
}
</style>
<script>
// 引入组件
import Home from '@v/Home'
import Login from '@v/Login';

export default {
    // 注册组件
    // components: { Home, Login },
    components: { Login },
    // 组件创建完成
    created() {
        // console.log('hello111', this.$http)
    }
}
</script>