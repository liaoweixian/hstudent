var basePath = window.location.href.indexOf('hstudent')>0?'/hstudent':'hstudent';
var SUCCESS = 1;
var FAIL = 0;

/**
 * 	add by guodefu
 * 	2015-09-09
 * */
//替代原有的toFixed方法，toFixed方法在不同浏览器中不统一
Number.prototype.myToFixed=function(s){
    if(s == null){s = 0;}
    var value = Math.pow(10,s);//Math.pow(x,y)返回 x 的 y 次幂的值，即10的s次方的值
    var returnStr = Math.round(this.mul(value)).div(value).toString();//javascript的加减乘除结果会有误差，使用自定义方法
    //var returnStr=(parseInt(this * value + 0.5)/ value).toString();
    var pointIndex = returnStr.indexOf(".");
    if(pointIndex < 0 && s > 0){//如果没有小数点，先添加小数点，再补0
      returnStr = returnStr + ".";
      for(i = 0; i < s; i++){
        returnStr = returnStr + "0";
      }
    }else {//如果有小数点，直接补缺少的0
      var weishu = returnStr.length - 1 - pointIndex;
      for(i = 0; i < ( s - weishu ); i++){
        returnStr = returnStr + "0";
      }
    }
    return returnStr;
}

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//用法：
//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
    return accMul(this,arg);
}
//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
//用法：
//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
    return accDiv(this,arg);
}

function changeLocale(locale){
	post("/login.do?action=changeLocale&locale="+locale,function(data){
		location.reload();
	});
}
//$.ajax兼容$.ajax报错
(function($){  
    //备份jquery的ajax方法  
    var _ajax=$.ajax;  
      
    //重写jquery的ajax方法  
    $.ajax=function(opt){  
        //备份opt中error和success方法  
        var fn = {  
            error:function(XMLHttpRequest, textStatus, errorThrown){},  
            success:function(data, textStatus){}  
        }  
        if(opt.error){  
            fn.error=opt.error;  
        }  
        if(opt.success){  
            fn.success=opt.success;  
        }  
          
        //扩展增强处理  
        var _opt = $.extend(opt,{  
            error:function(XMLHttpRequest, textStatus, errorThrown){  
                //错误方法增强处理  
                fn.error(XMLHttpRequest, textStatus, errorThrown);  
            },  
            success:function(data, textStatus){  
                //成功回调方法增强处理  
            	if(data!=null){
	            	if(data.code=="2"){//超时
	   				 location.href=basePath+"/jsp/login.jsp";
	   					//gotoPage("/jsp/login.jsp");
	   				}else if(data.code=="0"&&data.message!=undefined){//系统错误
	   					alert(data.message);
	   				}else{
	   					fn.success(data, textStatus);
	   				}
            	}else{
            		fn.success(data, textStatus);
            	}
            	
            }  
        });  
        _ajax(_opt);  
    };  
})(jQuery);  

function ajax(url,data,type,dataType,async,callback){
	$.ajax({
		url:basePath + url,
		data:data,
		type:type,
		async:async,
		dataType:dataType,
		success:function(result){
			/*if(result.code=="2"){//超时
				gotoPage("/jsp/login.jsp");
			}if(result.code=="0"&&result.message!=undefined){//系统错误
				alert(result.message);
			}else{
				callback(result);
			}*/
			callback(result);
		}/*,
		error:function(req,status,error){
			//alert("Testing");
//			alert("当前操作异常，请稍后再试或联系管理员！");
		}*/
	});	
}

function getIds(){
	var ids = new Array();
	$('#tbody').find('input[type=checkbox]:checked').each(function() {
		ids.push($(this).val());
    });
	return ids.join(',');
}

function getGoodsNo(){
	var ids = new Array();
	$('#tbody').find('input[type=checkbox]:checked').each(function() {
		ids.push($(this).attr("goodsNo"));
    });
	return ids.join(',');
}

function buy(ids,alertHint){

	if(!ids){
		ids = getIds();
	}
	
	if(ids == ''){
		alert(alertHint);
		return;
	}
	gotoPage('/jsp/buy_step1.jsp?diamondId='+ ids);
}
function openPage(url){
	window.open(basePath + url);
}

//POST请求
function post(){
	json(arguments,"POST");
}

//GET请求
function get(){
	json(arguments,"GET");
}

function json(args,type){
	if(args.length == 2){
		ajax(args[0],null,type,"JSON",true,args[1]);
	}else if(args.length == 3){
		ajax(args[0],args[1],type,"JSON",true,args[2]);
	}
}

//跳转页面
function gotoPage(page){
	window.location.href= basePath+page;
}

//获取资源消息
function getMessage(code){
	ajax("/order.do?getMessage&code="+code,null,"POST","JSON",false,function(result){
		return reslut.data;
	});
}

function getOrderStatus(code){
	ajax("/order.do?getOrderStatus&code="+code,null,"POST","JSON",false,function(result){
		return reslut.data;
	});
}


//保存cookie
function setCookie(name,value){  
    var Days = 30*12;   //cookie 将被保存一年  
    var exp  = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000);  //换成毫秒  
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}   

//获取cookie
function getCookie(name){  
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
    if(arr != null){  
     return unescape(arr[2]);   
    }else{  
     return null;  
    }  
}

//删除cookie
function delCookie(name){  
    var exp = new Date();  
    exp.setTime(exp.getTime() - 1);  
    var cval=getCookie(name);  
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
}

//阻止冒泡事件
function stopPropagation(){
	if (window.event){
		event.cancelBubble=true; 
	} else {
		event.stopPropagation(); 
	}
}

//初始化话地区数据
function initArea(){
	var obj = arguments[0];
	var callback = arguments[1];
	var areaId = $(arguments[0]).find("option:checked").attr("data");
	var parentCode = $(arguments[0]).val();
	if(parentCode == null || parentCode == undefined){
		parentCode = '';
	}
	if(areaId == null || areaId == undefined){
		areaId = '';
	}
	
	post("/area.do?action=queryList&parentCode="+parentCode,function(result){
		var html = '<select class="span2" onchange="initArea(this);"><option>请选择</option>';
		if(callback){
			callback(areaId,parentCode);
			html = '<select class="span2" onchange="initArea(this,' + callback + ');"><option>请选择</option>';
		}
		
		var data = result.data;
		if(result.data.length == 0){
			$(obj).nextAll().remove();
			return;
		}
		$(obj).nextAll().remove();
		
		$.each(result.data,function(k,v){
	    	html += '<option data="' + v.areaId + '" value="' + v.areaCode + '">'+ v.areaName +'</option>';
		});
		html += '</select>';
		$(obj).after(html);
	});
}

//初始化话地区数据(有门店的地区才查询出来)
function initAreaWithKelaStore(){
	var obj = arguments[0];
	var level = arguments[1];//判断地址为第几级
	var callback = arguments[2];
	var areaId = $(arguments[0]).find("option:checked").attr("data");
	var parentCode = $(arguments[0]).val();
	var isHK = arguments[3];//1表示香港，2表示大陆
	if(parentCode == null || parentCode == undefined){
		parentCode = '';
	}
	if(areaId == null || areaId == undefined){
		areaId = '';
	}
	if(parentCode !="请选择"){
		post("/area.do?action=queryListWithKelaStore&parentCode="+parentCode+"&level="+level+"&isHK="+isHK, function(result){
			level ++;
			var html = '<select class="span2" onchange="initAreaWithKelaStore(this,'+level+');"><option>请选择</option>';
			if(callback){
				callback(areaId,parentCode);
				html = '<select class="span2" onchange="initAreaWithKelaStore(this,'+level+',' + callback + ',' + isHK +');"><option>请选择</option>';
			}
			
			var data = result.data;
			if(result.data.length == 0){
				$(obj).nextAll().remove();
				return;
			}
			$(obj).nextAll().remove();
			
			$.each(result.data,function(k,v){
				html += '<option data="' + v.areaId + '" value="' + v.areaCode + '">'+ v.areaName +'</option>';
			});
			html += '</select>';
			$(obj).after(html);
		});
		
	}else{
		$(obj).nextAll().remove();
	}
}

function dateFormat(time){
	return new Date(time).format('yyyy-MM-dd');
}

function dateTimeFormat(time){
	return new Date(time).format('yyyy-MM-dd hh:mm:ss');
}


Date.prototype.format = function (format) { 
    var o = {  
        "M+": this.getMonth() + 1,  //month  
        "d+": this.getDate(),     //day  
        "h+": this.getHours(),    //hour  
        "m+": this.getMinutes(),  //minute  
        "s+": this.getSeconds(), //second  
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter  
        "S": this.getMilliseconds() //millisecond  
    }  
   
    if (/(y+)/.test(format)) {  
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
    }  
   
    for (var k in o) {  
        if (new RegExp("(" + k + ")").test(format)) {  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }  
    return format;  
}  

function selectAll(obj){
	var checked = $(obj).attr("checked");
	$(obj).parents('table').find("tbody input[type='checkbox']").each(function(){
		if(checked == undefined){
			$(this).removeAttr("checked");
		}else if($(this).attr("disabled")!="disabled"){
			$(this).attr("checked",checked);
		}
	});
}

/**
 * 单行复选框
 * @param obj
 */
function selectSingle(obj){
	var checked = $(obj).attr("checked");
	var allCheckBox = $(obj).parents("table").find("thead input[type='checkbox']");
	if(checked == undefined){
		$(allCheckBox).removeAttr("checked");
	}else{
		var flag = true;
		$(obj).parents('tbody').find("input[type='checkbox']").each(function(){
			if($(this).attr("checked") == undefined){
				$(allCheckBox).removeAttr("checked");
				flag = false;
			}
		});
		if(flag){
			$(allCheckBox).attr("checked",checked);
		}
	}
}

/*公用的 table mouseover pover*/
$(function() {
	var $tbox = $(".tbox");
	if ($tbox.length) { 
		//表头居中
		$(".tbox").mouseover(
		function() {
			$(this).addClass("tbon");
			var tw = parseInt($(this).css("width").replace("px", ""));
			var tbw = parseInt($(this).children(".tboxs").css("width")
					.replace("px", ""));
			$(this).children(".tboxs").css("left",
					(tw - tbw) / 2 + "px");
		});
		$(".tbox").mouseout(function() {
			$(this).removeClass("tbon");
		});
	}
	/* 添加 table 里面的时间选择  */
	var $table_time=$(".table_time");
	var $time_hide=$(".time_hide");
	
	 if($table_time.length){
		 $table_time.click(function(){
			 $time_hide.show();
		 });
		 $(document).bind("click", function (e) {
		        var target = $(e.target);
		        if (target.closest(".table_time").length == 0 && target.closest(".time_hide").length == 0){
		        	//e.preventDefault();
		        	$time_hide.hide();
		        }
		    });
		//阻止事件冒泡函数
		 function stopBubble(e)
		 {
		     if (e && e.stopPropagation)
		         e.stopPropagation()
		     else
		         window.event.cancelBubble=true
		 }
		 if($(".datetimepicker_time").length){
			 $('.datetimepicker_time').datetimepicker({
			     format:"Y-m-d",timepicker:false,validateOnBlur:false
			  });
		 }
		
	   $('.xdsoft_datetimepicker').click(function(e){
			 stopBubble(e);
		 })
	 }
});

/* shijian  */
function datetimepic(){
	$('.datetimepicker').datetimepicker({ format:"Y-m-d",timepicker:false,validateOnBlur:false});
	$('.datetimepicker-limit').datetimepicker({ format:"Y-m-d",timepicker:false,validateOnBlur:false,minDate:dateFormat(new Date().getTime())});
}

//加载头数据 local:语言
function loadHead(local){
	post("/spotDiamond/laodHead.do",function(data){
		for (var i = 0; i < data.length; i++) {
			if(data[i].name=="shape"){
				
				$("#shapeName").html(local=="zh"?data[i].cn:data[i].en);
				var text='';
				for (var j = 0; j < data[i].options.length; j++) {
					var option=data[i].options[j];
					text+='<li><input type="checkbox" name="shape" value="'+option.value+'" />';
					text+=local=="zh"?option.cn :option.en;
					text+="</li>";
				}
				$("#shapeValue").html(text);
			}else if(data[i].name=="size"){
				
				$("#sizeName").html(local=="zh"?data[i].cn:data[i].en);
				var text='';
				for (var j = 0; j < data[i].options.length; j++) {
					var option=data[i].options[j];
					text+='<li><input type="checkbox" name="size" value="'+option.value+'" />';
					text+=local=="zh"?option.cn :option.en;
					text+="</li>";
				}
				$("#sizeValue").html(text);
			}else if(data[i].name=="color"){
				
				$("#colorName").html(local=="zh"?data[i].cn:data[i].en);
				var text='';
				for (var j = 0; j < data[i].options.length; j++) {
					var option=data[i].options[j];
					text+='<li><input type="checkbox" name="color" value="'+option.value+'" />';
					text+=local=="zh"?option.cn :option.en;
					text+="</li>";
				}
				$("#colorValue").html(text);
			}else if(data[i].name=="clarity"){
				
				$("#clarityName").html(local=="zh"?data[i].cn:data[i].en);
				var text='';
				for (var j = 0; j < data[i].options.length; j++) {
					var option=data[i].options[j];
					text+='<li><input type="checkbox" name="clarity" value="'+option.value+'" />';
					text+=local=="zh"?option.cn :option.en;
					text+="</li>";
				}
				$("#clarityValue").html(text);
			}else if(data[i].name=="cut"){
				
				$("#cutName").html(local=="zh"?data[i].cn:data[i].en);
				var text='';
				for (var j = 0; j < data[i].options.length; j++) {
					var option=data[i].options[j];
					text+='<li><input type="checkbox" name="cut" value="'+option.value+'" />';
					text+=local=="zh"?option.cn :option.en;
					text+="</li>";
				}
				$("#cutValue").html(text);
			}else if(data[i].name=="polish"){
				
				$("#polishName").html(local=="zh"?data[i].cn:data[i].en);
				var text='';
				for (var j = 0; j < data[i].options.length; j++) {
					var option=data[i].options[j];
					text+='<li><input type="checkbox" name="polish" value="'+option.value+'" />';
					text+=local=="zh"?option.cn :option.en;
					text+="</li>";
				}
				$("#polishValue").html(text);
			}else if(data[i].name=="symmetry"){
				
				$("#symmetryName").html(local=="zh"?data[i].cn:data[i].en);
				var text='';
				for (var j = 0; j < data[i].options.length; j++) {
					var option=data[i].options[j];
					text+='<li><input type="checkbox" name="symmetry" value="'+option.value+'" />';
					text+=local=="zh"?option.cn :option.en;
					text+="</li>";
				}
				$("#symmetryValue").html(text);
			}else if(data[i].name=="fluor"){
				
				$("#fluorName").html(local=="zh"?data[i].cn:data[i].en);
				var text='';
				for (var j = 0; j < data[i].options.length; j++) {
					var option=data[i].options[j];
					text+='<li><input type="checkbox" name="fluor" value="'+option.value+'" />';
					text+=local=="zh"?option.cn :option.en;
					text+="</li>";
				}
				$("#fluorValue").html(text);
			}else if(data[i].name=="cert_type"){
				
				$("#certTypeName").html(local=="zh"?data[i].cn:data[i].en);
				var text='';
				for (var j = 0; j < data[i].options.length; j++) {
					var option=data[i].options[j];
					text+='<li><input type="checkbox" name="certType" value="'+option.value+'" />';
					text+=local=="zh"?option.cn :option.en;
					text+="</li>";
				}
				$("#certTypeValue").html(text);
			}
		}
	})
}
function accordion_toggle(){
	/* 小箭头 切换 */
	$(".accordion-group .accordion-toggle").click(function(){
		var i=$(this).children("i");
		if(i.hasClass("fa-caret-down")){
			i.removeClass("fa-caret-down").addClass("fa-caret-right");
		}else{
			i.removeClass("fa-caret-right").addClass("fa-caret-down");
		}
	})
}

//   根据用户状态判断是否有权限操作
function isOpt(status, merchantId) {
	if (status != 0) {
		if (merchantId) {
			var url = "/merchantInfo/queryMerchantById.do";
			var param = "merchantId=" + merchantId;
			post(url, param, function(result) {
				var merchant = result.data;
				if (merchant && merchant.name) {
					alert("公司资料正在审核当中...")
				} else {
					if(confirm("是否完善公司资料进行审核？")){
						gotoPage("/jsp/about_us.jsp");
					}
				}
			});
		} else {
			if(confirm("是否完善公司资料进行审核？")){
				gotoPage("/jsp/about_us.jsp");
			}
		}
		
		return false;
	} else {
		return true;
	}
}

//判断邮箱是否合法
function isEmail(strEmail){
	if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1){
		return true;
	}else{
		return false;
	}
}

//   特殊字符校验，有特殊字符 返回 true
function illegalChar(str) {
    var pattern=/[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/im;  
    if(pattern.test(str)){  
        return true;     
    }     
    return false;  
}

//   去空格
String.prototype.NoSpace = function() { 
	return this.replace(/\s+/g, ""); 
}
