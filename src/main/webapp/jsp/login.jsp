<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/layout/common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>学生系统</title>
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <link type="text/css" rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
    <link href="bootstrap/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link type="text/css" rel="stylesheet" href="css/public_header_footer.css" />
    <link type="text/css" rel="stylesheet" href="css/common.css" />
    <link type="text/css" rel="stylesheet" href="css/style.css" />
    <script type='text/javascript' src="js/jquery-1-8-1-min.js"></script>
    <script type='text/javascript' src="bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <style>
        #header{display:none;}
        body,html,.focus{background:#fff;height:100%;overflow-y:hidden;}
        .header .header_top,.header .header_top a{color:#000000;}
        .login_wrap{height:100%;width:100%;margin:0 auto;background:url("images/login_bg.jpg?1") no-repeat;background-size: cover;}
        .login_article{color:#fff;text-indent:0;}
        .loginBox{width:1200px;margin:0 auto;}
    </style>
</head>
<body>
<!-- 头部 -->
<%@ include file="/layout/header_login.jsp"%>
<!-- nav -->
<%@ include file="/layout/menu_login.jsp"%>
<!-- 内容 -->
<div class="focus" id="flash">
    <div class="login_wrap">
        <div class="loginBox">
            <div class="login">
                <h2 class="error"><s:message code="label.login" /></h2><!-- 会员登录中心，错误提示 -->
                <div class="lg_main">
                    <form id="loginForm" name="loginForm" method="post" onsubmit="login();return false;">
                        <p><!-- 用户名 -->
                            <input tabindex="1" name="user_name" id="user_name" type="text" class="lg_input" value="" placeholder="用户名"/>
                        </p>
                        <p><!-- 密码 -->
                            <input tabindex="2" name="user_pwd" id="user_pwd" type="password"  class="lg_input" value="" placeholder="密码"/>
                        </p>
                        <p><!-- 登录按钮 -->
                            <input tabindex="4" type="submit" value='登陆' class="btn btn-block lg_submit">
                        </p>
                    </form>
                    <p class="ofw"><span class="pull-left">没有账号？<a href="jsp/register_form.jsp">注册</a><!-- 注册 --></span>
                        <span class="lg_find">忘记密码？<a href="jsp/retake_password2.jsp">找回密码</a></span>
                        <!-- 忘记密码 -->
                    </p>
                    <p>建议使用IE，谷歌或火狐浏览器</p>
                </div>
            </div>
            <!-- 登录旁白 -->
            <div class="login_article">
                <h2>全球钻石商的交易中心</h2>
                <p>直接，简单，透明</p>
            </div>
        </div>
    </div>
</div>

<!-- 倒计时 弹框  -->
<div class="lastMask"></div>
<div class="lastday" id="lastday">
    <p class="top"><img src="images/lclose.png" class="lclose"/></p>
    <div class="msg_center">
        <p class="lst_p1">Please enjoy Bidiam !</p>
        <p class="lst_p2">Official Version Released On March 1st Counting Down</p>
        <p class="lst_p3"><span class="lst_sp1" id="lastTime"></span><span id="lastLabel"></span></p>
        <p class="lst_p4">close in <span class="lst_sp2" id="sptime">10</span> seconds</p>
    </div>
</div>
</body>
<script type="text/javascript">

    $(function(){
        //操作超时
        if(window !=top){
            top.location.href=location.href;
        }
    })
    function login(){
        var userName = $.trim($("input[name='user_name']").val());
        var password = $("input[name='user_pwd']").val();
        if (password == "") {
            $('.login h2').addClass('error').text('请输入密码');
            return false;
        }
        if(userName == "")  {
            $('.login h2').addClass('error').text('请输入用户名');
            return  false;
        }
        var queryParam = 'account='+userName+'&password='+password;
        post('/login/login',queryParam,function(result){
            if (result.code == '200') {
                gotoPage("/jsp/backfront/index.jsp");
            } else {
                alert(result.data);
            }
        })
    }
</script>

<script>
    function hideLastDay(){
        $(".lastMask").hide();
        $(".lastday").hide();
    }

    //保存cookie
    function setCookieValue(name,value,validTime){
        if(!validTime){
            validTime = 60;
        }
        var exp  = new Date();
        exp.setTime(exp.getTime() + validTime*1000);  //换成毫秒
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    window.showFlag = false
</script>
</html>
