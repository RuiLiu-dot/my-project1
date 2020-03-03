<template>
<div class="page-detail">
    <div class="image-part">
        <img :src="data.img" alt="">
        <h1>{{data.title}}</h1>
        <p>{{data.description}}</p>
    </div>
    <div class="price-part">
        <span class="price"><strong>{{data.price}}</strong>元</span>
        <span class="origin-price">门市价:{{data.originPrice}}元</span>
        <span :class="{
            sales: true,
            'has-buy': data.hasBuy
        }" @touchend="buyItem">{{data.hasBuy ? '取消购买' : '立即购买'}}</span>
    </div>
    <div class="sales-part">
        <li>支持立即退货</li>
        <li>支持随时退货</li>
        <li>销量:{{data.sales}}</li>
    </div>
    <!-- 店家信息 -->
    <div class="store-part module">
        <div class="module-header">店家信息</div>
        <div class="module-body">
            <p>{{data.storeName}}</p>
            <p>{{data.storeAddress}}</p>
        </div>
        <div class="module-footer">查看其它{{data.storeNum}}家分店</div>
    </div>
    <div class="buy-part module">
        <div class="module-header">购买须知</div>
        <div class="module-body" v-html="data.content"></div>
    </div>
    <ShoppingCar></ShoppingCar>
</div>
</template>
<style lang="scss">
@import "../base.scss";
.page-detail {
    padding-bottom: 70px;
    .image-part {
        position: relative;
        img {
            width: 100%;
            display: block;
        }
        h1,
        p {
            position: absolute;
            bottom: 15px;
            left: 10px;
            color: #fff;
        }
        h1 {
            bottom: 35px;
        }
    }
    .price-part {
        background: #fff;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        font-size: 16px;
        border-bottom: 1px solid #ccc;
        display: flex;
        .price {
            color: $navColor;
            margin-right: 6px;
            strong {
                font-size: 26px;
                font-weight: normal;
                vertical-align: bottom;
            }
        }
        .origin-price {
            flex: 1;
        }
        .sales {
            height: 20px;
            line-height: 20px;
            padding: 0 10px;
            font-size: 12px;
            color: #fff;
            background: #f30;
            border-radius: 4px;
            margin-top: 15px;
            &.has-buy {
                color: #333;
                background: #ddd;
            }
        }
    }
    .sales-part {
        display: flex;
        padding: 10px;
        flex-wrap: wrap;
        background: #fff;
        li {
            width: 50%;
            color: yellowgreen;
            line-height: 30px;
            &:last-child {
                color: #000;
            }
        }
    }
    .module {
        background: #fff;
        margin-top: 10px;
        padding: 10px;
        .module-header {
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
            font-size: 20px;
        }
        .module-body {
            padding: 10px 0;
            line-height: 30px;
            h1, h2, h3, h4, h5, h6 {
                color: #f30;
                line-height: 40px;
                font-size: 18px;
            }
        }
        .module-footer {
            padding: 10px 0;
            color: skyblue;
            border-top: 1px solid #ccc;
        }
    }
}
</style>
<script>
// 引入组件 ShoppingCar
import ShoppingCar from '@/components/ShoppingCar';
export default {
    // 注册组件
    components: { ShoppingCar },
    data() {
        return {
            data: {}
        }
    },
    methods: {
        // 购买商品事件
        buyItem() {
            // 1：发送更新购物车的消息，       、、在修改数据之前发送消息，语义化更强。
            this.$store.commit(this.data.hasBuy ? 'removeProduct' : 'addProduct', this.data)
            // 2：更改购买状态
            // this.data.hasBuy = !this.data.hasBuy;
            // console.log(this.data.hasBuy, this.data);
            //3: 避免数据丢失 使用$set（）
            this.$set(this.data, 'hasBuy', !this.data.hasBuy)
            //4：在修改数据后执行，要做相反的判断
            // this.$store.commit(this.data.hasBuy ? 'addProduct' : 'removeProduct', this.data)
        },
        // 第一步：获取数据  第二部：定义模板
        getData() {
            // 解构数据
            let { params } = this.$route;
            // 获取数据
            this.$http
                .get('/data/detail', { params })
                // 监听数据返回
                .then(({ data }) => {
                    // console.log(data)
                    // 如果没有数据
                    if (!data) {
                        alert('没有数据')
                    } else {
                        // 如果该商品在购物车中，设置hasBuy为购买状态
                        if (this.$store.state.products.find(item => item._id === data._id)) {
                            // 设置为购买状态
                            data.hasBuy = true;
                        }
                    }
                    this.data = data || {};
                })
        }
    },
    // 组件创建完成
    created() {
        // 获取数据
        this.getData();
    },
    // 监听器 路由监听
    watch: {
        // 路由改变的时候
        $route() {
            // 获取数据
            this.getData();
        }
    }
}
</script>