// 校验方法
//1：校验用户名
export function checkUsername(filed, value, cb) {
    if (!value) {
        return cb(new Error('请输入用户名'));
    }
    // 不合法的时候提示错误
    if (!/^\w{4,8}$/.test(value)) {
        return cb(new Error('用户名是4-8位的字母或字母'));
    }
    // 没有错误
    cb();
}

//2： 校验密码
export function checkPassword(filed, value, cb) {
    if (!value) {
        // 提示错误
        return cb(new Error('请输入密码'));
    }
    // 密码要包含字母和数字，否则提示错误
    if (!/\d.*[a-zA-Z]|[a-zA-Z].*\d/.test(value)) {
        return cb(new Error('密码要包含字母和数字'));
    }
    // 合法不显示
    cb();
}

export function checkRepeat(repeat, name, filed, value, cb) {
    if(!value){
        return cb(new Error(`请重复输入${name}`));//有return就不需要else语句
    }
    if (repeat!== value) {
        return cb(new Error(`${name}与重复${name}不一致，请重新输入`)); //提示与密码不一致
    }
    cb();
}

//校验电话
  export function telephone(filed, value, cb) {
     if (!value) {
        // 提示错误
        return cb(new Error('请输入您的电话号码'));
     }
    // 密码要包含字母和数字，否则提示错误
     if (!/^\w{8,11}$/.test(value)) {
        return cb(new Error('8位座机或11位电话号码'));
      }
    // 合法不显示
    cb();
  }
