<template>
<div class="page-payment">
    <div class="price-part">
        <span class="pirce-title">商品总价:</span>
        <span class="price-num">￥{{$store.getters.price}}</span>
    </div>
    <div class="btns-part">
        <span class="btn-cancel" @touchend="$router.go(-1)">取消购买</span>
        <span class="btn-buy" @touchend="buyProducts">立即购买</span>
    </div>
    <h2 class="list-title">购买商品</h2>
    <!-- 遍历store中的数据：创建商品 -->
    <Product v-for="item in $store.state.products" :key="item._id" :data="item"></Product>
</div>
</template>
<style scoped lang="scss">
.page-payment {
    .price-part {
        background: #fff;
        padding: 30px 15px 20px;
        font-size: 18px;
        font-weight: bold;
        .price-num {
            color: orange;
            font-size: 30px;
            margin-left: 5px;
        }
    }
    .btns-part {
        padding-bottom: 20px;
        background: #fff;
        text-align: center;
        span {
            font-size: 12px;
            padding: 6px 15px;
            color: #fff;
            background: #aaa;
            border-radius: 4px;
            margin: 0 5px;
            font-family: "宋体";
            &.btn-buy {
                background: #f30;
            }
        }
    }
    .list-title {
        background: #fff;
        font-size: 20px;
        font-weight: normal;
        padding: 10px;
    }
}
</style>
<script>
// 引入组件
import Product from '@/components/Product';
export default {
    // 注册组件
    components: { Product },
    // 定义方法
    methods: {
        // 购买商品
        buyProducts() {
            // 发送请求
            this.$http
                .post('/data/buy', this.$store.state.products.map(item => item._id))
                // 监听数据返回
                .then(({ data }) => {
                    // 如果成功
                    if (data.errno === 0) {
                        alert('购买成功');
                    }
                })
        }
    }
}
</script>