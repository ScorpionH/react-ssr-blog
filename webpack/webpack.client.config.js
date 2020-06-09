const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require("html-webpack-plugin")
const webpackManifestPlugin = require('webpack-manifest-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ComplieDoneNotifyPlugin = require('./plugin/ComplieDoneNotifyPlugin')
const prodConfig = require('./webpack.prod.config')
const baseConfig = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, '../src/client/index.tsx')
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: "js/[name].js"
    },
    devServer: {
        contentBase: __dirname + '/dist',
        index: 'main.html',
        compress: true,
        port: 12306,
        host: '0.0.0.0',
        useLocalIp: true,
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': __dirname + '/src'
        }
    },
    optimization: {
        //minimize 如果mode是production，默认是true，开启压缩模式
        //minimizer 如果想用第三方的压缩插件， 也可以在minimizer的数组列表中配置
        //splitChunks
        //runtimeChunk
        splitChunks: {
            chunks: "all",
            automaticNameDelimiter: '~',
            cacheGroups: {
                // vendors: { // 抽离第三方库
                //     test: /node_modules/, // 指定node_modules下的包
                //     name: 'libs',// 打包后的文件名   
                //     priority: 0,
                // },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 8,
                    priority: 1, // 该配置项是设置处理的优先级，数值越大越优先处理，处理后优先级低的如果包含相同模块则不再处理
                },
                common: {
                    name: 'common',
                    chunks: 'initial',
                    priority: 2,
                    minChunks: 2,
                },
                antdDesign: {
                    name: 'antd-design', // 单独将 antd-design 拆包
                    priority: 20,
                    test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
                    chunks: 'all',
                },
                reactLib: {
                    name: 'react-lib', // 单独将 lodash 拆包
                    priority: 20,
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                    chunks: 'all',
                },
            }
        },
        runtimeChunk: {
            name: "runtime"
        }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader" // 转化需要的loader
                }
            ]
        }, {
            test: /\.(css|less)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '/'
                    }
                },
                { loader: 'css-loader' },
                { loader: 'postcss-loader' }
            ]
        }, {
            test: /\.scss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '/'
                    }
                },
                { loader: 'css-loader' },
                { loader: 'sass-loader' }
            ]
        }]
    },
    //uglifyjs-webpack-plugin
    plugins: [
        new CleanWebpackPlugin(),
        new webpackManifestPlugin(),
        new htmlWebpackPlugin({
            filename: 'main.html',
            template: path.resolve(__dirname, '../src/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",//将css文件单独放入css文件夹中
            chunkFilename: "css/[name].css" //公共样式提取到main.css
        }),
        new ComplieDoneNotifyPlugin('client')
    ]
}
module.exports = merge(baseConfig, prodConfig);
