const webpack = require('webpack')
//压缩和优化 css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//压缩 js 代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    mode: 'production',
    output: {
        filename: 'js/[name].js',
    },
    devtool: false,
    optimization: {
        minimize: true,
        minimizer: [
            //压缩 js
            new TerserPlugin(),
            // new UglifyJsPlugin({
            //     uglifyOptions: {
            //         compress: {
            //             //drop_console: true,
            //             //drop_debugger: true
            //         },
            //         //warnings: false,
            //         ie8: true,
            //         output: {
            //             comments: false,
            //         },
            //     },
            //     cache: true,
            //     sourceMap: false
            // }),
            //压缩 css
            new OptimizeCSSAssetsPlugin()
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' },//标识生产环境
            '__IS_PROD__': true//方便在代码中使用
        }),
        new MiniCssExtractPlugin({
            //设置 css 
            filename: 'css/[name].css'
        })
    ]
}