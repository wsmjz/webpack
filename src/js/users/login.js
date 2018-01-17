var $ = require("jquery");
var common = require("../common/common");
require("src/assets/js/jquery.cookie");
function login() {
    var username = $("#inputUsernameEmail").val();
    var password = $("#inputPassword").val();
    if (username === "" || password === "") {
        alert("名字或密码不能为空");
        window.location.href = "/login.html";
        return;
    }
    var jsondata = {username: username, password: password};
    common.commonpostjson("login", jsondata, function (data) {
        $.cookie("username",username);
        if (data.result === "ok") {
            window.location.href = "/index.html";
        }
        else {
            alert(data.result);
        }

    });
}

exports.login = login;

function loginm() {
    var username = $("#inputUsernameEmail").val();
    var password = $("#inputPassword").val();
    if (username === "" || password === "") {
        alert("名字或密码不能为空");
        window.location.href = "/login.html";
        return;
    }
    var jsondata = {username: username, password: password};
    common.commonpostjson("login", jsondata, function (data) {
        if (data.result === "ok") {
            $.cookie("username",username);
            window.location.href = "/index.html";
        }
        else {
            alert(data.result);
        }
    });
}

exports.loginm = loginm;