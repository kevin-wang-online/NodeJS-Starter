//导入express服务器框架
var express = require('express');

//导入业务逻辑处理
var productModuleHandler = require('../business/productModuleHandler');

//获取服务器路由Router
var router = express.Router();


/****************************************************/
/*******************产品管理模块**********************/
/****************************************************/

//获取产品列表
router.get('/product_list', function (request, response, next) {

    productModuleHandler.queryProductionList(request, response);

});

//获取产品详情
router.get('/product_detail', function (request, response, next) {

    productModuleHandler.queryProductionDetail(request, response);

});

module.exports = router;
