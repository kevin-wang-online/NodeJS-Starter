//导入数据库连接模块
var databaseManager = require('../modules/database/connection');

//导入数据库连接池模块
var connectionPoolManager = require('../modules/database/connectionpool');

//导入SQL语句构造器模块
var sqlcreater = require('../modules/database/sqlcreater');

//导入返回结果构造模块
var resultModel = require('../models/HttpResultModel/resultModel');

//导入日志模块
var logger = require('../modules/log4js/log4js').createLogger("ProductModule");

//导入Node的http请求模块
var http = require('http');

//导入参数解析模块
var querystring = require('querystring');


//构造业务处理器
var productModuleHandler = {
    //查询产品列表
    queryProductionList: function (request, response) {
        console.log("产品列表");
        response.end();
    },
    //查询产品详情
    queryProductionDetail: function (request, response) {
        console.log("产品详情");
        response.end();
    }
};


module.exports = productModuleHandler;