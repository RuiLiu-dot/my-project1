define(function(require, exports, module) {
	let $allUserList = $('#allUserList');
	$.ajax({
		url: '/requestAllUserList',
		type: 'get',
		dataType: 'json',
		success(res) {
			console.log(res);

			// 遍历数组 渲染视图
			res.data.forEach(item => {
				$allUserList.append(
					`
					<li class="list-group-item col-lg-3 text-center">
                        <div class="panel panel-default">
                            <div class="panel-body">
                               <div class="img">
                                   <img src="/web/images/floder.jpg" alt="">
                               </div>
                            </div>
							<div class="panel-footer">
							<a href="/web/html/showUserShareAlbum.html?username=${item.username}">${item.username}</a>							
							</div>
                        </div>
                    </li>
					`
				)
		 })
          
		}
	})
})