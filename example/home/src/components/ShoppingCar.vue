<template>
<div class="ickt-shopping-car">
    <!-- 引入price方法 -->
    <div class="price-btn">共 ￥{{$store.getters.price}} 元</div>
    <!-- 方式二：设置touchend事件进行跳转 -->
    <div class="buy-btn" @touchend="showPaymentPage">选好了</div>
<!-- 方式一：<router-link>标签 -->
</div>
</template>
<style scoped lang="scss">
// 首先给shoppingCar做定位 在最底部位置
.ickt-shopping-car {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    font-size: 20px;
    display: flex;
    background: #484d54;
    color: #fff;
    line-height: 50px;
    text-align: center;
    .price-btn{
        flex: 1;
    }
    .buy-btn {
        background-color: #fe2947;
        width: 100px;
    }
}
</style>
<script>
export default {
    // 方法2
    methods: {
        // 进入购买页面  通过路由的方式跳转页面到payment，这样可以进行判断。当store.js中products有数据时，才会进行跳转。
        showPaymentPage() {
            // 如果已经有商品加入购物车
            if (this.$store.state.products.length) {
                // 跳转页面
                this.$router.push('/payment')
            } else {
                // 提示用户
                alert('请将商品加入购物车！')
            }
        }
    }
}
</script>