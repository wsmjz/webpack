"use strict";
var $ = require("jquery");
const urljs = function urljs() {
    var a = new Array();
    a.push("http://");
    a.push(getHost());
    a.push("/");
    return a.join("");
};

// 获取ip和端口
function getHost() {
    return  "192.168.2.150:444";// window.location.host;":"+window.location.port
}
exports.getHost = getHost;

function commonpostjson(func, jsondata, callback) {

    var usrl = urljs() + func;
    $.ajax({
        url: usrl,
        type: "post",
        data: JSON.stringify(jsondata),
        cache: false,
        async: false,
        contentType: "application/json; charset=UTF-8",
        processData: false,
        success: function (dataa) {
            callback(dataa);
        },
        error: function () {
            alert("传递失败");
        },
    });
}

exports.commonpostjson = commonpostjson;