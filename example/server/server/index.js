let http = require('http')
let https = require('https')
let fs = require('fs');
let path = require('path');
//引入端口号 consts=>index.js
let { HTTP_PORT,HTTPS_PORT }=require('../consts');

// 书写端口号 这样是死的，可以把它们作为默认端口号，在下面设置
let httpPort = HTTP_PORT;
let httpsPort = HTTPS_PORT;

// https 需要引入密钥
let key = fs.readFileSync(path.join(process.cwd(), './ssl/private.pem'));
let cert = fs.readFileSync(path.join(process.cwd(), './ssl/file.crt'));


module.exports= app => {
    //查看参数位置（前两个） 配置后面可写端口号
    console.log(process.argv)
    // let httpPort=process.argv[2] || HTTP_PORT;
    //第三项有值，则加1 
    // let httpsPort=process.argv[3] || (process.argv[2] ? +process[2]+1 : HTTPS_PORT);


    //设置tttp协议
    http.createServer(app)
    .listen(httpPort, () => console.log('http port listen at ' + httpPort));
    https.createServer({ key, cert }, app)
    .listen(httpsPort, () => console.log('https port listen at ' + httpsPort));
}