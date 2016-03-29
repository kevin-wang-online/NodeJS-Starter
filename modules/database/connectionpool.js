//引入数据库连接模块
var mysql = require('mysql');

//构造连接池管理器
var connectionPollManager = {

    //连接池
    connectionPool: "",

    //创建连接池
    createConnectionPool: function(){

        //创建数据库连接池
        this.connectionPool = mysql.createPool({
            //地址
            host: '139.196.28.181',
            //用户名
            user: 'root',
            //密码
            password: 'peterguan',
            //数据库
            database : 'AccountingCloud',
            //数据库连接数量限制
            connectionLimit: 10
        });
    },

    //获取连接
    getConnectionFromPoll: function (callback) {

        //获取数据库连接
        this.connectionPool.getConnection(callback);

    },

    //关闭连接池
    closeConnectionPoll: function () {

        //关闭数据库连接池
        this.connectionPool.end(function (error) {
            console.log("数据库连接池关闭出错" + error);
        });

    }
};

//创建连接池
connectionPollManager.createConnectionPool();

module.exports = connectionPollManager;


