// 定义模块
define(function(require, exports, module) {
	
	require('../common/tips.js');
	let tools = require('../tools/tools.js');
	
	// 引入策略对象、观察者对象
	let Strategy = tools.Strategy;
	let Observer = tools.Observer;
	
	// 获取元素
	let $username = $('#username');
	let $password = $('#password');
	let $rePassword = $('#rePassword');
	let $btn = $('#btn');
	let $form_regist = $('#form_regist');

	// let $myModal=$('#myModal');
	// let $modal_body=$('.modal_body');

	// 定义两个锁
	let username_lock = null;
	let password_lock = null;

	// 当失去焦点的时候验证用户输入的内容,触发模态框
	$username.blur(function() {
		// 获取输入的内容
		let val = $(this).val();//this.value
		
		let result = Strategy.use('username', val);
		
		console.log(result);
		if (result) {
			// 出错了，发布消息 trigger（触发的函数事件名称，rusult)
			Observer.trigger('msg', result);//'msg'事件，传递的参数会变为模态框内部文本
			username_lock = false;
			return;
		}

		// 执行到这里说明用户可以使用
		// 发送请求判断用户名是否存在
		$.ajax({
			url: '/checkName',//checkname就在这儿自己定义的
			type: 'get',
			dataType: 'json',
			data: {
				username: val
			},
			success(res) {
				console.log(res);
				// 无论返回成功或者是失败都要提示用户
				Observer.trigger('msg', res.data);
				if (!res.error) {
					// 说明这里没有错 开锁
					username_lock = true;
					return;
				}

				// 关锁
				username_lock = false;//这里是出现error
			}
		})
	})

	// $password.blur(function(){
	// 	let val=$(this).val();
	// 	let result=Strategy.use('password',val);
	// 	//console.log(result)如果result为真，说明有内容，格式不对
	// 	if(result){
	// 		Observer.trigger('msg',result)//执行模态框
	// 		password_lock=false;
	// 		return;
	// 	}
	// 	password_lock=true;
	// })
   
	// 当失去焦点的时候验证密码
	$password.blur(function() {
		// 获取输入的内容
		let val = $(this).val();

		// 使用策略对象
		let result = Strategy.use('password', val);
		// console.log(result);
		// 判断result结果
		if (result) {
			// 提示用户
			Observer.trigger('msg', result);
			// 关闭锁
			password_lock = false;
			return;
		}

		// 执行到这里说明密码没有问题
		password_lock = true;
	})

	// 确定密码
	$rePassword.blur(function() {
		// 获取密码中的内容
		let val = $password.val();
		// 获取当前输入的内容
		let value = $(this).val();
		// console.log(val, value);
		// 开始比较
		if (val === value) {
			// 处理其它逻辑
			password_lock = true;
			return;
		} 

		// 提示用户
		Observer.trigger('msg', '两次密码输入不一致，请检查');
		// 关闭锁
		password_lock = false;//false说明不正确
	})

	
	// 注册按钮
	$btn.click(function() {
		// console.log(username_lock)
		// console.log(password_lock)
		// 判断用户名与密码是否都正确,利用锁
		//如果等于false这说明有错
		
		if (!(username_lock && password_lock)) {
			Observer.trigger('msg', '请检查用户名或者是密码');
			return;
		} 

		// 可以注册
		console.log('可以注册了');

		$(this).attr('disabled',true);

		$.ajax({
			url:'/regist',
			type:'post',
			data:$form_regist.serialize(),//这里之前忘记写了，下次注意！！！
			dataType:'json',
			success(res){
			    if(!res.error){
				  Observer.trigger('msg',res.data);
				  
			      setTimeout(()=>{
				  	location.href='/web/html/login.html';//这个路径为什么要这样写
				  },1000)

				}
			} 
		})
		

	})

})