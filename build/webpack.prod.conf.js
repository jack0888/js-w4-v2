/**
 * Created by 汪凤杰 on 2018/8/18.
 */
const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const pkg = require('../package.json');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const root = path.resolve(__dirname, '..'); // 根目录

module.exports = merge(baseWebpackConfig, {
    //配置入口
    entry:path.join(__dirname,'../src/main.js'), // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
    output:{//配置打包出口文件
        path: path.resolve(__dirname, '../dist'),// 项目的打包文件路径
        publicPath: '/',// 通过devServer访问路径 // publicPath: '/dist/'
        filename:'js/[name].[hash].js',// 打包后的文件名。[name]的意思就是原来chunk代码块叫什么名字就是什么名字，[hash]，文件的哈希值。
        chunkFilename: "js/chunk-"+"[name].js"
    },
    externals:{
        //'vue': 'Vue',
        //'vue-router': 'VueRouter',
        //'vuex': 'Vuex',
        //'axios': 'axios',
        //'vue-lazyload': 'VueLazyload',
        //'raven-js': 'Raven'
    },
    resolve: {
        alias: {
            // 配置目录别名，来确保模块引入变得更简单
            // 在任意目录下require('components/example') 相当于require('项目根目录/src/components/example')
            components: path.join(root, 'src/components')
        },
        //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
        extensions: [".js",".css",".json",".vue"]
    },
    plugins: [
        new VueLoaderPlugin(),

        new webpack.BannerPlugin(pkg.name + ' v' + pkg.version + ' by JackStyle (c) ' + new Date().getFullYear() + ' Licensed ' + pkg.license),
        new webpack.optimize.OccurrenceOrderPlugin(),//OccurrenceOrderPlugin 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
        // Define global var
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"' // '"production"' 或 JSON.stringify('production')
            }
        }),
        // CleanWebpackPlugin
        //[
        //    'dist',         // removes 'dist' folder
        //    'build/*.*',    // removes all files in 'build' folder
        //    'web/*.js'      // removes all JavaScript files in 'web' folder
        //]
        new CleanWebpackPlugin(['dist'], {
            root: root,
            verbose: true,
            dry: false
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname,'../public')
        }]),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
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
    ]
});