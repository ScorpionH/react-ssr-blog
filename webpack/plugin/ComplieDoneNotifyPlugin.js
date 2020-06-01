const chalk = require('chalk')
module.exports = class ComplieDoneNotifyPlugin {
    constructor(side) {
        this.side = side;
    }
    apply(complier) {
        complier.hooks.done.tap('ComplieDoneNotifyPlugin', data => {
            const { startTime, endTime } = data;
            console.log(chalk.greenBright.bgBlackBright.bold('DONE ' + chalk.red(`${this.side} code build success ${endTime - startTime}ms`)));
        })
    }
}