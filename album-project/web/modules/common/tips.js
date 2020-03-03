define(function(require, exports, module) {
	// 引入工具模块
	let tools = require('../tools/tools.js');
	// 引入观察者对象 
	
	let Observer = tools.Observer;
	// 获取元素
	let $myModal = $("#myModal")
	let $modal_body = $(".modal-body")
	// 监听msg消息
	Observer.on('msg', function(str) {
		// 执行模态框
		$myModal.modal();//一个属性方法(模态框)
		// 改变内部文本
		$modal_body.html(str);
		
	})

})

