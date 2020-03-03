// 这里是入口文件,引入其他js模块文件
//index文件夹中的模块，用到哪块，就去加载哪块
//管理相册(managealbums)=>我的相册(myalbums)=>全部用户(alluser)=>修改信息（setting)
define(function(require, exports, module) {
	// console.log('main');

	//一(个页面只能引入一个主入口文件
	//加载nav模块
	require('./nav/nav');
	require('./managerAlbum/managerAlbum.js');

	require('./myAlbums/myAlbums.js');

	require('./allUser/allUser');

	require('./setting/setting.js');
	


})