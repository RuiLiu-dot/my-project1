<template>
<div class="page-home">
    <!-- 加载首页时，不需要列表页，详情页等，快速把页面加载粗来 -->
    <!-- 分类各类商品start   点击进入列表页list.vue(异步数据) -->
    <ul class="types">
        <router-link :to="'/list/' + item.id" tag="li" v-for="item in types" :key="item.id">
            <img :src="'/static/img/icon/' + item.img" alt="">
            <p>{{item.text}}</p>
        </router-link>
    </ul>
    <!-- 广告模块 不能使用ad，会有广告插入就是作为ad-->
    <ul class="ads">
        <router-link tag="li" to="" v-for="(item, index) in ad" :key="item._id">
            <h3 :class="'color-' + index">{{item.title}}</h3>
            <p>{{item.description}}</p>
            <img :src="item.url" alt="">
            <!-- 绝对路径 -->
        </router-link>
    </ul>
    <!-- 猜你喜欢start！！！  点击进入详情页details.vue(异步数据)-->
    <div class="guess">
        <div class="guess-title">猜你喜欢</div>
    </div>
    <!-- 引入product 下面父组件向子组件通信，引入item -->
    <Product v-for="item in list" :key="item._id" :data="item"></Product>
</div>
</template>
<style scoped lang="scss">
.page-home {
    .types {
        display: flex;     
        padding: 12px 0 6px;
        background: #fff;
        flex-wrap: wrap;
        li {
            width: 20%;
            text-align: center;
            img {
                width: 60%;
            }
            p {
                font-size: 14px;
                margin: 5px 0 10px; 
            }
        }
    }
    .ads {
        background-color: #fff;
        margin-top: 10px;
        display: flex;
        li {
            width: 33%;
            flex: 1;
            border-right: 1px solid #ccc;
            text-align: center;
            padding: 15px 0 20px;
            &:last-child {
                border-right: none;
            }
            img {
                width: 60%;
            }
            h3 {
                font-size: 16px;
                font-weight: normal;
            }
            p {
                font-size: 12px;
                color: #666;
                margin: 8px 0;
            }
            //定义索引值
            $n: 0;
            // 循环语句
            @each $color in red, green, purple {
                //设置类
                .color-#{$n} {
                    color: $color;
                }
                //更改索引值
                $n: $n + 1;
            }
        }
    }
    .guess {
        background: #fff;
        margin-top: 10px;
        .guess-title {
            border-bottom: 1px solid #ccc;
            margin: 0 10px;
            padding: 15px 0 10px;
            font-size: 20px;
        }
    }
}
</style>
<script>
// 引入共享组件 Product
import Product from '@/components/Product';
export default {
    // 注册组件
    components: { Product },
    // 数据 移动端模拟数据时，与服务器端的层级结构要相同
    data() {
        return {
            types: [
                { id: 1, img: '01.png', text: '美食' },
                { id: 2, img: '02.png', text: '电影' },
                { id: 3, img: '03.png', text: '酒店' },
                { id: 4, img: '04.png', text: '休闲' },
                { id: 5, img: '05.png', text: '外卖' },
                { id: 6, img: '06.png', text: 'KTV' },
                { id: 7, img: '07.png', text: '丽人' },
                { id: 8, img: '08.png', text: '周边游' },
                { id: 9, img: '09.png', text: '小吃' },
                { id: 10, img: '10.png', text: '火车票' }
            ],
            // 避免数据丢失，将数据初始化。
            ad: [],
            list: []
        }
    },
    // 组件创建完成后
    created() {
        // 获取数据 安装的axios数据$http
        //移动端需要获取服务器端数据时，需要启动服务器端！！！！！
        this.$http
            .get('/data/home')
            //发送请求时不能加home，但这样不会接收数据，需要轻易接口文档
            // 监听数据返回
            // .then(res=>console.log(res))
            .then(({ data }) =>{
                // 存储数据
                this.ad = data.ad;
                this.list = data.list;
                console.log(this)
            })
    }
}
</script>