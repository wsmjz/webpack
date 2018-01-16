var $ = require("jquery");
var common = require("../common/common");

function login() {
    var username = $("#inputUsernameEmail").val();
    var password = $("#inputPassword").val();
    if (username == "" || password == "") {
        alert("名字或密码不能为空");
        window.location.href = "/";
        return;
    }
    var jsondata = {username: username, password: password};
    common.commonpostjson("login", jsondata, function (data) {
        if (data.result == "ok") {
            window.location.href = "/";
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
        window.location.href = "/";
        return;
    }
    var jsondata = {username: username, password: password};
    common.commonpostjson("login", jsondata, function (data) {
        if (data.result == "ok") {
            window.location.href = "mobile";
        }
        else {
            alert(data.result);
        }
    });
}

exports.loginm = loginm;