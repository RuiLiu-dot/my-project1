//定义登录接口内容,在index.js中写配置
//1：引入数据库方法
// let {collection,end}=require('../../../db');//搭建一个tool.js引入

let tool = require('../../tool');//ttools文件中将db和consts一起引入
let {collection,end}=require('../../../db');
console.log(111,tool); //111 { collection: [Function: collection],

module.exports=(req,res)=>{
    res.json('sucess')
    console.log(req.body);//获取用户名和密码
    //操作集合
    collection('login',res,({db,col})=>{
        //存储数据在集合中
        col.insertOne(req.body);
    })
}