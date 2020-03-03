// //定义登录接口内容,在index.js中写配置
// //1：引入数据库方法
// let db = require('../db');
// //2: 引入配置文件
// let consts = require('../consts');

// module.exports={...db,...consts};
// // module.exports={ ...db, ...consts };//将对象的属性进行复制，es6语法
// 引入数据库模块
let db = require('../db');
// 引入配置模块
let consts = require('../consts');

// 暴露接口
module.exports = { ...db, ...consts };