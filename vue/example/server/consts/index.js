module.exports={
    //设置端口号，方便引入，默认是：3000,3001
    HTTP_PORT:3000,
    HTTPS_PORT:3001,
    
    MONGO_URL:'mongodb://localhost:27017',
    MONGO_NAME:'ickt_28_vue_liurui',

    STATICS:{
       '/static/': './static/',
       '/favicon.ico': './static/favicon.ico'
    },
    //设置db中返回的错误提示方法，进行复用
    MESSAGE:{
        success:{
            error:0,
            msg:'success'
        },
        dataBaseError:{
            error: 1,
            msg: '数据库链接失败'
        }
    }
}