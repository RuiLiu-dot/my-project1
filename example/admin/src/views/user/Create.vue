<template>
<div class="main-page">
    <h1 class="page-title">创建用户</h1>

    <!-- 修改内容：1：placeholder 2:babel  3:babel-width -->
    <el-form label-width="200px" :model='data' :rules='rules' ref="main">
        <el-form-item label="用户名:" prop="username">
            <el-input placeholder="请输入用户名" v-model="data.username"></el-input>
        </el-form-item>

        <el-form-item label="密码:" prop="password">
            <el-input placeholder="请输入密码" v-model="data.password" ></el-input>
        </el-form-item>

        <el-form-item label="电话:" prop="telephone">
            <el-input placeholder="请输入电话号码" v-model="data.telephone" ></el-input>
        </el-form-item>
    
        <!-- 性别 -->
        <el-form-item label="性别:" prop="sex">
           <el-radio-group v-model="radio">
             <el-radio :label="boy">男</el-radio>
             <el-radio :label="girl">女</el-radio>
           </el-radio-group>
        </el-form-item>

        <!-- 简介-->
        <el-form-item label="商品描述:" prop="description">
            <!-- 多行文本框 -->
            <el-input placeholder="请输入简介" v-model="data.description" type="textarea"></el-input>
        </el-form-item>
 <!-- 提交校验:1 绑定事件, 2 ref, 3 this.$refs-->
        <el-form-item >
            <el-button type="success" @click="submitData">提交</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<style lang="scss">
// .el-form-item{
//     .el-input{
//       width: 380px;
//     }
// }
</style>
<!-- 表单校验:1: v-model  2: model, 3: prop   4: rules -->
<script>
 import{ checkUsername,checkPassword,telephone } from '@t/validator';
export default {
    data(){
        return{
            data:{},
            rules:{
                 username: [{trigger:'blur', validator: checkUsername}],
                 password: [{trigger:'blur', validator: checkPassword}],
                 telephone: [{trigger:'blur', validator: telephone}],
                 
            }
        }
    },
    methods:{
        submitData(){
            this.$refs.main.validate(valid=>{
                if(valid){
                   let {username, password} = this.data;
                   //需要发送请求
                //    this.$http
                //         .post() 
                //         .then(({data}) => {

                //             if(data.error===0){
                //                 return location.reload();//刷新页面
                //             }
                //             this.$message.error(data.msg); //提示错误
                //         })
                }
            })
        }
    }
}
</script>
