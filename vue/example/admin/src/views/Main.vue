<template>
<div class="main-page">
    <h1 class="page-title">修改密码</h1>
    <!-- 修改内容：1：placeholder 2:babel  3:babel-width -->
    <el-form label-width="200px" :model='data' :rules='rules' ref="main">
        <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入用户名" v-model="data.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" v-model="data.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="密码重复"  prop="checkRepeat">
            <el-input placeholder="请重复输入密码"></el-input>
        </el-form-item>
 <!-- 提交校验:1 绑定事件, 2 ref, 3 this.$refs-->
        <el-form-item >
            <el-button type="success" @click="submitData">提交</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
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
 import{ checkUsername,checkPassword,checkRepeat} from '@t/validator';
export default {
    data(){
        return{
            data:{},
            rules:{
                 username: [{trigger:'blur', validator: checkUsername}],
                 password: [{trigger:'blur', validator: checkPassword}],
                //  checkRepeat: [{trigger:'blur', validator: checkRepeat}],
                 //传递参数
                 checkRepeat: [{trigger:'blur', validator: (...args)=>{
                     checkRepeat('密码',this.data.password, ...args)
                 }}],
            }
        }
    },
    methods:{
        resetData(){
            this.$refs.main.resetFields();
        },
        submitData(){
            this.$refs.main.validate(valid=>{
                if(valid){
                   let {username, password} = this.data;
                   //需要发送请求
                   this.$http
                        .post('/admin/manager/update', {username, password}) 
                        .then(({data}) => {

                            if(data.error===0){
                                return location.reload();//刷新页面
                            }
                            this.$message.error(data.msg); //提示错误
                        })
                }
            })
        }
    }
}
</script>
