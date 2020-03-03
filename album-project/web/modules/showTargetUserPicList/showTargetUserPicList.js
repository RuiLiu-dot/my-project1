// 定义模块
define(function(require, exports, module) {
	// 加载nav模块
	require('../index/nav/nav.js');
	// 获取元素
	let $father = $('#userAlbumList');
	// 获取query数据
	let data = location.search.slice(1);
	
	// 发送请求
	$.ajax({
		url: '/showTargetUserPicList',
		type: 'get',
		dataType: 'json',
		data,
		success(res) {
			console.log(res);
			if (!res.error) {
				// 遍历数组 渲染视图
				res.arr.forEach(item => {
					$father.append(
						`
						<li class="list-group-item col-lg-3 text-center">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                   <div class="img">
                                       <img src="${item.pic_path}" alt="">
                                   </div>
                                </div>
                               <div class="panel-footer">${item.pic_name}</div>
                            </div>
                        </li>
						`
					)
				})
			}
		}
	})
})