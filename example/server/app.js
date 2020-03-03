// 引入express
let express = require('express');
// 引入ejs
// let ejs = require('ejs');
let middleware=require('./middleware');
//引入路由
let router=require('./router');//index.js文件可以沈略不写
let server=require('./server');
// 创建应用
let app = express();
//使用中间件
middleware(app);//

//使用路由
router(app);

//使用服务器
server(app);

//引入mock数据
let mock=require('./mock');
mock(app);

//test接口
// app.get('/test', (req, res) => {
//     // 引入操作集合的方法
//     let { collection } = require('./db');
//     // 操作集合
    // collection('test', res, ({ db, col }) => {
    //     // 操作集合
    //     col.insertOne({ msg: 'hello2' })
    // })
// })



//不能每次都要对数据库进行操作，可以封装到一个文件包里
// 操作数据库
// app.get('/test', (req, res) => {
//     // 操作数据
//     let { MongoClient }=require('mongodb');
//     // 数据库地址
//     let mongoUrl='mongodb://localhost:27017';
//     // 数据名称
//     let mongoName= 'ickt_28_vue_liurui';
//     // 链接数据库
//     MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
//         // 如果有错误
//         if (err) {
//             // 提示用户
//             res.json({ errno: 1, msg: '数据库错误' });
//             // 关闭数据库
//             client.close();
//             // 终止执行
//             return;
//         }
//         // 正常操作数据库
//         // 获取数据库
//         let database = client.db(mongoName);
//         // 操作集合
//         database.collection('test')
//             // 插入
//             .insertOne({ msg: 'hello' }, (err, data) => {
//                 // console.log(err, data)
//                 // 如果有错误
//                 if (err) {
//                     res.json({ errno: 2, msg: '插入数据错误' })
//                     // 关闭数据库
//                     client.close();
//                     // 终止执行
//                     return;
//                 }
//                 // 成功
//                 if (data.result.n > 0) {
//                     // 返回客户端成功的消息
//                     res.json({ errno: 0, msg: 'success' });
//                     // 关闭数据库
//                     client.close();
//                     // 终止执行
//                     return;
//                 }
//                 // 插入失败
//                 res.json({ errno: 3, msg: '没有插入数据' });
//                 // 关闭数据库
//                 client.close();
//             })
//     })
// })



// 引入服务器
// let http = require('http')
// let https = require('https')
// let fs = require('fs');
// let path = require('path');


// ejs修改拓展名  放在confts中的index.js中
// app.engine('.html', ejs.__express);

// // 静态化目录
// app.use('/static/', express.static(path.join(process.cwd(), './static/')))
// // logo
// app.use('/favicon.ico', express.static(path.join(process.cwd(), './static/favicon.ico')))


// 前端接口
// app.get('/', (req,res) => {
//     // 渲染页面
//     // res.render('index.html')
//     // res.render('home.html')
//     res.render('home.html')
// })


//引入中间件去设置后台管理系统接口
// app.get('/admin', (req,res) => {
//     // 渲染页面
//     // res.render('index.html')
//     // res.render('home.html')
//     res.render('admin.html')
// })

// //中间件router 安装和配置分离放在index.js
// let router=new express.Router();
// router.get('/admin', (req,res) => {
//     // 渲染页面
//     // res.render('index.html')
//     // res.render('home.html')
//     res.render('admin.html')
// })
// app.use(router);

//设置登录接口
// app.post('/admin/login',(req,res)=>{
//     res.json({
//         error:0,
//         data:'ickt'
//     })
// })
// //登录修改管理员信息接口
// app.post('/admin/manager/update', (req,res) => res.json({
//     error: 0, 
//     data: 'ickt'
// }));

// //create页面
// //1:设置上传图片接口
// app.post('/admin/product/upload', (req,res) => res.json({ 
//     error: 0, 
//     data: '/static/img/list/01.jpg' 
// }))
// //2:创建商品接口
// app.post('/admin/product/create', (req,res) => res.json({ 
//     error: 0, 
//     data: 'success'
//  }))

//  //商品列表页面 删除商品列表
//  app.post('/admin/product/remove', (req,res) => res.json({ 
//      error: 0, 
//      data:'success'
// }))

// //更新数据
//  app.post('/admin/product/update', (req,res) => res.json({
//       error: 0, 
//       data: 'success'
//  }))


//  // mock数据  发送异步请求访问模拟数据 use包含get,post请求，且优先匹配，不能写在上面
// app.use('/data/', (req,res,next) => {
//     //添加拓展
//     // req.url += '.json' //返回 /home 没有.json后缀，所以要添加拓展名
//     // console.log(req.url)//获取数据成功 但后缀加到了query中去了
//     //切割路径
//     let arr = req.url.split('?');//不包含问号
//     //添加拓展名
//     arr[0] += '.json';
//     //拼接字符串
//     req.url = arr.join('?')
//     // 必须执行next
//     next();
// },  express.static(path.join(process.cwd(), './static/data/')))

// app.use('/admin/', (req,res,next) => {
//     let arr = req.url.split('?');
//     //添加拓展名
//     arr[0] += '.json';
//     //拼接字符串
//     req.url = arr.join('?')
//     //必须执行next，负责无法执行下一步
//     next();
// },  express.static(path.join(process.cwd(), './static/data/')))

// // 端口号
// let httpPort = 3000;
// let httpsPort = 3001;
// // https 需要引入密钥
// let key = fs.readFileSync(path.join(process.cwd(), './ssl/private.pem'));
// let cert = fs.readFileSync(path.join(process.cwd(), './ssl/file.crt'));

// http.createServer(app)
//     .listen(httpPort, () => console.log('http port listen at ' + httpPort));
// https.createServer({ key, cert }, app)
//     .listen(httpsPort, () => console.log('https port listen at ' + httpsPort));
