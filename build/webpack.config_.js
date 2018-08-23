/**
 * Created by 汪凤杰 on 2018/8/23.
 */
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

console.log(process.env.NODE_ENV)
console.log(process.env)

const configFun = (env)=> {
    return {
        entry: path.join(__dirname, 'src/main.js'),
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: [".js", ".json", ".jsx",".less", ".css"],
            alias: { //模快别名列表
                src: path.resolve(__dirname,'src')
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.vue$/,
                    loader:'vue-loader'
                },
                {
                    test: /\.less$/,
                    use : ['style-loader', 'css-loader', 'less-loader']
                },
                {
                    test: /\.(scss | sass)$/, // sass缩进语法  scss则跟css差不多
                    use : ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(gif|jpg|jpeg|svg)/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1024,
                                name: '[name].[hash:6].[ext]'
                            }
                        },
                    ]
                }
                // {
                // 	test: /\.style/,
                // 	use: ['style-loader','css-loader','stylus-loader']
                // }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: env.NODE_ENV === 'development' ? '"development"' : '"production"'
                }
            }),
            new htmlWebpackPlugin()
        ]
    }
}

const devConfigFun = (argument)=> {
    argument.devtool = '#cheap-module-eval-source-map';
    argument.devServer = {
        port: '8000',
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        open: true,
        hot: true
    }
    argument.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
    return argument;
}

module.exports = (env)=> {
    let config = configFun(env)
    if (env.NODE_ENV === 'development') {
        config = devConfigFun(config)
    }
    return config
};