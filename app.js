// 导入express服务器框架
var express = require('express');

var path = require('path');
// 导入favicon服务器图标模块
var favicon = require('serve-favicon');
// 导入HTTP logger日志模块
var logger = require('morgan');
// 导入cookie解析模块
var cookieParser = require('cookie-parser');
// 导入文件上传解析模块,处理 JSON, Raw, Text 和 URL 编码的数据
var bodyParser = require('body-parser');

// 导入日志模块
var log = require('./modules/log4js/log4js');

// 导入路由-账户模块
var accountRouter = require('./routes/accountRouter');
// 导入路由-产品模块
var productRouter = require('./routes/productRouter');

// 获取express服务器实例
var app = express();

// 视图引擎配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/********************************/
/***********外部依赖模块**********/
/********************************/

// 定义icon图标
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 定义HTTP日志和输出级别
app.use(logger('dev'));

// 使用日志
app.use(log.log4js.connectLogger(log.createLogger("AccountingCloud"), {level : 'auto'}));

// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 定义cookie解析器
app.use(cookieParser());

// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 匹配路由模块【Ex.不同的用户类型,可以配置不同的路由模块】
app.use('/account', accountRouter);
app.use('/product', productRouter);

/********************************/
/*************捕捉异常************/
/********************************/


//服务器捕捉到404错误异常,推向错误处理
app.use(function(req, res, next) {

    var err = new Error('Not Found');

    err.status = 404;

    //Forward
    next(err);

});


/********************************/
/*************错误处理************/
/********************************/

// 开发环境，500错误处理和错误堆栈跟踪
if (app.get('env') === 'development') {

    app.use(function(err, req, res, next) {

        res.status(err.status || 500);

        res.render('error', {
            message: err.message,
            error: err
        });

    });

}

// 生产环境，500错误处理
app.use(function(err, req, res, next) {

    res.status(err.status || 500);

    res.render('error', {
        message: err.message,
        error: {}
    });

});


// 输出模型app
module.exports = app;