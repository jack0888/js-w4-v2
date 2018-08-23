const path = require('path');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    module: {
        rules: [
            //{
            //    test: /\.(js|vue)$/,
            //    loader: 'eslint-loader',
            //    enforce: "pre",
            //    include: [resolve('src')],
            //    exclude: /node_modules/,
            //    options: {
            //        formatter: require('eslint-friendly-formatter')
            //    }
            //},
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                include:'/src/',
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            //modules: true
                        }
                    }, {
                        loader: "less-loader"
                    },{
                        loader: "postcss"
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                include:'/src/',
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            //modules: true
                        }
                    }, {
                        loader: "vue-style-loader"
                    },{
                        loader: "postcss"
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'json',
                exclude: /node_modules/
            },
            {
                test: /\.ttf/,
                loader: 'file',
                exclude: /node_modules/
            },
            {
                test: /.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit:1024,
                            name: '[name]-xxx.[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|svgz)$/,
                use:{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[name].[ext]?[hash]'
                    }
                }
            },
        ]
    }
};
