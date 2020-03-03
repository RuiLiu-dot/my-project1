// 引入path
let path = require('path');
// 模板 1：
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分库文件 1：
let {CommonsChunkPlugin, UglifyJsPlugin} = require('webpack').optimize;
// css拆分  1：引入
let ExtractTextPlugin = require('extract-text-webpack-plugin')
// 引入vue-loader 1：最新版本需要引入
// let VueLoaderPlugin = require('vue-loader/lib/plugin');
// 压缩css
let OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');

// 配置对象
module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.es'],
        alias: {
            
            'vue$': 'vue/dist/vue.min.js',
            '@v': path.join(process.cwd(), './src/views/'),
            '@c': path.join(process.cwd(), './src/components/'),
            '@t': path.join(process.cwd(), './src/tools/'),//引入工具
        }
       
    },
    entry: {
        main: './src/main.js',
        lib: ['vue', 'element-ui', 'axios']  //打包库文件
    },
    output: {
        // 发布资源的相对路径 server目录下发布
        path: path.join(process.cwd(), '../server'),
        // 静态资源发布位置
        filename: './static/admin/[name].js',
        // 静态资源相对路径
        publicPath: '/'
    },
    // 模块
    module: {
        // 加载机
        rules: [
            // es6
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    // 引入插件
                    presets: ['es2015'],//弄成es2015也不行。。。。
                    plugins: ['syntax-dynamic-import']
                },
                include: path.join(process.cwd(), './src'),
                exclude: '/node_modules/'  //不对这个文件夹做处理
            },
            // vue
            {
                test: /\.vue$/,
                // 2:使用加载机
                loader: 'vue-loader',
                options: {
                    //css拆分2： 拆分样式
                    extractCSS: true
                }
            },
            // scss
            {
                test: /\.scss$/,
                // loader: 'style-loader!css-loader!sass-loader'
                // 拆分3：将suss和css打包在一起：
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'] //use引入剩余的
                })
            }
            ,
            // css
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader'
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            // 字体图标
            {
                test: /\.(ttf|woff)$/,
                loader: 'url-loader'
            }
        ]
    },
    // 插件
    plugins: [
        // 模板 2：
        new HtmlWebpackPlugin({
            template: './public/index.html',//模板位置
            filename: './views/admin.html', // 发布到哪里
            hash: true                      // 对静态资源添加指纹
        }),
        //拆分库文件    2：  
        new CommonsChunkPlugin('lib'),
        //css拆分      4：css资源发布位置
        new ExtractTextPlugin('./static/admin/style.css'),
        //3: 使用插件
        // new VueLoaderPlugin(),
        //注意： 开发的时候不要压缩，发布的时候再压缩

        //  压缩js
        // new UglifyJsPlugin(),
        //ERROR in ./static/admin/main.js from UglifyJs
                                      //Unexpected token: punc (() [./static/admin/main.js:4520,11] ?
        // 压缩css
       new OptimizeCssAssets() 
    ]
}