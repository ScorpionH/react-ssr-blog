const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require("html-webpack-plugin")
const webpackManifestPlugin = require('webpack-manifest-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ComplieDoneNotifyPlugin = require('./plugin/ComplieDoneNotifyPlugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
console.log(__dirname);
const baseConfig = {
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
        extensions: ['.ts', '.tsx', '.js', '.jsx',],
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
            cacheGroups: {
                // commons: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name: "vendors",
                //     chunks: "all"
                // },
                // styles: {
                //     name: 'styles',
                //     test: /\.css$/,
                //     chunks: 'all',
                //     enforce: true
                // }
            },
            // minimizer: [
            //     new UglifyjsWebpackPlugin({
            //         chunkFilter: chunk => {
            //             console.log(chunk);
            //             return true;
            //         }
            //     })
            // ]
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
    optimization: {
        runtimeChunk:{
            name: "runtime"
        }  
    },
    //uglifyjs-webpack-plugin
    plugins: [
        new CleanWebpackPlugin(),
        new webpackManifestPlugin(),
        new htmlWebpackPlugin({
            filename: 'main.html',
            template: path.resolve(__dirname, '../src/index.html'),
        }),
        new OptimizeCssAssetsPlugin(),//压缩CSS
        new MiniCssExtractPlugin({
            filename: "css/[name].css",//将css文件单独放入css文件夹中
            chunkFilename: "css/[name].css" //公共样式提取到main.css
        }),
        new ComplieDoneNotifyPlugin('client')
    ]
}
module.exports = baseConfig;