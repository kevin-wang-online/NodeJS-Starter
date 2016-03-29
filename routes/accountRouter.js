//导入express服务器框架
var express = require('express');

//导入业务逻辑处理
var accountModuleHandler = require('../business/accountModuleHandler');

//获取服务器路由Router
var router = express.Router();


/****************************************************/
/*******************账户管理模块**********************/
/****************************************************/

//请求手机验证码
router.post('/user_captcha', function (request, response, next) {

    accountModuleHandler.getCaptcha(request, response);

});

//注册
router.post('/user_new', function (request, response, next) {

    accountModuleHandler.createNewUser(request, response);

});

//登录
router.post('/user_login', function (request, response, next) {

    accountModuleHandler.userLoginIn(request, response);

});

//忘记密码
router.post('/user_replacement', function (request, response, next) {

    accountModuleHandler.resetPassword(request, response);

});

module.exports = router;
