//定义与页面相关的规则
//中间件router 
let express=require('express');
let router=new express.Router();
// router.get('/admin', (req,res) => {
//     // 渲染页面
//     // res.render('index.html')
//     // res.render('home.html')
//     res.render('admin.html')
// })
router.get('/admin',require('./admin'))

//首页相关的路由配置 可以把home首页文件单独放在home。jszhonh 
// router.get('/', (req,res) => {
//     // 渲染页面
//     // res.render('index.html')
//     // res.render('home.html')
//     res.render('home.html')
// })
router.get('/',require('./home'))
//具体的实现在各自的文件中
module.exports=router;

//优化上面：
//引入router
// let { Router }=require('express') //解构
// //创建中间件
// let router=new Router();//变成小router

// //定义规则
// module.exports = router
//     .get('/',require('./home')) //首页
//     .get('/admin',require('./admin'))//后台