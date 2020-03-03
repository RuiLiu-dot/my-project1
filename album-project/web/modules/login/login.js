define(function(require,exports,module){
    let $form_login=$('#form_login');
    let $btn=$('#btn');//括号里忘记写#

    $btn.click(function(){
        let data=$form_login.serialize();
        console.log(data);
        //有了表单序列化后可以发送请求
        $.ajax({
            url:'/login',//这里忘记写/
            type:'post',
            dataType:'json',
            data,
            success(res){
                console.log(res)
                //因为如果注册已经实现过了，没有错，信息已经保存在数据库中
                //将返回的数据保存在本地
                if(!res.error){
                    localStorage.setItem('token',res.token);
                    location.href = '/web/html/index.html';//跳转页面，为什么这里不是./
                }
            }
                
            
        })
    })
})

