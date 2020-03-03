<template>
<div class="page-list">
    <!-- 1：input事件 -->
    <!-- <input type="text" v-model="msg"> -->
    <!-- 数据由模型进入视图，数据由视图进入模型 -->
    <!-- <input type="text" :value="msg" @input="demo"> -->
    <!--:2：简化上面的操作 -->
    <!-- <input type="text" :value="msg" @input="e => this.msg = e.target.value"> -->
    <!-- 防止数据丢失 -->
    <!-- <input type="text" :value="msg" @input="e => this.$set(this, 'msg', e.target.value)"> -->
    <!-- 3：对search组件实现数据双向绑定 -->
    <!-- <Search v-model="msg"></Search> -->
    <!-- 添加提示内容 -->
    <!-- <Search placeholder="请输入搜索内容" :search="search"></Search> -->
    
    <!-- 注意：搜索框可以在任何页面，产生的数据要给list页面使用，因需要被多组件共享，所以我们可以将搜索的内容发送的store中存储 -->
    <Search placeholder="请输入搜索内容" :search="e => $store.commit('updateSearch', e)"></Search>
    <!-- 排序模块 -->
    <ul class="orders">
        <li v-for="item in orders" :key="item.id" @touchend="orderList(item.id)">{{item.text}}</li>
    </ul>
    <!-- 商品 -->
    <!--1： 服务器端搜索 -->
    <Product v-for="item in list" :key="item._id" :data="item"></Product>
    <!--2： 前端搜索 -->
    <!-- <Product v-for="item in dealList" :key="item._id" :data="item"></Product> -->
    <!-- 查看更多按钮 -->
    <!-- <div class="loader-more" @touchstart="showMore"> -->
    <!-- 注意：避免点击穿透 ，：点击按钮，触发了底层链接元素 -->
    <div class="loader-more" @touchend="showMore" v-show="others.length">
        <span>查看其它{{others.length}}条商品</span>
    </div>
</div>
</template>
<style scoped lang="scss">
// 书写排序样式 
@import '../base.scss';
.page-list {
    .orders {
        background: #fff;
        display: flex;
        height: 36px;
        line-height: 36px;;
        font-size: 12px;
        li {
            width: (100%/4);
            text-align: center;
            border-bottom: 1px solid #ccc;
            border-right: 1px solid #ccc;
            &:last-child {
                border-right: none;
            }
            &:after {
                @include arrow(4px);
                content: "";
                position: relative;
                left: 2px;
                top: -2px;
            }
        }
    }
    .loader-more {
        height: 50px;
        line-height: 50px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        text-align: center;
        text-indent: -10px;
        span {
            position: relative;
            color: $navColor;
            &:before,
            &:after {
                @include arrow(8px, $navColor, top);
                content: "";
                position: absolute;
                right: -20px;
                top: 10px;
            }
            &:after {
                border-top-color: #fff;
                right: -20px;
                top: 7px;
            }
        }
    }
}
</style>
<script>
// 引入组件 Search，Product
import Search from '@/components/Search';
import Product from '@/components/Product';
export default {
    // 注册组件
    components: { Search, Product },
    // 数据
    data() {
        return {
            // msg: 'hello'
            // 排序数据
            orders: [
                { text: '价格排序', id: 'price' },
                { text: '销量排序', id: 'sales' },
                { text: '好评排序', id: 'evaluate' },
                { text: '优惠排序', id: 'discount' }
            ],
            // 数据驱动视图 
            list: [],
            others: []
        }
    },
    // 计算属性数据
    computed: {
        // 对list过滤   忽略大小写，转化成大写比较
        dealList() {
            return this.list.filter(item => item.title.toUpperCase().indexOf(
                    this.$store.state.search.toUpperCase()
                ) >= 0)
        },
        // 代理state数据
        storeSearch() {
            return this.$store.state.search;
        }
    },
    // 方法
    methods: {
        // 展示更多商品
        showMore() {
            // 延迟更新
            setTimeout(() => {
                // 数据驱动视图
                this.list = this.list.concat(this.others);
                // 所有的数据都显示了
                this.others = [];
            }, 300)
        },
        // 商品排序
        orderList(id) {
           //后端排序，就是发送请求根据返回的结果排序  尽量使用后端排序
            this.$http
                .get('/data/order', {
                    // 排序字段
                    id,//通过  id字段数据进行排序
                    // 分类
                    type: this.$route.params.id,
                    // 升序还是降序
                    desc: 1 //1为升序 0为降序
                })
                // 监听结果
                .then(({ data }) => {
                    // console.log(data)
                    // 如果没有数据
                    if (!data.length) {
                        alert('没有数据')
                    }
                    // 更新视图就是更新数据
                    this.list = data.slice(0, 3);//上方list初始化数据时，数据驱动视图，只需要出现0-3的数据
                    this.others = data.slice(3);
                })
        },
        //第一步：首先 获取数据
        getData() {
            // console.log('success')
            // console.log(this.$route)
            // 解构params
            let { params } = this.$route;
            // 发送请求
            this.$http
                // 同名省略
                .get('/data/list', { params })
                // 监听数据返回
                .then(({ data }) => {
                    // 如果没有数据
                    if (!data.length) {
                        alert('没有数据')
                    }
                    // 存储数据
                    // 数据驱动视图
                    this.list = data.slice(0, 3);
                    // 存储剩余的数据
                    this.others = data.slice(3);
                })
        }
    },
    // 组件创建前
    created() {
        // 获取数据
        this.getData();
    },
    // 监听器 监听路由的变化：全局路由守卫，局部。。，，watch
    watch: {
        // 监听路由数据改变
        $route() {
            // 获取数据
            this.getData();
        },
        // 监听代理的数据
        storeSearch(value) {
            // console.log(value)
            // 向服务器端发送请求
            this.$http
                .get('/data/search', {
                    // 搜索词
                    value,
                    type: this.$route.params.id
                })
                // 监听数据返回
                .then(({ data }) => {
                    // console.log(data)
                    // 如果没有数据
                    if (!data.length) {
                         alert('没有数据')
                    }
                    // 更新视图
                    this.list = data.slice(0, 3);
                    this.others = data.slice(3);
                    // console.log(this)
                })
        }
    }
}
</script>