// 定义模块
define(function(require, exports, module) {
	// 策略对象
	let Strategy = (function() {
		// 定义存储对象
		let S = {
			username(str) {
				// 定义正则表达式
				let reg = /^[a-zA-Z]\w{6,12}$/;
				// 验证
				return reg.test(str) ? '' : '用户名是6-12位英文字符';
			},
			password(num) {
				let reg = /^\d{6,8}$/;
				// 验证
				return reg.test(num) ? '' : '密码是6-8位数字字符';
			}
		}

		// 返回接口对象
		return {
			use(name, str) {
				return S[name](str);//调用里面的某个方法
			}
		}
	})()

	// 观察者对象
	let Observer = (function() {
		// 定义存储对象
		let ob = {};

		// 返回接口对象
		return {
			//on方法用于向观察者对象中添加数据
			on(name, fn) {
				// 判断name项 是否存在
				//在相同数据下触发多个事件
				if (ob[name] instanceof Array) {
					ob[name].push(fn);
				} else {
					ob[name] = [fn];
				}
			},
		    //trigger方法用于发布消息
			trigger(name) {
				// 获取剩余参数(第一个参数是ob)
				let arg = Array.prototype.slice.call(arguments, 1);
				// 遍历
				for (let i = 0; i < ob[name].length; i++) {
					ob[name][i].apply(ob, arg)
					// 获取ob[name]中的每一项,第一个参数指向ob
				}
                   
			
			}
		}
	})()

	Observer.on('aaa', function() {})
	Observer.on('aaa', function() {})


	// 暴露接口
	module.exports.Strategy = Strategy;
	module.exports.Observer = Observer;
})