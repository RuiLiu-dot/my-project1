let express = require('express');
// 引入body-parser()
let body_parser = require('body-parser');//post请求中获取数据的中间件
// 创建应用程序
let app = express();
// 静态化目录
app.use('/web/', express.static('./web/'))//当前文件下

//静态化目录，关于user(存储用户信息)
app.use('/user/',express.static('./user/'))//  前缀：/user/  访问的静态目录 ./user/

// 配置body_parser
app.use(body_parser.urlencoded({ extended: false }));

// 引入router
let router = require('./server/router.js');
// 配置router
app.use(router);
// 监听端口号 我擦！！！！！！
app.listen(3000,()=>{console.log('your listener at 3000')});



