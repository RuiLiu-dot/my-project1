<template>
    <!-- 定义商品列表start -->
<div class="page-product-list">
    <h1 class="page-title">用户列表</h1>
    <div class="list">
        <el-table :data="groupList" v-loading="loading">
            <el-table-column type="index" label="用户ID" align="center"></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="性别" prop="sex"></el-table-column>
            <el-table-column label="密码" prop="password"></el-table-column>
            <el-table-column label="电话" prop="telephone"></el-table-column>
            <el-table-column label="简介" prop="description"></el-table-column>
        </el-table>
            
    </div>
    <div class="btns">
        <!-- 使用路由切换页面 class="is-round"变成圆角 页面如果小于1 ，默认值是1-->
        <!-- 可以给路由传递参数 -->
        <router-link :to="'/product/list/'+ (page<= 1 ? 1 : page-1)" tag="el-button" class="is-round">&larr;&emsp;前一页</router-link>
        
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
    }
    .el-table{
        width: 300px;
        margin-bottom: 30px;
        padding: 0 10px;
       
        
    }
}
</style>
<script>
// 引入分类数据

</script>