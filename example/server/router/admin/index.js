//实现服务器端登录后台管理系统页面，而不是mock数据
let { Router } =require('express');

//实例化
module.exports=new Router()
    .post('./admin/login',require('./manager/login'))
