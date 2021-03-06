const { exec, execSync } = require('child_process')

const freePort = function (port) {
    const args = process.argv.slice(2);
    const argPort = args && args[0];
    let exeRes = [];
    if (argPort && argPort.indexOf('--') !== -1)
        port = argPort.split('--')[1];
    try {
        exeRes = execSync(`lsof -i :${port}`).toString();
    } catch (e) {
        return;
    }
    exeRes.split('\n').forEach(line => {
        const splitInfo = line.trim().split(/\s+/);
        const pid = splitInfo[1];
        if (pid && pid !== 'PID') {
            let killPortRes = '';

            try {
                return execSync(`kill -9 ${pid}`).toString();
            } catch (e) {}
        }
        // exec(`kill -9 ${pid}`, (err, stdout, stderr) => {
        //     if (err)
        //         return console.log(`释放${port}端口失败`);
        //     console.log('port kill');
        // })
    })
    // exec(`lsof -i :${port}`, (err, stdout, stderr) => {
    //     console.log('检查端口')
    //     if (err)
    //         return;
    //     stdout.split('\n').forEach(line => {
    //         const splitInfo = line.trim().split(/\s+/);
    //         const pid = splitInfo[1];
    //         if (pid && pid !== 'PID')
    //             exec(`kill -9 ${pid}`, (err, stdout, stderr) => {
    //                 if (err)
    //                     return console.log(`释放${port}端口失败`);
    //                 console.log('port kill');
    //             })
    //     })
    // })
}
module.exports = freePort;