let express = require('express');
// 引入ejs
let ejs = require('ejs');
// 引入服务器
// let http = require('http')
// let https = require('https')
// let fs = require('fs');
let path = require('path');
let session=require('express-session');
let bodyPaser=require('body-parser');
let {STATICS}=require('../consts');

//app接口
module.exports=app => {
    //ejs修改拓展名
   app.engine('.html', ejs.__express);
    //ejs模板
    app.set('view engine', 'ejs');
//session
   app.use(session({
       resave:true,
       saveUninitialized:false,
       secret:'ickt'//解析post请求参数
    }
   ));//使用session

//解析数据   注意发送的请求时json格式
app.use(bodyPaser.json())

   
   // 静态化目录配置
//    app.use('/static/', express.static(path.join(process.cwd(), './static/')))
//    // logo
//    app.use('/favicon.ico', express.static(path.join(process.cwd(), './static/favicon.ico')))
//遍历STATIC
  for(let key in STATICS ){
    //key:匹配的路径 value:静态化路径
    app.use(key,express.static(path.join(process.cwd(), STATICS[key])))
  
  }
}