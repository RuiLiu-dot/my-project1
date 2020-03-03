// 判断环境
// 如果是发布的环境
if (process.env.NODE_ENV === 'production') {
    // 配置
    module.exports = {
        // 静态资源发布位置
        outputDir: '../server/static/home',
        // 模板资源
        indexPath: '../../views/home.html',
        // 引入静态资源的相对位置
        publicPath: '/static/home/'
    }
} else {
    // 设置一个代理对象，在下面直接引入
    let proxyObject = {
        // 目标地址
        target: 'http://localhost:3000',
        changeOrigin:true
    }
    // 开发环境
    module.exports = {
        // 配置服务器
        devServer: {
            // 跨域请求代理
            proxy: {
                // 首页请求 第一种：
                // '/data/home': {
                //     // 目标地址
                //     target: 'http://localhost:3000'
                // },
                // 第二种：
                '/data/home': proxyObject,
                // 列表页请求
                '/data/list': proxyObject,
                // 搜索
                '/data/search': proxyObject,
                // 排序
                '/data/order': proxyObject,
                // 详情页
                '/data/detail': proxyObject
            }
        }
    }
}