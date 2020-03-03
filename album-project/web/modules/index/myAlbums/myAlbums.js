// 这里是入口文件
define(function(require, exports, module) {
    // 引入工具模块
    let tools = require('../../tools/tools');
    // 引入观察者对象
    let Observer = tools.Observer;
    // 获取元素  父容器
    let $albumList = $('#myAlbumList');//获取我的相册的父元素
    // 获取token
    let token = localStorage.getItem('token');
    // 发送请求
    $.ajax({
        url: '/getUserAlbumList',//该接口是处理相册列表时用的接口，在这里也可以用
        type: 'get',
        dataType: 'json',
        data: {
            token
        },
        success(res) {
            // console.log('myAlbumList', res);
            if (!res.error) {
                // 遍历渲染视图
                res.data.forEach(item => {
                    $albumList.append(
                        `    
                         <li class="list-group-item col-lg-3 text-center" data-albumName="${item.albumName}">                                            
                            <div class="panel panel-info">
                                <div class="panel-body">
                                   <div class="img">
                                    <img src="/web/images/floder.jpg" alt="">
                                   </div>
                                </div>
                                <div class="panel-footer"><a href="/web/html/userAlbums.html?albumName=${item.albumName}">${item.albumName}</a></div>
                              </div> 
                         </li>                      

                        `
                    )
                })
            }
        }
    })
 
// 观察者对象的监听事件，当在管理相册中点击添加时，会触发该事件，在这里监听触发时需要执行的东西，因为这里要添加该内容
    // 监听updateAlbumList   
    Observer.on('updateAlbumList', name => {
        $albumList.append(
            `    
             <li class="list-group-item col-lg-3 text-center" data-albumName="${name}">                                            
                <div class="panel panel-info">
                    <div class="panel-body">
                       <div class="img">
                        <img src="/web/images/floder.jpg" alt="">
                       </div>
                    </div>
                    <div class="panel-footer ">${name}</div>
                  </div> 
             </li>                      

            `
        )
    })

//     // 监听deleteUserAlbumList
    Observer.on('deleteUserAlbumList', name => {
        console.log('已经删除相册列表');
        
        $albumList.children('li').each(function(index, item){
            // console.log('myalbum',item);
            // console.log($(this))
            if ($(item).attr('data-albumName') === name){
               
                // 获取上面的自定义属性删除对应的li
                $(this).remove();
                //通过找到其父元素，去删除当前的li元素
                // jquery中的each方法，参数刚好反过来，原生forEach(function(item,index))           
                //箭头函数的外层若没有作用域，则内部指向window，所以each这里使用一般函数
            }
        })
    })
})