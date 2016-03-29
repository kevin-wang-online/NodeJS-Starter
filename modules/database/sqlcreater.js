//引入数据库连接模块
var mysql = require('mysql');


//创建新的用户
var createNewUser = function (username, password, mobileNumber, sex, birthday) {

    var statement = 'insert into ac_user (user_name,user_birthday,user_sex,user_mobile,user_password) ' + 'values (' +
        mysql.escape(username) + ',' +
        mysql.escape(birthday) + ',' +
        mysql.escape(sex) + ',' +
        mysql.escape(mobileNumber) + ',' +
        mysql.escape(password) + ')';

    return statement;

};

//根据ID获取用户信息
var getUserByPrimaryKey = function (primaryKey) {

    var statement = 'select * from ac_user where user_mobile = ' + mysql.escape(primaryKey);

    return statement;

};

//更新用户密码
var resetPassword = function (userId, password) {

    var statement = 'update ac_user set user_password = ' + mysql.escape(password) + ' where user_id = ' + mysql.escape(userId);

    return statement;

};

//SQL语句构造器
var sqlCreater = {
    createNewUser: createNewUser,
    getUserByPrimaryKey: getUserByPrimaryKey,
    resetPassword: resetPassword
};

module.exports = sqlCreater;
