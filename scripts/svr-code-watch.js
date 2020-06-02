// 监听服务端代码构建，每次构建完成时，通知主进程重启node服务

const webpack = require('webpack')
const config = require('../webpack/webpack.server.config')
const constantCode = require('./constant')
const ComplieDoneNotifyPlugin = require('../webpack/plugin/ComplieDoneNotifyPlugin')
config.mode = 'development';
config.plugins.push(new ComplieDoneNotifyPlugin('server'));
const compiler = webpack(config);
const watching = compiler.watch({
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: 2000
}, (err, stats) => {
    const json = stats.toJson('minimal');
    if (json.errors) {
        json.errors.forEach(err => {
            console.log(err);
        })
    }
    if(json.warnings){
        json.warnings.forEach(warning => {
            console.log(warning);
        })
    }
    //编译完成后 通知主进程来重启node 服务
    console.log(constantCode.SVRCODECOMPLETED);
})



process.stdin.on('data', data => {
    if(data.toString === 'exit')
        process.exit();
})