<template>
<div class="page-login">
    <div class="login-inner">
        <!-- from表单 -->
        <h1>请您登录</h1>
        <el-form label-width="100px" :model="data" :rules="rules" ref="login">
             <el-form-item label="用户名:" prop="username">
                 <el-input placeholder="请输入用户名" v-model="data.username"></el-input>
             </el-form-item>
             <el-form-item label="密 码:"  rop="password">
                 <el-input placeholder="请输入密码" v-model="data.password" type="password"></el-input>
             </el-form-item>
             <el-button type="success" @click="loginData">登录</el-button>
        </el-form>
    </div>
</div>
</template>
<style lang="scss">
// 登录样式
.page-login {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #efefef;
    .login-inner {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 400px;
        padding: 25px;
        border-radius: 20px;
        margin-top: -200px;
        margin-left: -200px;
        background:white;
        font-size: 16px;
        h1 {
            font-weight: normal;
            padding-bottom: 10px;
            border-bottom: 1px solid #efefef;
            text-align: center;
            font-size: 24px;
        }
        .el-button {
            display: block;
            width: 20%;
            margin: auto;
            font-size: 14px;
            border-radius: 15px;

        }
    }
}
</style>
<script>
// 引入校验方法
import { checkUsername,checkPassword }from '@t/validator'
export default {
    // 数据
    data() {
        return {
            data: {},
            // 校验规则
            rules: {
                //用户名
                username: [
                    // trigger什么时候校验, require 是否是必填项 message: 提示信息 validator：校验方法  每一个成员为一条规则
                    { trigger: 'blur', validator: checkUsername }
                ],
                // 密码
                password: [
                    { trigger: 'blur', validator: checkPassword }
                ]
            }
        }
    },
    //对表单进行提交校验：1：绑定事件   2：设置ref属性  3：在事件回调函数中进行校验

    methods: {
        // 提交数据  提供validata方法校验字段
        loginData() {
            console.log(this) //$refs: {login: VueComponent} => validate: ƒ ()
            this.$refs.login
                // 校验
                .validate(valid => {
                    // 如果合法 当为true时，可提交数据
                    if (valid) {
                        this.$http
                            .post('/admin/login', this.data)
                            // 监听结果
                            .then(({ data }) => {
                                // 登录成功则显示首页
                                if (data.error === 0) {
                                    // 如果成功，向store。js存储数据
                                    this.$store.commit('updateUsername', data.data)
                                } else {
                                    this.$message.error(data.msg)
                                }
                            })
                    }
                })
        }
    }
}
</script>