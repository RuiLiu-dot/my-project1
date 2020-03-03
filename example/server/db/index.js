//封装操作数据库方法

//引入数据库模块
let { MongoClient } = require('mongodb');

// 引入数据库配置
let { MONGO_URL,MONGO_NAME, MESSAGE } = require('../consts');
//定义end()，1：返回数据:2：:关闭数据库  data：数据对象 db:客户端client
function end(res,data,db) {
    // 如果data是字符串
    if (typeof data === 'string') {
        res.json(MESSAGE[data])
    }else{
        res.json(data)
    }
    db.close();
}
//name:集合名称  res:响应对象   callback:获取数据库之后的回调
function collection(name,res,callback){
    //MONGO_URL   MONGO_NAME
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, client) => {
        if (err) {
          // 提示用户
        //   res.json({error: 1,msg: '数据库链接失败'});
        //   // 关闭数据库
        //   client.close();
        //   // 终止执行
        //   return;
        return end(res,'dataBaseError',client);
        }
        //没有问题，执行成功后的回调函数
        callback({
            col: client.db(MONGO_NAME).collection(name),//集合名称
            db: client                                  //客户端引用
        })

    })
}

module.exports={ collection,end };