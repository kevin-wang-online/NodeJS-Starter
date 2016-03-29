var resultModel = {
    //构造返回结果对象
    constructor: function (status, message, content) {

        if(status == "OK"){
            //成功
            if (typeof(message) == "undefined" && typeof(content) == "undefined") {
                //两个参数均不存在
                var result = {
                    status: 0
                };

                return result;
            }
            else if(typeof(message) != "undefined" && typeof(content) == "undefined"){
                //仅存在status message参数
                var result = {
                    status: 0,
                    message: message,
                };

                return result;
            }
            else if(typeof(message) == "undefined" && typeof(content) != "undefined"){
                //存在status content参数
                var result = {
                    status: 0,
                    content: content
                };

                return result;
            }
            else{
                //参数都存在
                var result = {
                    status: 0,
                    message: message,
                    content: content
                };

                return result;
            }
        }
        else{
            var result = {
                status: 1,
                message: message,
            };

            return result;
        }
    }
};

module.exports = resultModel;