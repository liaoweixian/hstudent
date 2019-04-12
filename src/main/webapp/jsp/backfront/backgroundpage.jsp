﻿<%@ include file="/layout/common.jsp"%>
﻿
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>后台模板</title>
<link rel="stylesheet" href="../../bootstrap/css/bootstrap.min.css"
	type="text/css" media="screen" />
<link href="../../bootstrap/font-awesome/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="css/j_public.css" type="text/css"
		media="screen" />
	<link rel="stylesheet" href="css/j_style.css" type="text/css"
		media="screen" />
	<script type='text/javascript' src="../../js/jquery-1-8-1-min.js"></script>
	<script type='text/javascript'
		src="../../bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="../../js/common.js"></script>
	<script type="text/javascript">
		var param = {};
		var userId = '1';
		var flag = false;
		$(function() {

			var user_name = '就是这个';
			param['user_name'] = user_name;

			//setData();
		});

		function setData() {
			var url = "/order.do?action=queryMyDiamond";
			var param1 = "";
			var param2 = "";
			post("/roleusermap.do?action=queryDistributedRole", "selectUserId="
					+ userId, function(result) {
				$.each(result.data, function(k, v) {
					if (v.roleId == '7') {//brinks
						flag = true;
					}
				});

				if (!flag) {//admin
					param1 = "isAllUser=1&page=1&pageSize=10&status=5";
					param2 = "isAllUser=1&page=1&pageSize=10&status=6";
					$("#all").attr("href", "Lomanage.jsp");
					$("#tostock").attr("href", "Lomanage.jsp");
					$("#togogoods").attr("href", "Lomanage.jsp");
				} else {//brinks
					param1 = "isAllUser=1&page=1&pageSize=10&status=3";
					param2 = "isAllUser=1&page=1&pageSize=10&status=4";
					$("#all").attr("href", "Lomanage.jsp?status=4");
					$("#tostock").attr("href", "Lomanage.jsp?status=3");
					$("#togogoods").attr("href", "Lomanage.jsp?status=4");
				}
				var a = 0;
				var b = 0;
				post(url, param1, function(data) {//待入库
					a = data.data.total;
					$("#tostock").html(a);
				});
				post(url, param2, function(data) {//代发货
					b = data.data.total;
					$("#togogoods").html(b);
					$("#all").html(b);
				});
			});
		}
	</script>
</head>
<body>

	<div id="jmain">
		<div class="backgoundpage">
			<p class="p_title">
			  <span><s:message code="label.backgroundpage.text1"/><!-- 亲爱的  --></span><span> ${user.name}</span><span> ,<s:message code="label.backgroundpage.text2"/><!-- 我的待办欢迎您  -->！</span>
			</p>

		</div>
	</div>
</body>
</html>