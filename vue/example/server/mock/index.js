let path = require('path');
let express = require('express');

module.exports= app => {

app.post('/admin/login',(req,res)=>{
    res.json({
        error:0,
        data:'ickt'
    })
})
//登录修改管理员信息接口
app.post('/admin/manager/update', (req,res) => res.json({
    error: 0, 
    data: 'ickt'
}));

 //create页面
//1:设置上传图片接口
app.post('/admin/product/upload', (req,res) => res.json({ 
    error: 0, 
    data: '/static/img/list/01.jpg' 
}))
//2:创建商品接口
app.post('/admin/product/create', (req,res) => res.json({ 
    error: 0, 
    data: 'success'
 }))

 //商品列表页面 删除商品列表
 app.post('/admin/product/remove', (req,res) => res.json({ 
     error: 0, 
     data:'success'
}))

//更新数据
 app.post('/admin/product/update', (req,res) => res.json({
      error: 0, 
      data: 'success'
 }))

 
 // mock数据  发送异步请求访问模拟数据 use包含get,post请求，且优先匹配，不能写在上面
app.use('/data/', (req,res,next) => {
    //添加拓展
    // req.url += '.json' //返回 /home 没有.json后缀，所以要添加拓展名
    // console.log(req.url)//获取数据成功 但后缀加到了query中去了
    //切割路径
    let arr = req.url.split('?');//不包含问号
    //添加拓展名
    arr[0] += '.json';
    //拼接字符串
    req.url = arr.join('?')
    // 必须执行next
    next();
},  express.static(path.join(process.cwd(), './static/data/')))

app.use('/admin/', (req,res,next) => {
    let arr = req.url.split('?');
    //添加拓展名
    arr[0] += '.json';
    //拼接字符串
    req.url = arr.join('?')
    //必须执行next，负责无法执行下一步
    next();
},  express.static(path.join(process.cwd(), './static/data/')))  
}