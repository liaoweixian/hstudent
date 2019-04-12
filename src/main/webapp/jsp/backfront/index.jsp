<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/layout/common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>后台</title>
    <link rel="stylesheet" href="../../bootstrap/css/bootstrap.min.css" type="text/css" media="screen"/>
    <link href="../../bootstrap/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="css/index.css" type="text/css" media="screen"/>
	<link type="text/css" rel="stylesheet" href="../../css/shop_css/idangerous.swiper.css">

    <script type='text/javascript' src="../../js/jquery-1-8-1-min.js"></script>
    <script type='text/javascript' src="../../bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../../js/common.js"></script>
    <script type="text/javascript" src="js/tendina.min.js"></script>
    <script type="text/javascript" src="js/bacf_base.js"></script>
	<script type='text/javascript' src="../../css/shop_css/idangerous.swiper-2.1.min.js"></script>
</head>
<body id="main">

<div id="passwordhtml" class="modal hide fade" style="margin-top: 100px;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3> </h3>
  </div>
  <div class="modal-body">
  	<div class="tc">
	    <div class="retake_pwd">
				<p><label class="j_lab90"><s:message code="label.update_password.test3"/>：</label><input type="password" id="old_password" class="retake_pwd_ipt"/></p>
				<p><label class="j_lab90"><s:message code="label.update_password.test4"/>：</label><input type="password" oninput="checkPwd(this.value)" id="new_password" class="retake_pwd_ipt"/></p>
				<label class="j_lab90"><s:message code="label.update_password.test5"/>：</label>
					<div class="retake_wms clearfix">
	                    <p><em>
	                        <s:message code="label.retake_password.test2"/>
	                    </em><em>
	                        <s:message code="label.retake_password.test3"/>
	                    </em><em>
	                        <s:message code="label.retake_password.test4"/>
	                    </em></p>
	                    <!--weak_wrp 弱        middle_wrp 中      strong_wrp 强-->
	                    <span class="weak_wrp" id="wrp_sp">
	                        <em class="weak"></em><em class="middle"></em><em class="strong"></em>
	                    </span>
	               	 </div>
				<p><label class="j_lab90"><s:message code="label.update_password.test9"/>：</label><input type="password" id="password2" class="retake_pwd_ipt"/></p>
				<div class="retake_btn_wrap">
					<input type="reset" class="btn btn-primary" value='<s:message code="label.update_password.test10"/>' id="reset" onclick="reset()"/>
					<input type="submit" class="btn btn-primary" value='<s:message code="label.update_password.test11"/>' onclick="submit()"/>
				</div>
			</div>
    </div>  
  </div>  
</div>

<div id="datahtml" class="modal hide fade" style="margin-top: 100px;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3> </h3>
  </div>
  <div class="modal-body">
  	<div class="tc" style="padding:30px; font-size:16px; line-height:30px;">
	    <div class=" personal">
				<form class="form-horizontal  j-form-inline" enctype="multipart/form-data"> 
					<div class="control-group">
						<label class="control-label" for="inputEmail"><s:message code="label.personal.test2"/>：</label>
						<div class="controls">
							<p class="pers_name">${user.name}</p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="inputEmail"><s:message code="label.personal.test6"/>：</label>
						<div class="controls">
							<input type="text" class="span3" name="email" id="email"  maxlength='50'>
							<span id="email_sp"></span>
						</div>
					</div>
					<div class="control-group">
						<input type="checkbox" id="messageEmail" /><label class="j_lab" for="messageEmail"><!-- 通过邮件接收系统消息 --><s:message code="label.personal.test27"/></label>
					</div>
					
					<div class="datahtml_wrap">
						<input type="hidden" name="userId" value="1" />
						<input class="btn btn-primary" type="button" id='btnUpdate' value='<s:message code="label.personal.test13"/>' onclick='showData()' />
						<input class="btn btn-primary" type="button" id='btnSave' onclick='vaild()' value='<s:message code="label.child_account_add.test6"/>' />
					</div>
				</form>
				</div>
    </div>  
  </div>  
</div>

<!--顶部-->
<div class="layout_top_header">
	<div class="change_lang">
		<c:if test="${locale.language == 'zh' }">
           <a href="javascript:;" onclick="changeLocale('en_US');">English</a>
        </c:if>
        <c:if test="${locale.language == 'en' }">
           <a href="javascript:;" onclick="changeLocale('zh_CN');">中文</a> 	
        </c:if>    
	</div>
    <div id="ad_setting" class="ad_setting">
        <a class="ad_setting_a" href="javascript:; ">
            <i class="fa fa-user"></i>
            <span>管理员</span><!-- 管理员 -->
        </a>
        <ul class="dropdown-menu-uu" style="display: none" id="ad_setting_ul">
            <li>
                <a href="javascript:;" onclick="modifyPassword()"><!-- 修改密码 -->修改密码</a>
            </li>
            <li>
                <a href="javascript:;" onclick="modifyData()"><!-- 修改个人资料 -->修改个人资料</a>
            </li>
            <li>
                <a href="javascript:;" onclick="exitUser()"><i class="fa fa-fw fa-power-off"></i>退出</a>
            </li>
        </ul>
    </div>
</div>
<!--顶部结束-->
<!--菜单-->
<div class="layout_left_menu">
    <ul id="menu" class="side-nav">
		<li class="active"><a href="backgroundpage.jsp" data-open-tab="backgroundpage" target="menuFrame"><i class="fa fa-fw fa-desktop"></i> 菜单</a></li>
		<li>
			<a href="javascript:;" alt="学生管理"><i class="fa fa-fw fa-arrows-v"></i>学生管理<i class="fa fa-fw fa-caret-down"></i></a>
			<ul>
				<li><a href="user_manage.jsp" data-open-tab="">学生列表</a></li>
				<li><a href="www.baidu.com" data-open-tab="">就是这个</a></li>
			</ul>
		</li>
		<li>
			<a href="javascript:;" alt="系统管理"><i class="fa fa-fw fa-arrows-v"></i>系统管理<i class="fa fa-fw fa-caret-down"></i></a>
			<ul>
				<li><a href="user_manage.jsp" data-open-tab="">角色管理</a></li>
				<li><a href="www.baidu.com" data-open-tab="">用户管理</a></li>
			</ul>
		</li>
    </ul>
</div>
<!--菜单-->
<div id="layout_right_content" class="layout_right_content">
	<div class="uldiv">
	   <div class="btndiv" id="index_btndiv" style="display:none;">
	       <a class="abtn aleft arrow-left"  href="#"><i class="fa fa-chevron-left"></i></a>
	       <a class="abtn aright arrow-right"  href="#"><i class="fa fa-chevron-right"></i></a>
	   </div>
	   <div class="scrollcontainer swiper-container" id="iframe_tab_tit" >
    	<ul class="iftab_ul swiper-wrapper">
    		<li class="current swiper-slide" data-tab-id="backgroundpage"><span style="width:100px;">首页<!-- 首页--></span></li>
    	</ul>
      </div>
    </div>
    <div class="mian_content">
        <div id="page_content">
            <iframe class="menuFrame" data-iframe-id="backgroundpage" name="menuFrame" src="backgroundpage.jsp" 
                    scrolling="auto" frameborder="no" ></iframe>
        </div>
    </div>
</div>
</body>
<script>
	

    $(function () {
    	
	 	//加载权限菜单
        $('#menu').tendina();
        $("#ad_setting").mouseover(function(){
        	$(this).children("#ad_setting_ul").show();
        }).mouseout(function(){
        	$(this).children("#ad_setting_ul").hide();
        })
        
        /* 打开一个 关闭一个*/
        $('#datahtml').on('show', function () {
        	$('#passwordhtml').modal('hide');
	    })
	    $('#passwordhtml').on('show', function () {
	    	$('#datahtml').modal('hide');
	    })
    })
    
    function exitUser() {
		gotoPage('login.jsp')
	}
    function modifyPassword() {
    	$('#passwordhtml').modal({
		    backdrop:false,
		    show:true
		});
	}
    function modifyData() {
    	$('#datahtml').modal({
		    backdrop:false,
		    show:true
		});
	}
    
    function reset() {
    	$("#old_password").val("");
    	$("#new_password").val("");
    	$("#password2").val("");
    }
    
    function checkPwd(val) {
    	var lv = 0;
    	if (val.match(/[a-z]/ig)){lv++;} 
    	if (val.match(/[0-9]/ig)){lv++;} 
    	if (val.match(/(.[^a-z0-9])/ig)){lv++;} 
    	switch(lv) {
    		case 1:$("#wrp_sp").attr("class", "weak_wrp"); break;
    		case 2:$("#wrp_sp").attr("class", "middle_wrp"); break;
    		case 3:$("#wrp_sp").attr("class", "strong_wrp"); break;
    	}
    }
    function submit() {
    	var oldPassword = $("#old_password").val();
    	var newPassword = $("#new_password").val();
    	var password2 = $("#password2").val();
    	if (!oldPassword) {
    		alert('<s:message code="label.update_password.test19"/>');
    		return;
    	}
    	if (!newPassword) {
    		alert('<s:message code="label.update_password.test20"/>');
    		return;
    	}
    	
    	if (oldPassword && newPassword) {
    		if (newPassword.length < 6) {
    			alert('<s:message code="label.update_password.test18"/>');
    			return;
    		}
    		if (newPassword.length > 20) {
    			alert('<s:message code="label.update_password.test18"/>');
    			return;
    		}
    		if(!/^[A-Za-z0-9_-]+$/.test(newPassword)) {
    			alert('<s:message code="label.update_password.test18"/>');
    			return;
    		}
    		if (newPassword != password2) {
    			alert('<s:message code="label.update_password.test15"/>');
    			return;
    		}
    		
    		var url = "/userInfo/updatePassword.do";
    		var param = "oldPassword="+oldPassword+"&newPassword="+newPassword;
    		post(url, param, function(result) {
    			var data = result.data;
    			if (data == 2) {
    				alert('<s:message code="label.update_password.test16"/>');
    			} else {
    				alert('<s:message code="label.update_password.test17"/>');
    				gotoPage("/jsp/login.jsp"); 
    			}
    		});
    	}
    }
    
    function showData() {
		$("#btnUpdate").hide();
		$("#email_sp").hide();
		$("#email").show();
		$("#btnSave").show();
	}

	function hideUser() {
		$("#btnSave").hide();
		$("#email").hide();
	}
	
	function init() {
			var url = '<%=basePath%>userInfo/queryUserByName.do';
			$.post(url,  function(result) {
				var data = result.data;
				if (data) {
					var email = data.email;
					var messageEmail = data.messageEmail;
					$("#email").val(email);
					$("#email_sp").html(email);
					if(messageEmail){
						$("#messageEmail").attr("checked","checked");
					}
					hideUser();
				}
			});
	}
	
	init();
	function vaild() {
		var email = $("#email").val().NoSpace();
		var messageEmail = $("#messageEmail").attr("checked")=="checked"?1:0;
		if (email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1){
		} else {
			alert('<s:message code="label.personal.test18"/>');
			return false;
		}
		var url = "/userInfo/updateUserInfo.do";
		var param = new Array();
		param.push("email="+email);
		param.push("messageEmail="+messageEmail);
		post(url, param.join("&"), function(result) {
			if (result.data == 1) {
				alert('<s:message code="label.personal.test19"/>');
				//gotoPage("/jsp/personal.jsp");
				location.reload();
			}
		});
	}
</script>
</html>