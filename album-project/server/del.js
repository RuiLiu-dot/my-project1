
 let fs=require('fs');
/**
 * del方法用于删除非空目录
 * @path 要删除的文件目录
 *
 * 思路：
 * 	-获取文件中的内容(得到数组)
 * 	-遍历数组 查看每一个文件的状态
 */


function del(path) {
	// 查看文件夹
	let arr = fs.readdirSync(path);
	// console.log(arr);

	// 为了避免同步语法中出现错误，一般将代码放入到 try  catch语句中
	try {
			// 遍历数组
		for (let i = 0; i < arr.length; i++) {
			// 获取状态
			let stat = fs.statSync(path + '/' + arr[i]);
			// 判断是文件夹或者是文件
			if (stat.isDirectory()) {
				// 说明是文件夹 就递归处理
				del(path + '/' + arr[i]);
				console.log('删除了' + path + '/' + arr[i] + '文件夹');
			} else {
				// 说明是文件 直接删除
				fs.unlinkSync(path + '/' + arr[i]);
				console.log('删除了' + path + '/' + arr[i] + '文件');
			}
		}
	} catch (e) {
		console.log(e);
	}

	// 最后要删除path即可
	fs.rmdirSync(path);
}

// 暴露接口
module.exports = del;


