var commFun = {
    /**
     * noModel层
     * @param id noModel的ID
     * @param title 标题
     * @param width 宽
     * @param height 高
     * @param content 内容
     * @param confirmFun 确定按钮的回调函数
     * @param subParams 确定按钮参数
     * @param isHideBut 是否隐藏按钮
     * @param closeFun 关闭按钮回调函数
     * @param closeParam 关闭按钮参数
     * @param closefun 右上角关闭回调函数
     */

    /*    donomodel: function (id, title, width, height, content, url, confirmFun, subParams, isHideBut, closeFun, closeParam) {*/
    donomodel: function (id, title, width, height, content, url, confirmFun, subParams, isHideBut, closeFun) {
        $.noModel({
            id: id,
            title: title,
            width: width,
            height: height,
            content: content,
            url: url,
            isHideBut: isHideBut,
            singleButtons: [
                /*                 {
                                 name: "关闭",
                                 order: 2,
                                 halign: "right",
                                 isDisabled: false,
                                 params: closeParam,
                                 callback: function (btnObj) {
                                     if (closeFun != undefined && closeFun != null) {
                                         return closeFun(closeParam);
                                     } else {
                                         return true;
                                     }
                                 }
                             }, */
                {
                    name: "提交",
                    order: 1,
                    halign: "right",
                    isDisabled: false,
                    params: subParams,
                    callback: function (btnObj) {
                        if (confirmFun !== undefined && confirmFun !== null) {
                            return confirmFun(btnObj);
                        } else {
                            return true;
                        }
                    }
                }],
            closeFun: function () {
                if (closeFun !== undefined && closeFun !== null) {
                    return closeFun();
                } else {
                    return true;
                }
            }
        });
    }
};

// 消息公共函数

var msgDictTemp = {};
var interNameArray = [];
var socket;
connectUrl = '/chat';

var urljs = "http://" + getHost() + "/";

var g_usrid = 0;

function getcurrentuserid() {
    if (g_usrid == 0) {
        var username = $.cookie("username");
        var jsdta = {'username': username};
        commonpostjson("query/users/id", jsdta, function (data) {
            if (data.length > 0) {
                g_usrid = data[0];
            }
            else {
                alertmsg("用户ID为空")
            }
        });
    }
    return g_usrid;

}

/**
 *调用示例：commFun.noModel(123,"标题", 330, 400, "<h1>内容</h1>", function(d){alert(d);
 *      return true;}, "确定哈哈", function(d){alert(d); return true;}, "关闭哈哈");
 */

//获取ip和端口
function getHost() {
    return window.location.host;//+":"+window.location.port
}

function commonpostjson(func, jsondata, callback) {
    var usrl = urljs + func;
    $.ajax({
        url: usrl,
        type: "post",
        data: JSON.stringify(jsondata),
        cache: false,
        async: false,
        contentType: 'application/json; charset=UTF-8',
        processData: false,
        success: function (data) {
            callback(data);
        },
        error: function () {
            alertmsg('传递失败');
        }
    });
}

function addTab(name, link) {
    var linkName = name;
    var target = $(link).attr('data-target');
    // hide other tabs 隐藏其他的标签
    $("#contentTab ul li").removeClass("active");
    //$("#content p").hide();
    var isTabExist = false;
    $('#contentTab ul').find('a').each(function (idx, a) {
        if ($(a).text() === linkName + 'x') {

            $(a)[0].click();
            isTabExist = true;
        }
    });

    if (isTabExist) {
        return;
    }

    // If tab already exist in the list, return  如果选项卡中已经存在于列表中，返回
    if ($("#" + $(link).attr("rel")).length != 0) {
        //当前标签  高亮
        $("#" + $(link).attr("rel")).parent().addClass("active");
        //显示当前标签的内容
        $("#" + $(link).attr("rel") + "_content").show();
        return;
    }

    var arrTarget = target.split("/");
    var herfTemp;
    for (var nCount = 0; nCount < arrTarget.length; nCount++) {
        herfTemp = arrTarget[nCount];
    }
    var arrHerf = herfTemp.split(".");
    var herf = arrHerf[0];

    var tab = $('<li role="presentation">' +
        '<a href="#' + herf + '_html" aria-controls="' + herf + '_html" role="tab" data-toggle="tab">' + linkName + '<span class="close" ' +
        'style="line-height: 17px; margin-left: 6px;">x</span></a>' +
        '</li>');

    $('#contentTab ul').append(tab);


    var panel = $('<div role="tabpanel" class="tab-pane active fade" id="' + herf + '_html"> ' + '正在加载...' + '</div>');

    $.get(target, function (data) {
        $('#' + herf + '_html').html(data);
    })
    $('#mainContent').append(panel);

    $(tab).find('span').on('click', function (e) {
        e.stopPropagation();
        var prev = $(tab).prev().find('a')[0];
        $(tab).remove();
        $(panel).remove();
        setTimeout(function () {
            prev.click();
        })
    });
    $(tab).find('a')[0].click();
}

<!--删除确认逻辑-->
function isDelConfirm(content) {

}

<!--跳转逻辑-->
function skipTab(idTemp) {
    var tabTemp = document.getElementById(idTemp);
    tabTemp.click();
}

<!--初始化Html-->
function initHtmlUrl(htmlUrl, id) {

   // var tabObj = document.getElementById(id);
    $("#"+id).load(htmlUrl,function () {
        initSelector("symbol-layer", "", "1");
    });
    // $.get(htmlUrl, function (data) {
    //     $(tabObj).html(data);
    //     initSelector("symbol-layer", "", "1");
    // })
}

<!--创建JSON-->
function createJson(str, prop, val) {
    if (typeof val === "undefined") {
        // 删除属性
        delete str[prop];
    }
    else {
        str[prop] = val;
    }
}

<!--初始化图层selector-->
function initSelector(selectId, urlAdd, layertype) {
    if (!arguments[1] || arguments[1].length == 0) {
        urlAdd = "http://" + getHost() + "/selectlayername";
    }

    $.ajax({
        url: urlAdd,
        type: "post",
        // Form数据
        data: "",
        contentType: false,
        cache: false,
        async: false,
        processData: false,
        success: function (data) {
            for (var nCount = 0; nCount < data.length; nCount++) {
                var object = data[nCount];

                if (bIsValidData(layertype)) {
                    if (object["layertype"] == layertype) {
                        var option = $("<option value =" + object["id"] + ">" + object["layername"] + "</option>");
                        option.appendTo($("#" + selectId));
                    }

                }
                else {
                    var option = $("<option value =" + object["id"] + ">" + object["layername"] + "</option>");
                    option.appendTo($("#" + selectId));
                }

            }
        },
        error: function () {
            alertmsg('传递失败');
        }
    });
}

<!--登陆加载右上用户-->
function initUserTitle(data) {

    var option = $('<img src="http://"+getHost()+"/' + data["headimg"] + '" height="30" width="30"><span style="color: #9d9d9d">' + data["username"] + '</span><b class="caret" style="color: #9d9d9d"></b>');
    option.appendTo($("#smallHead"));
    return;
    $.ajax({
        url: "http://" + getHost() + "/getusername",
        type: "post",
        // Form数据
        data: "",
        contentType: 'application/json; charset=UTF-8',
        cache: false,
        processData: false,
        success: function (data) {
            var option = $('<img src="http://"+getHost()+"/' + data["headimg"] + '" height="30" width="30"><span style="color: #9d9d9d">' + data["username"] + '</span><b class="caret" style="color: #9d9d9d"></b>');
            option.appendTo($("#smallHead"));
        },
        error: function () {
            var option = $('<img src="../../static/img/head_small.jpg"><span style="color: #9d9d9d">Admin</span><b class="caret" style="color: #9d9d9d"></b>');
            option.appendTo($("#smallHead"));
        }
    });
}

<!--处理QtContent加载-->
var qtContent;

function initQtContent() {
    if ("undefined" == typeof qt) {
        return;
    }
    new QWebChannel(qt.webChannelTransport, function (channel) {
        qtContent = channel.objects.content;
        qtContent.initMainWnd.connect(function (userName, userPsw) {
            data = {'username': userName, 'headimg': 'static/img/head_small.jpg'}
            var datauser = {'username': userName};
            var jsondata = {'username': userName, 'password': userPsw};
            commonpostjson("login", jsondata, function (dataTemp) {
                if (dataTemp.result == "ok") {
                    $.cookie("username", userName);
                    inimenu(datauser);
                    initLays();
                    initUserTitle(data);
                    initOther();
                }
            });
        })
        qtContent.initMainWindow();

        qtContent.getStrFunCall.connect(function (funcName, str) {
            var func = eval(funcName);
            new func(str);
        });

        window.QTConfirm = (function () {
            var cb = null;
            qtContent.setBoolRes.connect(function (tf, opername) {
                if (typeof cb === 'function') {
                    cb(tf);
                }
            });

            return function (title, callback) {
                qtContent.confirm(title);

                cb = function (tf) {
                    callback(tf);
                    cb = null;
                }
            }
        })()
    });
    acceptTips();
}


function QTConfirmhtml(a, func, parameter) {
    if ("undefined" != typeof qt) {
        QTConfirm(a, function (tf) {
            func(tf, parameter);
            return tf;
        });
    } else {
        if (confirm(a)) {

            if (bIsValidData(func)) {
                func("true", parameter);
            }

            return true;
        }
        else {
            if (bIsValidData(func)) {
                func("false", parameter);
            }

            return false;
        }
    }
}

function isQt() {
    if ("undefined" != typeof qt) {
        return true;
    } else {
        return false;
    }
}

function alertmsg(msg) {
    if ("undefined" != typeof qt) {
        qtContent.alert(msg);
    } else {
        alert(msg);
    }
}

//判断数组是否有相同值
function isRepeat(arr) {
    var hash = {};
    for (var i in arr) {
        if (hash[arr[i]])
            return true;
        hash[arr[i]] = true;
    }
    return false;
}

/**
 jQuery操作cookie的插件,大概的使用方法如下
 $.cookie('the_cookie'); //读取Cookie值
 $.cookie('the_cookie', ‘the_value'); //设置cookie的值
 $.cookie('the_cookie', ‘the_value', {expires: 7, path: ‘/', domain: ‘jquery.com', secure: true});//新建一个cookie 包括有效期 路径域名等
 $.cookie('the_cookie', ‘the_value'); //新建cookie
 $.cookie('the_cookie', null); //删除一个cookie

 jquery设置cookie过期时间与检查cookies是否可用
 让cookies在x分钟后过期
 var date = new date();
 date.settime(date.gettime() + (x * 60 * 1000));
 $.cookie(‘example', ‘foo', { expires: date });
 $.cookie(‘example', ‘foo', { expires: 7});

 检查cookies是否可用
 $(document).ready(function() {var dt = new date();dt.setseconds(dt.getseconds() + 60);document.cookie = “cookietest=1; expires=” + dt.togmtstring();var cookiesenabled = document.cookie.indexof(“cookietest=”) != -1;if(!cookiesenabled){//cookies不能用……..}});
 ***/
//
function acceptTips() {
    socket.on('acceptMyMsg', function (msgDict) {
        console.log(msgDict);
        $.toast({
            heading: '您有新的消息~',
            text: "来自 " + msgDict.sender + '：' + msgDict.content + "。",
            showHideTransition: 'plain',
            hideAfter: false,
            position: 'bottom-right'
        })
    });
}

//获取微信用户ID
function getOpenId(data) {
    // commonpostjson("query/wx_users/openid", {'userid': data}, function (data) {
    //     if (data.result === 'false') {
    //         alertmsg("没有用户绑定微信号！");
    //     }
    //     else {
    //         return data[i].openid;
    //     }
    // });
}

//合并单元格逻辑
function mergeMyCells(data, fieldName, colspan, target) {
    //data的数据类型是[{},{},{}...]
    //声明一个字典计算相同属性值在data对象出现的次数和

    var sortDict = {};
    for (var i = 0; i < data.length; i++) {
        for (var prop in data[i]) {
            if (prop === fieldName) {
                if (data[i].hasOwnProperty(prop)) {
                    var key = data[i][prop];
                    if (sortDict.hasOwnProperty(key)) {
                        sortDict[key] = sortDict[key] * 1 + 1;
                    } else {
                        sortDict[key] = 1;
                    }
                    break;
                }
            }
        }
    }
    //console.log(sortDict);

    var index = 0;
    for (var prop in sortDict) {
        var count = sortDict[prop] * 1;
        target.bootstrapTable('mergeCells', {index: index, field: fieldName, colspan: colspan, rowspan: count});
        index += count;
    }
}