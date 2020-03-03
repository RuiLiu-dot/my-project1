define(function(require,exports,module){
    // 与我的相册通信
    let tools = require('../../tools/tools');
    let Observer = tools.Observer;

    let $addAlbumBtn=$('#addAlbumBtn');
    let $listGroup=$('#listGroup');//挖空的，之后要创建的数据
    let $albumInp=$('#albumInp');

    let token=localStorage.getItem('token');//token是存储在本地的
   
   
   $addAlbumBtn.click(function(){
       let albumName=$albumInp.val();
       $.ajax({
           url:'/albumBox',
           type:'get',
           dataType:'json',
           data:{
               albumName,
               token
           },
           success(res){
               console.log(res)
               if(!res.error){
                $listGroup.append(
                    `
                    <li class="list-group-item listGroup" data-albumName="${res.albumName}">
                         <p><span>${res.albumName}</span></p>
                         <p><input type="checkbox" class="inp"></p>
                         <p><span style="cursor: pointer;" data-albumName="${res.albumName}" id="del">&times;</span></p>
                     </li>
                   `
                )
                Observer.trigger('updateAlbumList', albumName)//触发我的相册模块事件
               }
           }
       })
   })
   

//都是从前端发送数据请求，点击发送请求，实现创建用户列表先存储在数据库中；之后再次请求查找数据库，渲染到页面上
//再次发送请求，保存数据
$.ajax({
    url:'/getUserAlbumList',
    type:'get',
    dataType:'json',
    data:{
        token
    },
    success(res){
     console.log(res)
     if(!res.error){
         //这里data是一个array
        res.data.forEach(item => {
             $listGroup.append(
                `
                <li class="list-group-item listGroup">
                  <p><span>${item.albumName}</span></p>
                  <p><input type="checkbox" data-albumName="${item.albumName}" class="inp" ${item.share === 'true' ? 'checked' : ''} ></p>
                  <p><span style="cursor: pointer;" data-albumName="${item.albumName}" id="del">&times;</span></p>
                  </li>
            `
                //插值语法 自定义属性，因为input的爸爸的兄弟是albumName，可以自定义属性指向albumName
             )  
        })
      }
    }

 })


//data: Array(2) 这里说明返回的是一个数组！！！！
// 0: {_id: "5e0c90b1b83dab8d904924d8", username: "wanglaowu", albumName: "dd", share: "false"}
// 1: {_id: "5e0c90b6b83dab8d904924d9", username: "wanglaowu", albumName: "ee", share: "false"}
// length: 2


//委托模式，给他的后代进行绑定 是否共享
$listGroup.on('click','input',function(){
    let inputNowState=this.checked+'';
    console.log(inputNowState)
    let albumName=$(this).attr('data-albumName');//获取自定义属性
    $.ajax({
        url:'/resetAlbumState',
        type:'get',
        dataType:'json',
        data:{
            token,
            inputNowState,
            albumName
        },
        success(res){
            console.log(res)

        }
    })
})
//点击输入框时，状态会发生改变，此时请求传到后台链接数据库并修改状态，然后请求成功后返回到页面上
//返回到页面上，注意，刷新后并不会返回到页面上，所以要和第二次请求一样，保存数据库中修改的数据，渲染到页面上，在第二次请求中渲染

//委托模式，删除指定的相册列表

$listGroup.on('click','#del',function(){
    let $_this=$(this);
    let albumName=$(this).attr('data-albumName');
    $.ajax({
        url:'/removeAlbumList',
        type:'get',
        dataType:'json',
        data:{
            token,
            albumName
        },
        success(res){
            console.log(res)
            if(!res.error){
                $_this.parent().parent().remove();
                
                Observer.trigger('deleteUserAlbumList', albumName);//触发我的相册事件

            }
        }
    })

})

})