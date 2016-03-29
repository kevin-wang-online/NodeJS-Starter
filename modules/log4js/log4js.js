//导入log4js日志模块
var log4js = require("log4js");

// 日志配置
log4js.configure({
    appenders: [
        { type: 'console' }, //控制台输出
        {
            type: 'file', //文件输出
            filename: '../modules/log4js/logs/accounting.log',
            maxLogSize: 1024,
            backups: 3,
            category: 'Accounting'
        },
        {
            type: 'file', //文件输出
            filename: '../modules/log4js/logs/account.log',
            maxLogSize: 1024,
            backups: 3,
            category: 'AccountModule'
        },
        {
            type: 'file', //文件输出
            filename: '../modules/log4js/logs/product.log',
            maxLogSize: 1024,
            backups: 3,
            category: 'ProductModule'
        }
    ],
    replaceConsole: true
});

//导出日志管理对象
module.exports.log4js = log4js;

//导出创建日志实例方法
module.exports.createLogger = function (name) {

    var logger = log4js.getLogger(name);

    logger.setLevel('INFO');

    return logger;

};




