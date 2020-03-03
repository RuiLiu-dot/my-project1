define(function(require,exports,module){
    // psdBtn ageBtn sexBtn uploadBtn 四个模块
    //注意：修改年龄、密码，不可能每次都要手动去修改ajax请求中的数据，
    //在这里要用表单序列化去获取数据，避免手动修改data
    let Observer = require('../../tools/tools.js').Observer;
    let $formPassword=$('#formPassword');
    let $formAge=$('#formAge');
    
    let  $psdBtn = $('#psdBtn');
    let $ageBtn=$('#ageBtn');
    let $sexBtn=$('#sexBtn');
    let $uploadBtn=$('#uploadBtn');
    
    //输入框
   let $psdInp=$('#psdInp');
   let $ageInp=$('#ageInp');
   let $formSex=$('#formSex');

   let $headInp=$('#headInp');//头像

   
    console.log($psdBtn);


   // 点击时候发送修改密码请求
	$psdBtn.click(function() {
		// 表单序列化
		let data = $formPassword.serialize();
		// console.log(data); //value=输入的内容 后台获取value，可得到数据
		let token = localStorage.getItem('token');
		// 处理query数据 将需要的数据转为字符串拼接
		data += '&' + 'token' + '=' + token + '&type=password';
		// console.log(data); //data $ key=value& 那个类型的输入框

		// 发送请求
		$.ajax({
			url: '/updateUserInfo',
			type: 'get',
			dataType: 'json',
			data,
			success(res) {
				console.log(res);
			}
		})

	})


	// 点击时候发送修改年龄请求
	$ageBtn.click(function() {
		let data = $formAge.serialize();
		// console.log(data);
		let token = localStorage.getItem('token');
		data += '&' + 'token' + '=' + token + '&type=age';
		// console.log(data);
		$.ajax({
			url: '/updateUserInfo',
			type: 'get',
			dataType: 'json',
			data,
			success(res) {
				console.log(res);
			}
		})

	})


	// 点击时候发送修改性别请求
	$sexBtn.click(function() {
		let data = $formSex.serialize();
		let token = localStorage.getItem('token');
		data += '&' + 'token' + '=' + token + '&type=sex';
		// console.log(data);
		$.ajax({
			url: '/updateUserInfo',
			type: 'get',
			dataType: 'json',
			data,
			success(res) {
				console.log(res);
			}
		})

    })
    
    $uploadBtn.click(function(){
        
        let file=$headInp[0].files[0];//获取上传的文件 第0项
        // console.log(file)//FileList {0: File(1385), length: 1}
        
        let fd=new FormData();//表单实例化 为构造函数
        let token=localStorage.getItem('token');

        //2
        fd.append('file',file);
        fd.append('token',token);
   
        $.ajax({
			url: '/uploadUserHeaderPic',
			type: 'post',
			dataType: 'json',
			data: fd,
			processData: false,
			contentType: false,
			success(res) {
				console.log(res);
				if (!res.error) {
					localStorage.removeItem('token');
					localStorage.setItem('token', res.newToken);
					// 观察者模式，事件触发 告诉nav模块更换头像
					Observer.trigger('uploadUserHeaderPic', res.img);
                }
            }

        })

    })


})
	

