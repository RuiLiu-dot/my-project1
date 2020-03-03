//nav.js 首页的导航部分的功能(渲染首页部分），index是首页的文件夹，里面装着首页各个部分的功能
define(function(require,exports,module){
    let $usernav=$('#nav');//引入usernav
    let Observer=require('../../tools/tools.js').Observer;
    
    $.ajax({
        url:'/usernavInfo',
        type:'get',
        dataType:'json',
        data:{
            token:localStorage.getItem('token')
        },   
        success(res){
            console.log(res)
           if(!res.error){
              
            $usernav.append( `
           
            <a href="/web/html/cut.html"><img src=${res.data. header_pic}></a>
            <span>${res.data.username}</span>
            <a href="#" id='exit'>退出</a>            
            `
            )
           }
            
            // data: {username: "wanglaowu", header_pic: "/user/wanglaowu/header_pic/default.png", }
            // error: 0__proto__: Object

        }
    })
    //事件委托
    $usernav.on('click','#exit',()=>{
        localStorage.removeItem('token');//（obj,secret)
        location.href='/web/html/login.html';

     
    })

    //对更换头像事件监听uploadUserHeaderPic
    Observer.on('uploadUserHeaderPic',function(img){
        $usernav.find('img').attr('src',img);
    })
})