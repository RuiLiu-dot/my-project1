//引入页面相关的中间件
//admin,page中有各个页面
let page=require('./page');
// app.use(router);
let admin = require('./admin')
//通过接口访问
module.exports=app => {
    app.use(page);
    //后台服务器端登录页面
    app.use(admin);
}