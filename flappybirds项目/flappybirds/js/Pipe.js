/**
 * Pipe管子类
 * @pipe_up 上面的管子，口朝下
 * @pipe_down 下面的管子，口朝上
 * @step 移动的步长
 * @x 在canvas中的坐标
 */
function Pipe(pipe_up,pipe_down,step,x){
    this.pipe_up = pipe_up;
    this.pipe_down = pipe_down;
    this.step = step;
    this.x = x;

    // 上面管子的呈现高度  至少一个像素
    this.up_height = parseInt(Math.random() * 249) + 1;
    this.down_height = 250 - this.up_height;

    // 定义每根管子移动的次数
    this.count = 0;
}

// 定义一个方法，来创建对象
Pipe.prototype.createPipe = function(){
    return new Pipe(this.pipe_up,this.pipe_down,this.step,this.x);
}