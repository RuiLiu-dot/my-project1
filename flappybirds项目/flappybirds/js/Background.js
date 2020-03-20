/**
 * Background背景类
 * @img 渲染的背景图片
 * @step 移动的步长值
 * @x 背景在画布中x坐标
 * @y 背景在画布中y坐标
 */
function Background(img,step,x,y){
    this.img = img;
    this.step = step;
    this.x = x;
    this.y = y;
}