function login() {
    var username = $("#inputUsernameEmail").val();
    var password = $("#inputPassword").val();
    if (username == "" || password == "") {
        alertmsg("名字或密码不能为空");
        window.location.href = "/";
        return;
    }
    var jsondata = {'username': username, 'password': password};
    commonpostjson("login", jsondata, function (data) {
        if (data.result == "ok") {
            $.cookie("username", username);
            if(data.opername =="zhdd"){
                window.location.href = "dispatch";
                return;
            }
            window.location.href = "/";
            return;
        } else {

            alertmsg(data.result);
            return;
        }

    });

}

function loginm() {
    var username = $("#inputUsernameEmail").val();
    var password = $("#inputPassword").val();
    if (username == "" || password == "") {
        alertmsg("名字或密码不能为空");
        window.location.href = "/";
        return;
    }
    var jsondata = {'username': username, 'password': password};
    commonpostjson("login", jsondata, function (data) {
        if (data.result == "ok") {
            $.cookie("username", username);
            window.location.href = "mobile";
            return;
        } else {

            alertmsg(data.result);
            return;
        }

    });

}