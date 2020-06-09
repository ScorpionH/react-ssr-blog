const argv = require('yargs-parser')(process.argv.slice(2));
const { spawn } = require('child_process')
const chalk = require('chalk')
const constantCode = require('./constant')


// http-server进程
let httpServerProcess = null;
//前端代码构建 服务进程
const feCodeWatchProcess = spawn('npm', ['run', 'client:dev'], { stdio: 'inherit' });
//服务端代码构建
const svrCodeWatchProcess = spawn('npm', ['run', 'svr:watch']);
// 开启http-server
const startHttpServer = function () {
    httpServerProcess && httpServerProcess.kill();
    httpServerProcess = spawn('npm', ['run', 'svr:serve'], { stdio: 'inherit' });
}
const killChildProcess = () => {
    httpServerProcess && httpServerProcess.kill();
    feCodeWatchProcess && feCodeWatchProcess.kill();
    svrCodeWatchProcess && svrCodeWatchProcess.kill();
}


//监听服务端代码构建服务的对外输出  stdout 事件
svrCodeWatchProcess.stdout.on('data', stdout => {
    stdout.toString().split('\n').forEach(item => {
        const stdoutData = item.trim();
        if (stdoutData.indexOf("DONE") !== -1) {
            const complieInfo = stdoutData.split('DONE')[1];
            console.log(chalk.greenBright.bgBlackBright.bold('DONE' + chalk.red(`${complieInfo}`)));
        }
        //服务端编译完成， 启动http-server
        if (stdoutData.indexOf(constantCode.SVRCODECOMPLETED) !== -1) {
            startHttpServer();
        }
    })
});
process.on('close', (code) => {
    console.log('main process close :' + code);
    killChildProcess();
})
process.on('exit', (code) => {
    console.log('main process exit :' + code);
    killChildProcess();
})
process.on('SIGINT', function () {
    svrCodeWatchProcess.stdin.write('exit', (error) => {
        console.log('svr code watcher process exit!');
    });
    killChildProcess();
});



