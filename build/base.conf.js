const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    performance: {
        hints: process.env.NODE_ENV=='development' ? false : 'warning' // false
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", '.vue']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['vue-style-loader', 'style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|svgz)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[name].[ext]?[hash]'
                    }
                }
            },
        ]
    }
};
