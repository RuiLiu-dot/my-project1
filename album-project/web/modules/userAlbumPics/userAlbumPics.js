// 定义模块
define(function(require, exports, module) {
  require('../index/nav/nav.js');

	let $uploadList = $('#uploadList');
	let $uploadInp = $('#uploadInp');
	let $uploadBtn = $('#uploadBtn');	

	$uploadBtn.click(function() {
		let fd = new FormData();//利用ajax中的构造函数进行表单序列化
		let arr = Array.prototype.slice.call($uploadInp[0].files);
		// console.log(arr); 获取上传的图片 将数据转为数组

		// 遍历数组
		arr.forEach(item => {
			// 添加数据
			fd.append('file', item);//(key,value) 追加图片
	})

		// 获取token 给谁上传
		let token = localStorage.getItem('token');
		// 获取query数据
		let query = location.search.slice(1);
		// 处理query数据
		let query_arr = query.split('=');
		// console.log(query_arr)

		// 1：以(key,value)，将上面追加 数据
		fd.append('token', token);
		// 追加query数据
		fd.append(query_arr[0], query_arr[1]);

		//:2：使用fd这个实例化对象，利用forEach查看内部结构
		fd.forEach(function(value, key) {
			// console.log(111, key, value);
		})

		// 发送请求
        $.ajax({
			url: '/uploadUserPic_list',
			type: 'post',
			dataType: 'json',
			data: fd,
			contentType: false,// 是否由Jquery去设置content-type字段
			processData: false,	// 是否由Jquery进行序列化 一定是false，上面已经序列化路
			success(res) {
				console.log(res);
				if (!res.error) {
					// 遍历数组渲染视图
					res.saveArr.forEach(item => {
						$uploadList.append(
                            `
                            <li class="list-group-item col-lg-3 text-center">                               
                            <div class="panel panel-info">
                                <div class="panel-body">
                                   <div class="img">
                                   <img src="${item.pic_path}" alt="">
                                   </div>
                                </div>
                                <div class="panel-footer ">${item.pic_name}</div>
                              </div> 
                            </li>    
							
							`
						)
					})
				}
			}
        })
    })

     

    let token = localStorage.getItem('token');
	// 获取相册名称
	let albumName = location.search.slice(1);
	// 处理query数据
	let data = albumName + '&' + 'token' + '=' + token;
	
	// 发送请求 请求所有的上传的图片
	$.ajax({
		url: '/requestUserPic_list',
		type: 'get',
		dataType: 'json',
		data,
		success(res) {
			// console.log(res);
			if (!res.error) {
				// 遍历数组 渲染到 页面上
				res.data.forEach(item => {
					$uploadList.append(
                        `
                        <li class="list-group-item col-lg-3 text-center">                               
                        <div class="panel panel-info">
                            <div class="panel-body">
                               <div class="img">
                               <img src="${item.pic_path}" alt="">
                               </div>
                            </div>
                            <div class="panel-footer ">${item.pic_name}</div>
                          </div> 
                        </li>    
                        
                        `
					)
				})
			}
		}
	})
})