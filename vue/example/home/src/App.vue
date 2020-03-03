<template>
<div id="app">
    <Header>
        <div slot="left" class="arrow"></div>
        <router-link to="/" tag="h1">爱创课堂团购网站</router-link>
        <div slot="right">登录</div>
    </Header>
    <router-view/>
     <!-- <router-view/>这个是啥 -->
</div>
</template>
<style>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
html, body {
    background-color: #efefef;
}
</style>
<script>
// 引入Header组件
import Header from '@/components/Header';
export default {
        // 注册组件
        components: { Header }
}
</script>