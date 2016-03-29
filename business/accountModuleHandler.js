//导入数据库连接模块
var databaseManager = require('../modules/database/connection');

//导入数据库连接池模块
var connectionPoolManager = require('../modules/database/connectionpool');

//导入SQL语句构造器模块
var sqlcreater = require('../modules/database/sqlcreater');

//导入返回结果构造模块
var resultModel = require('../models/HttpResultModel/resultModel');

// 导入日志模块
var logger = require('../modules/log4js/log4js').createLogger("AccountModule");

//导入Node的http请求模块
var http = require('http');

//导入参数解析模块
var querystring = require('querystring');

//获取手机验证码
var getCaptcha = function (request, reponse) {

    //短信接口请求配置参数
    var options = {
        host : '183.193.11.138',
        port : '8888',
        path : '/fenglinapp/user_sendCode.do',
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json; charset=UTF-8',
            'Content-Length' : Buffer.byteLength(querystring.stringify(request.body), 'utf8')
        }
    };

    //向短信WebService发送请求
    var captchaRequest = http.request(options, function(req) {

        var responseData;

        req.on('data', function(data) {

            logger.info("获得数据片段");

            responseData = responseData + data;

        }).on('end', function() {

            logger.info("获取数据结束");

            logger.info(responseData);

            reponse.end();

        });

    }).on('error', function(e) {

        console.error("请求出错:" + e);

        reponse.end();

    });

    //发送POST请求时传入JSON参数数据
    captchaRequest.write(querystring.stringify(request.body));

    //关闭请求
    captchaRequest.end();

};

//创建新用户
var createNewUser = function (request, response) {

    var sex = request.body.sex;
    var username = request.body.username;
    var password = request.body.password;
    var birthDay = request.body.birthDay;
    var mobileNumber = request.body.mobileNumber;

    //从连接池获取数据库连接
    connectionPoolManager.getConnectionFromPoll(function (error, connection) {

        if(error){

            //获取数据库连接出错
            logger.info("获取数据库连接出错:" + error);

            return;
        }

        logger.info('数据库连接ID:' + connection.threadId);

        connection.query(sqlcreater.createNewUser(username, password, mobileNumber, sex, birthDay), function (error, results) {

            //关闭数据库连接
            connection.release();

            if(error){
                logger.info("数据库语句执行错误:" + error.code);

                if(error.code == "ER_DUP_ENTRY"){
                    //已存在相同的主键
                    response.send(resultModel.constructor("ERROR", "该手机号已被注册,请您更换手机号重试!"));
                }
                else{
                    response.send(resultModel.constructor("ERROR", error.code));
                }
            }
            else{
                //构造返回数据结果
                var responseResults = {
                    id: results.insertId,
                    username: username,
                    password: password,
                    birthDay: birthDay,
                    mobileNumber: mobileNumber,
                    sex: sex
                };

                //返回数据
                response.send(resultModel.constructor("OK", "新用户创建成功,请返回登录", responseResults));
            }

            //请求关闭
            response.end();
        });
    });
};

//用户登录
var userLoginIn = function (request, response) {

    var mobileNumber = request.body.mobileNumber;
    var password = request.body.password;

    //从连接池获取数据库连接
    connectionPoolManager.getConnectionFromPoll(function (error, connection) {

        if(error){

            //获取数据库连接出错
            logger.info("获取数据库连接出错:" + error);

            return;
        }

        logger.info('数据库连接ID:' + connection.threadId);

        connection.query(sqlcreater.getUserByPrimaryKey(mobileNumber), function (error, results) {

            //关闭数据库连接
            connection.release();

            if(error){
                logger.info("数据库语句执行错误:" + error.code);

                response.send(resultModel.constructor("ERROR", error.code));
            }
            else{

                if(results == "" || results.length == 0){
                    //用户不存在
                    response.send(resultModel.constructor("ERROR", "用户不存在,请重新输入后登录!"));
                }
                else{
                    if(results[0].user_password == password){
                        //构造返回数据结果
                        var responseResults = {
                            id: results[0].user_id,
                            username: results[0].user_name,
                            birthDay: results[0].user_birthday,
                            mobileNumber: results[0].user_mobile,
                            sex: results[0].user_sex
                        };

                        response.send(resultModel.constructor("OK", "登录成功!", responseResults));
                    }
                    else{
                        //返回数据
                        response.send(resultModel.constructor("ERROR", "密码错误,请输入密码重新登录!"));
                    }
                }
            }

            //请求关闭
            response.end();
        });
    });
};

//修改密码
var resetPassword = function (request, response) {

    var userId = request.body.userId
    var newPassword = request.body.password;

    //从连接池获取数据库连接
    connectionPoolManager.getConnectionFromPoll(function (error, connection) {

        if(error){

            //获取数据库连接出错
            logger.info("获取数据库连接出错:" + error);

            return;
        }

        logger.info('数据库连接ID:' + connection.threadId);

        connection.query(sqlcreater.resetPassword(userId, newPassword), function (error, results) {

            //关闭数据库连接
            connection.release();

            if(error){
                logger.info("数据库语句执行错误:" + error.code);

                response.send(resultModel.constructor("ERROR", error.code));
            }
            else{
                if(results.changedRows == 0){
                    //和之前密码相同
                    response.send(resultModel.constructor("ERROR", "新密码不可与原密码相同,请重新输入修改密码!"));
                }
                else{
                    response.send(resultModel.constructor("OK", "密码修改成功,请返回重新登录!"));
                }
            }

            //请求关闭
            response.end();
        });
    });
};

//构造业务处理器
var accountModuleHandler = {
    getCaptcha: getCaptcha,
    createNewUser: createNewUser,
    userLoginIn: userLoginIn,
    resetPassword: resetPassword
};

module.exports = accountModuleHandler;