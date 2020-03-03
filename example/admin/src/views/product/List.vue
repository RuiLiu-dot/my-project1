<template>
    <!-- 定义商品列表start -->
<div class="page-product-list">
    <h1 class="page-title">商品列表</h1>
    <div class="list">
        <el-card v-for="item in data" :key="item._id">
            <img :src="item.img" alt="">
            <h2>{{item.title}}</h2>
            <p class="status">
                <span class="price">￥{{item.price}}</span>
                <!-- 过滤器-->
                <span class="type">{{item.type|type}}</span>
            </p>
            <p class="sales">已销售{{item.sales}}份</p>
            <div class="card-btns">
                <router-link :to="'/product/edit/' + item._id" tag="el-button" class="el-button--success el-button--mini">修改</router-link>
                <el-button type="danger" size="mini" @click="removeItem(item._id)">删除</el-button>
            </div>
        </el-card>
    </div>
    <div class="btns">
        <!-- <el-button round>&larr;上一页</el-button>
        <el-button round>下一页&rarr;</el-button> -->
        <!-- 使用路由切换页面 class="is-round"变成圆角 页面如果小于1 ，默认值是1-->
        <!-- 可以给路由传递参数 -->
        <router-link :to="'/product/list/'+ (page<= 1 ? 1 : page-1)" tag="el-button" class="is-round">&larr;&emsp;上一页</router-link>
        <router-link :to="'/product/list/'+ (page+ 1)" tag="el-button" class="is-round">下一页&emsp;&rarr;</router-link>
    </div>
</div>
</template>
<style lang="scss">
.page-product-list {
    .btns {
        padding: 40px 0 60px;
        text-align: center;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .el-card {
        width: 260px;
        margin-bottom: 30px;
        padding: 0 10px;
        img {
            width: 220px;
            height: 130px;
            
        }
        h2 {
            font-weight: normal;
            font-size: 20px;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .status {
            display: flex;
            .price {
                flex: 1;
                color: rgb(214, 72, 37);
            }
        }
    }
}
</style>
<script>
// 引入分类数据
import { types } from '@t/allTypes';
export default {
    // 接收router中数据
    props: ['page'],
    // 数据
    data() {
        return {
            data: []
        }
    },
    //设置过滤器
    filters: {
        type(id) {
            let type=types.find(item => item.value == id);//在types中获取分类对象
            return type ? type.label : '其它';            //返回类型名称
        }
    },
    methods: {
        removeItem(id) {
        // console.log(this)
            this.$confirm('是否要删除商品？')
             // 想服务器发送请求删除商品列表
             .then(() => {
                this.$http
                    .post('/admin/product/remove', {id})
                    .then(({ data }) => {
                        // console.log(data)
                        if (data.error === 0) {
                            //成功刷新页面
                            return location.reload();
                        }
                        this.$message.error(data.message);
                    })
            })
            .catch(() => {})
        },
        // 获取list.json中数据
        getData() {
            // 解构路由数据
            let { params } = this.$route;
            this.$http
                .get('/admin/product/list', { params })
                .then(({ data }) => {
                    // console.log(data)
                    // 如果成功
                    if (data.error === 0) {
                        this.data=data.data;   //存储数据
                    } else {
                        // 提示错误
                        this.$message.error(data.msg)
                        // 没有数据，清空视图
                        this.data = [];
                    }
                })
         }
     },
     //组件创建完成后
     created() {
         // 获取数据
         this.getData();
     },
     //监听路由数据
     watch: {
         $route() {
             this.getData();
         }
     }
}
</script>