//引入数据库连接模块
var mysql = require('mysql');

var databaseManager = {

    //数据库连接
    connection: "",

    //创建数据库连接
    createConnection: function(){

        //创建数据库连接实例
        this.connection = mysql.createConnection({
            host     : '139.196.28.181',
            user     : 'root',
            password : 'peterguan',
            database : 'melo'
        });

        //连接数据库
        this.connection.connect(function (error) {

            if (error) {
                console.log('数据库连接错误:' + error.stack);
                return;
            }
        });

    },

    //执行数据库操作
    excuteSQLOperation: function (sqlStatement, callback) {

        //执行数据库操作
        this.connection.query(sqlStatement, callback);

    },

    //关闭数据库连接
    closeConnection: function () {

        //关闭数据库连接
        this.connection.end();

    }
};

module.exports = databaseManager;



