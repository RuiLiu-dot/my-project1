<template>
<router-link :to="'/detail/' + data._id" class="ickt-product">
    <div class="inner">
        <img :src="data.img" alt="">
        <div class="content">
            <h3>{{data.title}}</h3>
            <p class="info">
                <span class="price">{{data.price}}元</span>
                <span class="origin-price">门市价:{{data.originPrice}}元</span>
                <span class="sales">销量{{data.sales}}</span>
            </p>
        </div>
    </div>
</router-link>
</template>
<style scoped lang="scss">
// 书写product样式，并引入样式库
@import '../base.scss';
.ickt-product {
    background-color: #fff;
    display: block;
    color: #000;
    text-decoration: none;
    .inner {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        display: flex;
        img {
            width: 100px;
            height: 60.5px;
        }
        .content {
            flex: 1;
            margin-left: 10px;
        }
        h3 {
            font-size: 16px;
            height: 39px;
        }
        .info {
            font-size: 12px;
            display: flex;
            .price {
                color: $navColor;
                margin-right: 4px;
            }
            .origin-price {
                color: #666;
                flex: 1;
            }
        }
    }
}
</style>
<script>
export default {
    // 接收数据
    props: ['data']
}
</script>