define(function(require,exports,module){
    require('../index/nav/nav.js');
    let $shareList=$('#shareList');
    let data=location.search.slice(1);
    $.ajax({
        url:'/showUserShareAlbumList',
        type:'get',
        dataType:'json',
        data,    //用户名称 这里是固定的data，之前写成dataName，一直渲染不出来
        success(res){
            // console.log('showUserShareAlbumList',res)
            if(!res.error){
              res.data.forEach(item=>{
                 $shareList.append(
                  `
					<li class="list-group-item col-lg-2 text-center">
                        <div class="panel panel-default">
                            <div class="panel-body">
                               <div class="img">
                                 <img src="/web/images/floder.jpg" alt="">
                               </div>
                            </div>
                             <a href="/web/html/showTargetUserPicList.html?username=${item.username}&albumName=${item.albumName}">${item.albumName}</a>
                        </div>
                    </li>
					 `  
                    )
                })
            }
        }
    })
})