let express = require('express');
let router = new express.Router();
let Database = require('../db/db.js');
// 定义连接字符串
let connectStr = 'mongodb://localhost:27017/';
// 定义数据库名称
let dbname = 'albums';//1：先在mongo里创建albums数据库，再这里定义
// 定义一个集合名称（还有其它)
let collname = 'user';//2:db.user.insert({username:wnaglaowu})

let fs=require('fs');

let jwt=require('jsonwebtoken');

let secret='sjbdsbcsjcbdcjksknxdksnc';

 let del=require('./del.js');

 let Formidable = require('formidable');
// let jwt = require('jsonwebtoken');
//首先测试router是否可以连接数据库
// router.get('/aa',()=>{
// 	console.log('aa')
// })

//0：处理所有的get请求   进行解密

 router.get('*',(req,res,next)=>{
	 let token=req.query.token;
	 if(token){
		 jwt.verify(token,secret,(err,result)=>{
			 if(err){
				 res.send({
					 error:1,
					 data:'解析token失败'
				 })
				 return;
			 }

			req.token=result; //解密为异步函数，挂载之后才方向
			
			next();//放行
		 })
		 return;
	 }
	 //直接放行，没有token
	 next();
 })
// 1:处理checkName       
router.get('/checkName', (req, res) => {
	// 获取用户名
	let username = req.query.username;

	// 连接数据库
	let db = new Database(connectStr, dbname, collname);
	// 查找成员
	db.findOne({ username: username }, (err, result) => {
		if (err) {
			// 返回错误信息
			res.send({
				error: 1,
				data: '连接数据库失败'
			})
			return;
		}
		// console.log(result);

		// 判断result
		if (result) {
			// 如果执行到这里 说明该用户已经在数据库中了
			res.send({
				error: 2,
				data: '该用户已经存在了'
			})
			return;
		}

		// 返回数据
		res.send({
			error: 0,
			data: '恭喜你，用户名可以使用'
		})

	
	})
	console.log('checkName')//checkName请求判断用户是否可以使用
})


//2：处理regist       注册时post服务器响应浏览器的数据，创建个人数据库文件信息
//注意这里是要访问user这个文件夹，需要设置静态化目录才可以访问！
router.post('/regist',(req,res)=>{
	let username=req.body.username;
	let password=req.body.password;

	fs.mkdir('./user/'+username,err=>{
       if(err){
		   res.send({
			   error:1,
			   data:'创建用户专属文件夹失败'
		   })
		   return;
	   }

	   fs.mkdir('./user/'+username+'/'+'header_pic',err=>{
		 
		if(err){
			res.send({
				error:2,
				data:'创建用户专用头像文件夹失败'
			})
			return;

		}
	   //读物前端头像路径，使用绝对路径
	   //readfile 写错了，一直找不到
		fs.readFile('./web/images/default.png',(err,data)=>{
             if(err){
				 res.send({
					 error:3,
					 data:'读取默认头像失败'
				 })
				 return;//如果出错，则跳出
			 }
              //如果读取成功
			 //追加到用户头像文件夹中，将去读取的路径
			 fs.appendFile('./user/' + username + '/header_pic/default.png', data, err => {
				 if(err){
					 res.send({
						 error:4,
						 data:'追加用户头像失败'
					 })
					 return;
				 }
				 
				 //如果追加成功   //链接数据库：connectStr S大写
				 let db=new Database(connectStr,dbname,collname);
				 let header_path='/user/' + username + '/header_pic/default.png';
				 
				 let obj={
					 username,					 
					 password,
					 header_path
				 }
				 //在数据库中添加一条用户数据
				 db.insertOne(obj,(err,result)=>{
					 if(err){
						 res.send({
							 error:5,
							 data:'连接数据库失败'
						 })
						 return;
						 
					 }
					res.send({
						error:0,
						data:'注册成功'
					
					})
				 })


			 })

		})
	   })
	})
	

})


//3：处理 login   
router.post('/login',(req,res)=>{
	let username=req.body.username;
	let password=req.body.password;

	let db=new Database(connectStr,dbname,collname);
	//在数据库中查找一条用户数据
	db.findOne({username,password},(err,result)=>{
		if(err){
			res.send({
				error:1,
				data:'查找失败'
			})
		}
		if(result){
			let obj={
				username:result.username,
				// header_pic:result.header_pic
				header_pic:result.header_path //?
				
			}// 用户名和头像返回给前端，密码需要加密
			//生成一个token字符串
			let token=jwt.sign(obj,secret);//token里返回的是obj+secret
			res.send({
				error:0,
				token//data:token 语义化不强
			})
			return;		
		}

		res.send({
			error:2,
			data:'请检查用户名及密码'
		})
		//返回在前端的tooken字符串要保存在本地
	})
        

})

//4:处理usernav
router.get('/usernavInfo',(req,res)=>{
	let token=req.query.token;
	//login时返回给浏览器是加密
	//浏览器》后台需要解密 (token,指定的加密字符串，(err,result))
	jwt.verify(token,secret,(err,result)=>{
		if(err){
			res.send({
				error:1,
				data:'解密token字符串失败'
			})
			return;
		}
		res.send({
			error:0,
			data:result//为啥这里可以直接这样，下面相册列表还要单独拿出啦进行保存？刷新后数据就不见了

		})
	})
})


//5:处理/创造albumbox
router.get('/albumBox',(req, res) =>{
	let username=req.token.username;
	let albumName=req.query.albumName;

	//创建指定用户指定相册
	fs.mkdir('./user/'+username+'/'+albumName,err=>{
		if(err){
			res.send({
				error:1,
				data:'创建该相册失败'
			})
			return;
		}

		let db = new Database(connectStr, dbname, 'pics');
		let obj={
			username,
			albumName,
			share:'false'
		}
		db.insertOne(obj, (err, result) => {//向数据库中插入一条数据
			if(err){
				res.send({
					error:2,
					data:'插入数据库失败'
				})
				return;
			}
			res.send({
				error: 0,
				data: '创建相册成功',
				albumName
			})
		})
	})
})

//6：处理管理相册中，相册列表getUserAlbumList(否则刷新页面为空)
router.get('/getUserAlbumList',(req,res)=>{
	//通过获取用户名，查找所有数据
	let username=req.token.username;
	
	let db=new Database(connectStr,dbname,'pics');
	db.findMany({username},(err,result)=>{
		if(err){
			res.send({
				error:1,
				data:'查找数据库中的数据失败'
			})
			return;
		}
		res.send({
			error:0,
			data:result //要先进性遍历，存储到数据库中，这里就是通过查找数据库，返回到前端
		                // res.data.forEach
		})
	})
})



//7:处理相册状态，是否共享
router.get('/resetAlbumState',(req,res)=>{
	let username=req.token.username;
	let state=req.query.inputNowState;
	let albumName=req.query.albumName;

	let db=new Database(connectStr,dbname,'pics');

	let query={
		username,
		albumName
	}
	let updated={
		$set:{
			share:state
		}
	}
	db.updateOne(query,updated,(err,result)=>{
		if(err){
			res.send({
				error:1,
				data:'修改输入框状态失败'
			})
			return;
		}
		res.send({
			error:0,
			data:'修改状态成功'
		})
	})





})

//8:删除相册列表,怎样删除一个非空目录？
router.get('/removeAlbumList', (req,res) => {
	
	let username=req.token.username;
	let albumName=req.query.albumName;

	let db=new Database(connectStr,dbname,'pics');
	//obj此处作为删除的对象，删除谁，哪一个
	let obj={
		username,
		albumName
	}
	//1：先查找到点击删除的那个数据
	// db.findOne(obj,(err,result)=>{
	// 	if(err){
	// 		res.send({
	// 			error:1,
	// 			data:'查找要删除的数据失败'
	// 		})
	// 		return;
	// 	}
	// 	res.send({
	// 		error:0,
	// 		data:'查找要删除的数据成功'
	// 	})
	// })

	//2:删除：
	db.deleteOne(obj,(err,result)=>{
        if(err){
			res.send({
				error:1,
				data:'删除数据失败'
			})
			return;
		}
		//若数据库中的数据删除成功，接下来
		// res.send({

		// })需要引入del.js 去删除非空目录的文件夹
		//防止代码出现错误要将语句放入到try catch语句中，catch（防止代码出错，捕获）
		try {
        	del('./user/' + username + '/' + albumName);
        } catch (e) {
        	res.send({
        		error: 2,
        		data: '删除该相册文件夹失败'
        	})
        	return;
        }

        // 返回数据
        res.send({
            error: 0,
            data: '删除该相册文件夹成功'
        })
    })
})



//9: 重点：处理每个用户上传的图片/uploadUserPic_list
router.post('/uploadUserPic_list', (req, res) => {
	//上传过程：获取数据，解析为对象，解密，新路径转换，连接数据库，保存到数据库中
    let fd = new Formidable();   
    fd.uploadDir = './uploads'; // 设置上传图片的路径
    let arrFile = [];          // 定义空数组存储上传的图片文件
   
	// 监听file事件
   
	fd.on('file', (key, value) => {
        arrFile.push(value);
	})
	console.log(arrFile);

    // 解析req对象
    fd.parse(req, (err, data, files) => {
		
		// console.log(data)
        let albumName = data.albumName;
        let token = data.token;

        // 解密
        jwt.verify(token, secret, (err, result) => {
            if (err) {
                res.send({
                    error: 1,
                    data: '解密失败'
                })
                return;
            }
            let username = result.username;

            // 定义数组 用于保存相关的信息
            let saveArr = [];
            try {
                for (let i = 0; i < arrFile.length; i++) {
                    // 获取原路径
                    let oldPath = arrFile[i].path;
                    // 定义新的路径
                    let newPath = '/user/' + username + '/' + albumName + '/' + arrFile[i].name;
                    // 更换名称
                    fs.renameSync(oldPath, '.' + newPath);//这里加上点，是相对于当前这个文件。//集合里加上点是给前端用的
                    // 存储数据
                    saveArr.push({
                        username,
                        pic_path: newPath,
                        pic_name: arrFile[i].name,
                        albumName
                    })
				}
				
            } catch (e) {
                res.send({
                    error: 2,
                    data: '更换名称失败了'
                })
                return;
			}
			//刷新后又没了，所以这些数据现在在数据库中，需要请求连接数据库，渲染到页面上 

            // 连接数据库
            let db = new Database(connectStr, dbname, 'imgs');
            // 插入多条数据
            db.insertMany(saveArr, (err, result) => {
                if (err) {
                    res.send({
                        error: 3,
                        data: '插入数据库数据失败'
                    })
                    return;
                }

                // 返回成功消息
                res.send({
                    error: 0,
                    data: '上传图片成功',
                    saveArr  //存储了图片名称、路径、用户，
                })
            })
		})
	

    })
})
// 10：处理requestUserPic_list 渲染上传的图片用户
router.get('/requestUserPic_list', (req, res) => {
    let albumName = req.query.albumName;
    // 获取用户名称 
    let username = req.token.username;

    // 连接数据库
    let db = new Database(connectStr, dbname, 'imgs');
    // 查找多条数据
    db.findMany({ username, albumName }, (err, result) => {
        if (err) {
            res.send({
                error: 1,
                data: '查询数据失败'
            })
            return;
        }

        // 返回成功时候信息
        res.send({
            error: 0,
            data: result
        })
    })
})


//11:处理requestAllUserList   所有的用户

router.get('/requestAllUserList', (req, res) => {
  let db = new Database(connectStr, dbname, collname);
    // 查找数据库中数据，渲染到页面上
    db.findMany({}, (err, result) => {
        if (err) {
            // 返回错误信息
            res.send({
                error: 1,
                data: '查找用户数据失败了'
            })
            return;
        }

        // 使用map方法返回新数组
       let newArr = result.map(item => {
            return {
                username: item.username,
                header_path: item.header_path
            }
        })

        // 返回成功后的数据
        res.send({
            error: 0,
            data: newArr
        })
    })
})

//12:UserShareAlbumList
router.get('/showUserShareAlbumList', (req, res) => {
    let username = req.query.username;
    let db = new Database(connectStr, dbname, 'pics');
	
	
	db.findMany({username,share:'true'},(err,result) => {
       if (err) {
            res.send({
                error: 1,
                data: '查找用户数据失败了'
            })
             return;
        }
        res.send({
            error: 0,
            data: result
        })
    })
})

//13: 处理showTargetUserPic_list  展示指定用户共享相册中的具体图片

router.get('/showTargetUserPicList',(req,res) => {
    let albumName = req.query.albumName;
    let username = req.query.username;

	let db = new Database(connectStr, dbname, 'imgs');
    db.findMany({ username, albumName }, (err, result) => {
		if (err) {
			 // 返回错误信息
			 res.send({
				 error: 1,
				 data: '查找用户数据失败了'
			 })
			 return;
		 }
 
		 // 返回成功的信息
		 res.send({
			 error: 0,
			 arr: result
		 })
	 })
 })
 //14:修改信息 updataUserInfo
 router.get('/updateUserInfo', (req, res) => {
   let username = req.token.username;
    let value = req.query.value;//输入的值
    // 获取修改的类型
    let type = req.query.type;
    console.log(type, value);

    // 连接数据库
    let db = new Database(connectStr, dbname, collname);
    // 定义一个空的对象 用于自适应要修改的数据
    let obj = {};
    obj[type] = value;

    // 定义query
    let query={
        username //修改谁的
    }
    // 定义updated
    let updated={
        $set: obj  //修改的地方自适应
    }
    // 修改数据
    db.updateOne(query,updated,(err, result)=>{
        if(err){
            // 返回错误信息
            res.send({
                error: 1,
                data: '修改用户数据失败了'
            })
            return;
        }
        // 返回成功之后的信息
        res.send({
            error: 0,
            data: '修改' + type + '成功了'
        })
    })
})

//15:重点  上传头像 处理uploadUserHeaderPic
router.post('/uploadUserHeaderPic',(req,res)=>{
	// let token=req.body.token   //undefined 需要借助formidable 去获取token
	let form =new Formidable();
	form.uploadDir='./user';
	
	//解析req对象
	form.parse(req,(err,data,files)=>{
		if(err){
          res.send({
			  error:1,
			  data:'解析req失败'
		  })
		  return;
		}
		//解析成功后
		let token=data.token;
		console.log('token')
		
		//解密token字符串
		jwt.verify(token,secret,(err,msg)=>{
			if(err){
				res.send({
				  error:2,
				  data:'解密失败'
				})
				return;
			}
			console.log(files)
			//解密成功后
			let username=msg.username;
			
			//获取原路径，定义新路径
			let oldPath=files.file.path;
			let newPath = '/user/' + username + '/header_pic/'+files.file.name;
			
			fs.rename(oldPath,'.'+newPath,err=>{
				if(err){
					res.send({
						error:3,
						data:'修改文件名称失败'
					})
					return;
				}
			})
			
			
			let db=new Database(connectStr,dbname,collname);

			let query={username};

			let updated={
				$set:{
					header_pic:newPath
				}
			}
			db.updateOne(query,updated,(err,result)=>{
				if(err){
					res.send({
						error:4,
						data:'修改头像失败'
					})
					return;
				}
				msg.header_pic=newPath;
				let newToken=jwt.sign(msg,secret);

				//修改成功后
				res.send({
					error:0,
					data:'修改头像成功',
					newToken,
					img:newPath
				})

			})

		})

	})

	
})
//15: 处理 cut_img
router.get('/cut_img', (req, res) => {
    // 获取图片的路径
    let img_path = req.token.header_pic;
    // 获取裁剪的宽高、位置
    let w = req.query.w;
    let h = req.query.h;
    let x = req.query.x;
    let y = req.query.y;

    // 裁剪
    gm('.' + img_path).crop(w, h, x, y).write('.' + img_path, err => {
        if (err) {
            res.send({
                error: 1,
                data: '裁剪失败'
            })
            return;
        }
        // 成功时候返回信息
        res.send({
            error: 0,
            data: '裁剪成功',
            new_path: img_path
        })
    })
})



 















// 暴露接口
module.exports = router;