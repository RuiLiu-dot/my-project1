/**
 * Game游戏类
 * @ctx canvas的上下文对象，画笔
 * @bird Bird鸟类的实例化对象
 * @pipe Pipe管子类的实例化对象
 * @land 背景关于地面的实例化对象
 * @mountain 背景关于后面山、建筑物、树的实例对象
 */
function Game(ctx,bird,pipe,land,mountain){
    this.ctx = ctx;
    this.bird = bird;
    // 管子有多个，这里定义一个数组来存储
    this.pipeArr = [pipe];
    this.land = land;
    this.mountain = mountain;

    // 定时器
    this.timer = null;

    // 定义震动的频率
    this.iframe = 0;

    // 初始方法
    this.init();
}

// 初始化方法
Game.prototype.init = function(){
    this.start();
    this.bindEvent();
}

// 渲染远处的山
Game.prototype.renderMountain = function(){
    // 获取图片
    var img = this.mountain.img;

    // 山的移动，在画布中坐标点x位置发生改变
    this.mountain.x -= this.mountain.step;

    // 判断
    if(this.mountain.x < -img.width){
        this.mountain.x = 0;
    }

    // 画山
    this.ctx.drawImage(img,this.mountain.x,this.mountain.y);
    this.ctx.drawImage(img,this.mountain.x + img.width,this.mountain.y);
    this.ctx.drawImage(img,this.mountain.x + img.width * 2,this.mountain.y);
}

// 游戏开始
Game.prototype.start = function(){
    // 备份this
    var _this = this;
    this.timer = setInterval(function(){
        // 频率改变
        _this.iframe++;
        // 清屏
        _this.clear();
        // 渲染山
        _this.renderMountain();
        // 渲染地面
        _this.renderLand();
        // 渲染鸟
        _this.renderBird();
        // 鸟震动翅膀
        if(_this.iframe % 10 === 0){
            _this.bird.fly();
        }
        // 鸟下降
        _this.bird.goDown();
        // 移动管子
        _this.movePipe();
        // 渲染管子
        _this.renderPipe();
        // 创建管子
        if(!(_this.iframe % 70)){
            _this.createPipe();
        }
        // 清除管子
        _this.clearPipe();
        // 渲染鸟的四个点
        _this.getBirdPoints();
        // 渲染管子的八个点
        _this.getPipePoints();

        // 盒子模型检测碰撞
        _this.checkBox();
    },20);
}


// 清屏的方法
Game.prototype.clear = function(){
    this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
}

// 渲染地面
Game.prototype.renderLand = function(){
    // 获取图片
    var img = this.land.img;

    // 移动：改变再canvas上渲染的x点
    this.land.x -= this.land.step;

    // 判断
    if(this.land.x < -img.width){
        this.land.x = 0;
    }

    // 画地
    this.ctx.drawImage(img,this.land.x,this.land.y);
    this.ctx.drawImage(img,this.land.x + img.width,this.land.y);
    this.ctx.drawImage(img,this.land.x + img.width * 2,this.land.y);
}


// 渲染鸟
Game.prototype.renderBird = function(){
    // 获取初始图片
    var img = this.bird.img;

    // 保存状态
    this.ctx.save();
    // 平移坐标系
    this.ctx.translate(this.bird.x,this.bird.y);
    // 画矩形
    // this.ctx.strokeRect(-img.width/2 + 5,-img.height/2 + 5,img.width - 10,img.height - 10)
    // 获取旋转角度 向上逆时针旋转 负值  向下是顺时针旋转 正值
    var deg = this.bird.state === 'down' ? Math.PI/180 * this.bird.speed : -Math.PI/180 * this.bird.speed;
    // 旋转坐标系
    this.ctx.rotate(deg)
    // 绘制小鸟
    this.ctx.drawImage(img,-img.width/2,-img.height/2);
    // 恢复状态
    this.ctx.restore();
}

// 绑定点击事件
Game.prototype.bindEvent = function(){
    var _this = this;
    this.ctx.canvas.onclick = function(){
        _this.bird.goUp();
    }
}

// 渲染管子
Game.prototype.renderPipe = function(){
    // 多根管子的数组遍历
    this.pipeArr.forEach(function(value){
        // 上面的管子 口朝下
        // 获取img
        var img = value.pipe_up;
        // 获取其它参数
        var img_x = 0;
        var img_y = img.height - value.up_height;
        var img_w = img.width;
        var img_h =  value.up_height;
        // var cv_x = 320;
        var cv_x = value.x - value.step * value.count;
        var cv_y = 0;
        var c_w = img.width;
        var c_h = value.up_height;
        // 画管子
        this.ctx.drawImage(img,img_x,img_y,img_w,img_h,cv_x,cv_y,c_w,c_h);

        //下面的管子，口朝上
        var img_down = value.pipe_down;
        var img_down_x = 0;
        var img_down_y = 0;
        var img_down_w = img_down.width;
        var img_down_h = value.down_height;
        // var c_down_x = 320;
        var c_down_x = value.x - value.step * value.count;
        var c_down_y = 150 + value.up_height;
        var c_down_w = img_down.width;
        var c_down_h = value.down_height;
        this.ctx.drawImage(img_down,img_down_x,img_down_y,img_down_w,img_down_h,c_down_x,c_down_y,c_down_w,c_down_h);
    })
}

// 管子移动的方法
Game.prototype.movePipe = function(){
    this.pipeArr.forEach(function(value){
        value.count++;
    })
}

// 创建管子的方法
Game.prototype.createPipe = function(){
    var newPipe = this.pipeArr[0].createPipe();
    this.pipeArr.push(newPipe);

    // console.log(this.pipeArr)
}


// 清除管子
Game.prototype.clearPipe = function(){
    // 备份this
    var _this = this;
    this.pipeArr.forEach(function(value,index){
        if(value.x - value.step * value.count < -value.pipe_up.width){
            // 如果出画布，移除
            // console.log("移除第"+index+"索引的管子"+this);
            _this.pipeArr.splice(index,1);
            return;
        }
    });
}

// 获取小鸟的矩形框四个点
Game.prototype.getBirdPoints = function(){
    // 获取小鸟图片
    var img = this.bird.img;
    var bird_A = {
        x:this.bird.x - (img.width/2 - 5),
        y:this.bird.y - (img.height/2 - 5),
    };
    var bird_B = {
        x:this.bird.x + (img.width/2 - 5),
        y:bird_A.y
    };
    var bird_C = {
        x:bird_B.x,
        y:bird_B.y + img.height - 10
    };
    var bird_D = {
        x:bird_A.x,
        y:bird_A.y + img.height - 10
    }

    
    // 绘制路径
    // this.ctx.beginPath();
    // this.ctx.moveTo(bird_A.x,bird_A.y);
    // this.ctx.lineTo(bird_B.x,bird_B.y);
    // this.ctx.lineTo(bird_C.x,bird_C.y);
    // this.ctx.lineTo(bird_D.x,bird_D.y);
    // this.ctx.closePath();
    // this.ctx.stroke();
}

// 绘制管子的八个点
Game.prototype.getPipePoints = function(){
    this.pipeArr.forEach(function(value){
        // 获取上面的管子
        var uImg = value.pipe_up;
        // 获取上面管子的四个点
        var uImg_A = {
            x:value.x - value.step * value.count,
            y:0
        };
        var uImg_B = {
            x:uImg_A.x + uImg.width,
            y:0
        };
        var uImg_C = {
            x:uImg_B.x,
            y:uImg_B.y + value.up_height
        };
        var uImg_D= {
            x:uImg_A.x,
            y:value.up_height
        };

        // 绘制路径
        this.ctx.beginPath();
        this.ctx.moveTo(uImg_A.x,uImg_A.y);
        this.ctx.lineTo(uImg_B.x,uImg_B.y);
        this.ctx.lineTo(uImg_C.x,uImg_C.y);
        this.ctx.lineTo(uImg_D.x,uImg_D.y);
        this.ctx.closePath();
        this.ctx.stroke();


        // 获取下面的管子
        var dImg = value.pipe_down;
        // 获取上面管子的四个点
        var dImg_A = {
            x:value.x - value.step * value.count,
            y:150 + value.up_height
        };
        var dImg_B = {
            x:dImg_A.x + dImg.width,
            y:dImg_A.y
        };
        var dImg_C = {
            x:dImg_B.x,
            y:dImg_B.y + value.down_height
        };
        var dImg_D= {
            x:dImg_A.x,
            y:dImg_A.y + value.down_height
        };

        // 绘制路径
        this.ctx.beginPath();
        this.ctx.moveTo(dImg_A.x,dImg_A.y);
        this.ctx.lineTo(dImg_B.x,dImg_B.y);
        this.ctx.lineTo(dImg_C.x,dImg_C.y);
        this.ctx.lineTo(dImg_D.x,dImg_D.y);
        this.ctx.closePath();
        this.ctx.stroke();
    })
}


// 盒模型检测
Game.prototype.checkBox = function(){
    var _this = this;
    this.pipeArr.forEach(function(value){
        // 获取上面的管子
        var uImg = value.pipe_up;
        // 获取上面管子的四个点
        var uImg_A = {
            x:value.x - value.step * value.count,
            y:0
        };
        var uImg_B = {
            x:uImg_A.x + uImg.width,
            y:0
        };
        var uImg_C = {
            x:uImg_B.x,
            y:uImg_B.y + value.up_height
        };
        var uImg_D= {
            x:uImg_A.x,
            y:value.up_height
        };

        // 获取下面的管子
        var dImg = value.pipe_down;
        // 获取上面管子的四个点
        var dImg_A = {
            x:value.x - value.step * value.count,
            y:150 + value.up_height
        };
        var dImg_B = {
            x:dImg_A.x + dImg.width,
            y:dImg_A.y
        };
        var dImg_C = {
            x:dImg_B.x,
            y:dImg_B.y + value.down_height
        };
        var dImg_D= {
            x:dImg_A.x,
            y:dImg_A.y + value.down_height
        };

        // 获取小鸟图片
        var img = _this.bird.img;
        var bird_A = {
            x:_this.bird.x - (img.width/2 - 5),
            y:_this.bird.y - (img.height/2 - 5),
        };
        var bird_B = {
            x:_this.bird.x + (img.width/2 - 5),
            y:bird_A.y
        };
        var bird_C = {
            x:bird_B.x,
            y:bird_B.y + img.height - 10
        };
        var bird_D = {
            x:bird_A.x,
            y:bird_A.y + img.height - 10
        }


        // 检测碰撞
        // 上管子
        if(bird_B.x > uImg_D.x && bird_B.y < uImg_D.y && bird_A.x < uImg_D.x){
            console.log("撞到上面管子....");
            _this.gameOver();
        }

        // 下管子
        if(bird_C.x > dImg_A.x && bird_C.y > dImg_A.y && bird_A.x < dImg_A.x){
            console.log("撞到下面管子....");
            _this.gameOver();
        }
    })
}


// 游戏结束
Game.prototype.gameOver = function(){
    clearInterval(this.timer);
}