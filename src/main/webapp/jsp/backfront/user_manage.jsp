<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/layout/common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>用户管理</title>
    <link rel="stylesheet" href="../../bootstrap/css/bootstrap.min.css" type="text/css" media="screen"/>
    <link href="../../bootstrap/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/j_public.css" rel="stylesheet" type="text/css">
    <link href="css/j_style.css" rel="stylesheet" type="text/css">
    <script type='text/javascript' src="../../js/jquery-1-8-1-min.js"></script>
    <script type='text/javascript' src="../../bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../../js/common.js"></script>
	<script type="text/javascript" src="../../js/jquery.provincesCity.js"></script>
	<script type="text/javascript" src="../../js/provincesdata.js"></script>
</head>
<body>
<div id="jmain" id="exchange">
	<div class="order_search box-margin">
		<p>
        	<span class="dl">
	        	<label class="j_lab">用户名</label>
	            <input name="username" type="text" id="text" class="span2" value="" size="20">
            </span>
			<input type="button" class="btn btn-primary" value="搜 索" id="btnSerch" onclick="loadData();"><!-- 搜索-->
		</p>
	</div>
    <div class="tabbable">
        <div class="exchange_tab">
            <label class="tip">学生管理</label>
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">学生列表</a></li>
                <li><a href="#tab2" data-toggle="tab" onclick="init('addrBox2')">增加学生</a></li>
            </ul>
        </div>
        <div class="tab-content">
            <div class="tab-pane active" id="tab1">
                <table class="dia table table-striped table_border_none" id="tbList">
                	<thead>
                		<tr>
                			<td>ID</td>
                			<td>学生名</td>
                			<td>性别</td>
                			<td>年龄</td>
							<td>状态</td>
                			<td>创建时间</td>
                			<td>修改时间</td>
                			<td>操作</td>
                		</tr>
                	</thead>
                	<tbody id="tbody">

                	</tbody>
                </table>
				<!-- 分页  -->
				<%@ include file="pagination.jsp"%>   
           <form id="form1" action="#" method="post" style="display:none">
	            <fieldset> 
	            <input  type="text"  id="id" name="id"  style="display:none" />
	            <p>
	              <label class="j_lab110">学生名称</label>
	              <input class="text-input small-input" type="text" id="usernmae" name="username" />
	            </p>
				<p>
	               <label class="j_lab110">性别</label>
					<select id="sex" name="sex">
						<option value="1">男</option>
						<option value="2">女</option>
					</select>
	            </p>
				<p>
					<label class="j_lab110">年龄</label>
					<input class="text-input small-input" type="number" id="age" name="age" />
				</p>
				<p>
					<label class="j_lab110">状态</label>
					<select id="status" name="status">
						<option value="1">开除</option>
						<option value="2">毕业</option>
						<option value="3">就读</option>
						<option value="4">复读</option>
					</select>
	            </p>
	            <p>
	              	<input class="btn btn-primary" type="button" value="提交" onclick="edit_Infor()"/>
              		<input class="btn" type="button" value="取消" id="cancel"/>
	            </p>
	            </fieldset>
            <div class="clear"></div>
           </form>
            </div>
           	<div class="tab-pane" id="tab2">
                <div class="notification information png_bg" id="information">
       		 		<div id="tips"></div>
      	  		</div>
	          <form id="form2" action="#" method="post">
	            <fieldset>
					<p>
						<label class="j_lab110">学生名称</label>
						<input class="text-input small-input" type="text" id="add_usernmae" name="name" />
					</p>
					<p>
						<label class="j_lab110">性别</label>
						<select id="add_sex" name="sex">
							<option value="1">男</option>
							<option value="2">女</option>
						</select>
					</p>
					<p>
						<label class="j_lab110">年龄</label>
						<input class="text-input small-input" type="number" id="add_age" name="age" />
					</p>
					<p>
						<label class="j_lab110">状态</label>
						<select id="add_status" name="status">
							<option value="1">开除</option>
							<option value="2">毕业</option>
							<option value="3">就读</option>
							<option value="4">复读</option>
						</select>
					</p>
	            <p>
	              <input class="btn btn-primary" type="button" value="提交" onclick="add_Infor()"/>
	            </p>
	            </fieldset>
	            <div class="clear"></div>
	          </form>
            </div>
      </div>
    </div>
</div>
<script type="text/javascript">
	var ary=new Array();
	$(function(){
		$(".page_wrap").show();
		loadData();
		$("#cancel").click(function(){
			$(".page_wrap").hide();
			gotoPage("/jsp/backfront/KelaStoremanage.jsp");
		});
	});
	function loadData(page) {
		if(page == null || page == undefined){
			page = 1;
		}
		var pageSize = $(".page_sele option:selected").text();
		post('/student/get-list','',function(result) {
			if (result.code == '200')
			{
				var text = '';
				$.each(result.data, function(index,item){
					text += "<tr>";
					text += "<td>"+item['id']+"</td>";
					text += "<td>"+item.name+"</td>";
					text += "<td>"+item.sex+"</td>";
					text += "<td>"+item.age+"</td>";
					text += "<td>"+item.status+"</td>";
					text += "<td>"+item.createTime+"</td>";
					text += "<td>"+item.updateTime+"</td>";
					text += '<td><a href="javascript:;"><i class="fa fa-edit"></i></a><a href="javascript:;" ><i class="fa fa-remove"></i></a> </td>';
					text += "<tr>";
				});
				$("#tbody").html(text);
			}
		});
		paginate(10,1);
	}

	function add_Infor(){
		var add_name = $("#add_usernmae").val();
		var add_sex = $("#add_sex").val();
		var add_age = $("#add_age").val();
		var add_status = $("#add_status").val();
		if (typeof(add_name) == "undefined" || add_name == '') {
			alert("请输入姓名");
			return false;
		}
		post("/student/add",$("#form2").serializeArray(),function(result){
			if (result.code == '200') {
				gotoPage("/jsp/backfront/user_manage.jsp");
			} else {
				alert(result.data);
			}
		});
	}
	function edit_Infor(){
		beforeSave("areaId", "addrBox1", true);

	}
	function del_Infor(obj){
		var param = new Array();
	}

	function initEditArea(obj){

	}
	// 递归调用   设置地区地址
	function setAreaAddress(parentCode, areaCode, str) {

	}
	function tab(i){
		$("#tbList").hide();
		$("#form1").show();
		$(".page_wrap").hide();
	}

	function beforeSave(id, str, isEdit) {
		if(!isEdit){//新增
			var selArry = $("input[id='"+str+"'] ~ select");
			var se1  =  selArry.eq(0);
			var se2  =  selArry.eq(1);
			var se3  =  selArry.eq(2);
			if ($(se1).val() && $(se1).val() != "请选择") {
				if ($(se2).val() && $(se2).val() != "请选择") {
					if ($(se3).val() && $(se3).val() != "请选择") {
						$("#"+id).val($(se3).val());
					} else {
						$("#"+id).val($(se2).val());
					}
				} else {
					$("#"+id).val($(se1).val());
				}
			}
		}else{//编辑
			var se1  =  $("#p_address > select:eq(0)");
			var se2  =  $("#p_address > select:eq(1)");
			var se3  =  $("#p_address > select:eq(2)");
			if ($(se1).val() && $(se1).val() != "请选择") {
				if ($(se2).val() && $(se2).val() != "请选择") {
					if ($(se3).val() && $(se3).val() != "请选择") {
						$("#"+id).val($(se3).val());
					} else {
						$("#"+id).val($(se2).val());
					}
				} else {
					$("#"+id).val($(se1).val());
				}
			}
		}
	}
</script>
</body>
</html>
