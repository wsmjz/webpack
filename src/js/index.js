'use strict'
//var _ = require("lodash");
var $ = require("jquery");
var common = require("src/js/common/common");
require("src/assets/js/jquery.cookie");

function indexinit() {

    var username = $.cookie("username");
    if (username === undefined) {
        window.location.href = "/login.html";
        return;
    }
    console.log(username);
   $("#content").val(username);
    return common.getHost();

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    //var innerHTML = _.join(["Hello", "webpack", username], " ");
    //return innerHTML;
}

exports.indexinit = indexinit ;




