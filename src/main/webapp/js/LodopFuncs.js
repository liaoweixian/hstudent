var CreatedOKLodop7766=null;

function getLodop(oOBJECT,oEMBED){
/**************************
  本函数根据浏览器类型决定采用哪个页面元素作为Lodop对象：
  IE系列、IE内核系列的浏览器采用oOBJECT，
  其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED,
  如果页面没有相关对象元素，则新建一个或使用上次那个,避免重复生成。
  64位浏览器指向64位的安装程序install_lodop64.exe。
**************************/
        /*var strHtmInstall="<font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
        var strHtmUpdate="<font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
        var strHtm64_Install="<font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
        var strHtm64_Update="<font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
        var strHtmFireFox="<font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
        var strHtmChrome="<font color='#FF00FF'>（如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
        var strHtmChromeNew="<font color='#FF00FF'>您的谷歌浏览器版本过新，不支持当前打印控件，欲使用打印条码功能，请使用其他浏览器，例如火狐或IE，或降低您的谷歌浏览器版本到44以下</font>";*/
		var strHtmInstall=strLODOP['strHtmInstall'];
	    var strHtmUpdate=strLODOP['strHtmUpdate'];
	    var strHtm64_Install=strLODOP['strHtm64_Install'];
	    var strHtm64_Update=strLODOP['strHtm64_Update'];
	    var strHtmFireFox=strLODOP['strHtmFireFox'];
	    var strHtmChrome=strLODOP['strHtmChrome'];
	    var strHtmChromeNew=strLODOP['strHtmChromeNew'];
        var LODOP,wra_flag;
	try{	
		 var wra_wrap="<div class='alert alert-error' id='wra_id'></div>";
		 var wra_id = document.getElementById('wra_id');
		 var jmain=document.getElementById('jmain');
		 if(wra_id){
			 wra_flag = true;
	 	 }else{
	 		 wra_flag = false;
	 		
	 	 }
		 
	     //=====判断浏览器类型:===============
	     var isIE	 = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
	     var is64IE  = isIE && (navigator.userAgent.indexOf('x64')>=0);
	     var agent = navigator.userAgent.toLowerCase() ;
	     var regStr_chrome = /chrome\/[\d.]+/gi ;
	     var chrome = agent.match(regStr_chrome)+"";
	     var chromeVersion = chrome.substring(chrome.indexOf("/")+1,chrome.indexOf("."));
	     var isChromeNew = chromeVersion - 44 >0;
	     //=====如果页面有Lodop就直接使用，没有则新建:==========
	     if (oOBJECT!=undefined || oEMBED!=undefined) { 
               	 if (isIE) 
	             LODOP=oOBJECT; 
	         else 
	             LODOP=oEMBED;
	     } else { 
			 if (CreatedOKLodop7766==null){
	          	     LODOP=document.createElement("object"); 
			     LODOP.setAttribute("width",0); 
	                     LODOP.setAttribute("height",0); 
			     LODOP.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");  		     
	                     if (isIE) LODOP.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA"); 
			     else LODOP.setAttribute("type","application/x-print-lodop");
	                 wra_id.appendChild(LODOP); 
		             CreatedOKLodop7766=LODOP;		     
	 	         } else 
	                     LODOP=CreatedOKLodop7766;
	     };
	     //=====判断是否为新版谷歌浏览器，是就提示使用其他浏览器:==========
	     if (isChromeNew) {
	    	 if(wra_flag){
		 			return;
		 	 }else{
		 		jmain.innerHTML=wra_wrap+jmain.innerHTML;
	 			wra_id = document.getElementById('wra_id');
			     wra_id.innerHTML=strHtmChromeNew+wra_id.innerHTML;
			     return LODOP;
		 	 }
	     };
	     //=====判断Lodop插件是否安装过，没有安装或版本过低就提示下载安装:==========
	     if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
		    	if(wra_flag){
		 			return;
		 		}else{
		 			jmain.innerHTML=wra_wrap+jmain.innerHTML;
		 			var wra_id = document.getElementById('wra_id');
		 			
		 			 if (navigator.userAgent.indexOf('Chrome')>=0)
		 				wra_id.innerHTML=strHtmChrome+wra_id.innerHTML;
		             if (navigator.userAgent.indexOf('Firefox')>=0)
		            	 wra_id.innerHTML=strHtmFireFox+wra_id.innerHTML;
		             if (is64IE) wra_id.innerHTML=strHtm64_Install+wra_id.innerHTML; else //wra_id.write(strHtm64_Install); else
		             if (isIE)  wra_id.innerHTML=strHtmInstall+wra_id.innerHTML;  else  // wra_id.write(strHtmInstall);    else
		            	 wra_id.innerHTML=strHtmInstall+wra_id.innerHTML;
		             return LODOP;
		 		}
	     } else if (LODOP.VERSION<"6.1.9.8") {
	    	 if(wra_flag){
		 			return;
		 	 }else{
		 		 	jmain.innerHTML=wra_wrap+jmain.innerHTML;
		 		 	wra_id = document.getElementById('wra_id');
		 			if (is64IE) wra_id.innerHTML=strHtm64_Update+wra_id.innerHTML;else //wra_id.write(strHtm64_Update); else
		 				if (isIE) wra_id.innerHTML=strHtmUpdate+wra_id.innerHTML;else  //wra_id.write(strHtmUpdate); else
		 					wra_id.innerHTML=strHtmUpdate+wra_id.innerHTML;
		 			return LODOP;
		 	 }
	     };
	     //=====如下空白位置适合调用统一功能(如注册码、语言选择等):====	     


	     //============================================================	     
	     return LODOP; 
	} catch(err) {
		if(!wra_id){
			jmain.innerHTML=wra_wrap+jmain.innerHTML;
 			wra_id = document.getElementById('wra_id');
		}
	     if (is64IE)	{
	    	 wra_id.innerHTML="Error:"+strHtm64_Install+wra_id.innerHTML;
	     }else{
	    	 wra_id.innerHTML="Error:"+strHtmInstall+wra_id.innerHTML;
	     }
	     return LODOP; 
	};
}
