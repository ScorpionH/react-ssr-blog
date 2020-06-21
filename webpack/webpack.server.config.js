const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const fs = require('fs');
const nodeModules = {};
//服务端代码编译时排除node_modules模块
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });
const baseConfig = {
    target: 'node',
    node: {
        __filename: false,
        __dirname: false,
    },
    context: __dirname,
    entry: {
        app: path.resolve(__dirname, '../src/server/app')
    },
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    //externals: [nodeExternals()],
    externals: nodeModules,
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader", // 转化需要的loader
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
                {loader: 'css-loader'},
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
    plugins: [
        new webpack.DefinePlugin({
            '__IS_SERVER__': true,
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",//将css文件单独放入css文件夹中
            chunkFilename: "css/[name].css" //公共样式提取到main.css
        }),
    ]
}
module.exports = baseConfig;