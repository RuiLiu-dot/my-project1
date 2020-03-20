/**
 * Bird鸟类
 * @imgArr 接收小鸟的图片，扇动翅膀用
 * @x 小鸟在画布中x坐标
 * @y 小鸟在画布中y坐标
 */
function Bird(imgArr,x,y){
    this.imgArr = imgArr;
    // 获取随机一张图片
    //随机索引
    this.index = parseInt(Math.random() * imgArr.length);
    // 随机索引对应的随机图片
    this.img = this.imgArr[this.index];
    this.x = x;
    this.y = y;
    // 定义鸟的上升与下降的状态
    this.state = "down";//down 下降   up 上升
    // 定义一个属性控制上升速度
    this.speed = 0;
}

// 鸟的飞翔：翅膀震动
Bird.prototype.fly = function(){
    // 索引自加
    this.index++;

    // 判断
    if(this.index === this.imgArr.length){
        this.index = 0;
    }

    // 重新给图片赋值
    this.img = this.imgArr[this.index];
}

// 鸟下降
Bird.prototype.goDown = function(){
    // 判断鸟的状态
    if(this.state === "down"){//下降
        this.speed++;
        // 开平方的目的是为了降低速度
        this.y += Math.sqrt(this.speed);
        // console.log(Math.sqrt(this.speed))
    }else if(this.state === "up"){
        this.speed--;
        if(this.speed === 0){
            // 改变状态
            this.state = "down";
        }
        this.y -= Math.sqrt(this.speed);
        // console.log(Math.sqrt(this.speed))
    }
   
}

// 鸟上升
Bird.prototype.goUp = function(){
    //改变状态
    this.state = "up";

    // 改变递减速率
    this.speed = 20;
}