const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const root = path.resolve(__dirname, '..'); // 根目录

module.exports = merge(baseWebpackConfig, {
    entry: {
        main: './src/main.js',
        vendor: ['vue', 'vue-router']
    },
    //entry:'./src/main.js',
    output: {
        path: path.join(__dirname, '../assets'),
        publicPath: '/',
        filename: '[name].js'
    },
    devServer:{
        historyApiFallback: true, // 路由配置，404的页面会自动跳转到/页面
        inline: true, // 文件改变自动刷新页面
        // 把错误显示在网页上
        overlay: {
            errors: true,
        },
        open: true,
        // 热更新，只改变当前组件的变化，防止其他的信息不见了
        hot: true,
        // progress: true, // 显示编译进度 !!有坑，待解决。下同～ 暂时不加这两个属性继续走下去吧～！
        // colors: true, // 使用颜色输出
        contentBase:path.resolve(__dirname,'devRoot'),// 配置开发服务运行时的文件根目录
        host:'localhost',// 开发服务器监听的主机地址
        compress:true,   // 开发服务器是否启动gzip等压缩
        port:8080        // 开发服务器监听的端口
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODEENV: "development"
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([{
            from: path.join(__dirname,'../public')
        }]),
        new HtmlWebpackPlugin({
            template: path.join(root, 'public/index.html'), // 模板文件,指定产出的模板
            //inject: 'body' // js的script注入到body底部
            inject: true,
            filename: 'index.html',          // 产出的文件名
            //chunks: ['common', 'base'],     // 在产出的HTML文件里引入哪些代码块,ps:没有相应的chunks模块会导致index.html注入失败
            hash: true,                     // 名称是否哈希值
            title: 'base',                  // 可以给模板设置变量名，在html模板中调用 htmlWebpackPlugin.options.title 可以使用
            minify: {                       // 对html文件进行压缩
                removeAttributeQuotes: true // 移除双引号
            }
        }),
    ],
    devtool: 'source-map' // 用于标记编译后的文件与编译前的文件对应位置，便于调试
});
