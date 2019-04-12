/**
 * Created by Administrator on 14-11-16.
 */
var mySwiper;
var wind=$(window.top.document);
$(function(){
	 mySwiper = new Swiper('.swiper-container',{
		 slidesPerView: 'auto'
	  })
  
  $('.arrow-left').on('click', function(e){
      e.preventDefault()
      mySwiper.swipePrev()
    })
    $('.arrow-right').on('click', function(e){
      e.preventDefault()
      mySwiper.swipeNext()
    })
})

$(document).delegate("[data-open-tab]","click",function(e){
	e.preventDefault();
	if($(this).attr("data-open-tab") != "backgroundpage"){
		 add_tab(this,$(this).text());
	}else{
		wind.find("#iframe_tab_tit li:first").addClass("current").siblings().removeClass("current");
		wind.find("#page_content").children("iframe[data-iframe-id='backgroundpage']").show().siblings().hide();
	}
	
});
$(document).delegate("#iframe_tab_tit li[data-tab-id]","click",function(e){
	query_tab(this);
});


/* 打开tab */
function add_tab(obj,name){
	var tab_id = $(obj).attr('data-open-tab');
	wind.find("#iframe_tab_tit .iftab_ul").find("li[data-tab-id="+tab_id+"]").remove();
	
	/*if(left.length > 0  && tab_id && tab_id.length > 0) {
		wind.find("#iframe_tab_tit .iftab_ul").find("li[data-tab-id="+tab_id+"]").addClass("current").siblings().removeClass("current");
		wind.find("#page_content").children("iframe[data-iframe-id='"+tab_id+"']").show().siblings().hide();
	}*/
		var url = $(obj).attr("href");
		var d = new Date();
		tab_id = d.getTime(); //根据时间毫秒生成唯一id
		
		wind.find("#iframe_tab_tit .iftab_ul").find("li").removeClass("current");
		// var tab_li = '<li class="current" data-tab-id="'+tab_id+'"><span>'+name+'</span><i class="fa fa-close" onclick="remove_tab(this)"></i></li>';
		// $(window.top.document).find("#iframe_tab_tit .iftab_ul").append(tab_li);
		 
		 var newSlide = mySwiper.createSlide('<span>'+name+'</span><i class="fa fa-close" onclick="remove_tab(this)"></i>','swiper-slide current','li');
		 newSlide.data("tab-id",tab_id);
		 newSlide.append();
		 
		 var ifrm= '<iframe class="menuFrame" data-iframe-id="'+tab_id+'" name="menuFrame" src="'+url+'" scrolling="auto" frameborder="no" ></iframe>';
		 wind.find('#page_content').append(ifrm);
		 $(obj).attr("data-open-tab",tab_id);
	
	var len=wind.find("#iframe_tab_tit .iftab_ul").find("li");
	 if(len.length  >= 10){
		 mySwiper.swipeNext();
	 }
	 if(len.length  > 10){
		 $("#index_btndiv").show();
	 }else{
		 $("#index_btndiv").hide(); 
	 }
 }

/* remove tab */
function remove_tab(obj){
    $(obj).parents("li").remove();
    var tab_id= $(obj).parent("li").attr("data-tab-id");
    wind.find("#page_content").children("iframe[data-iframe-id='"+tab_id+"']").remove();
   
    $(obj).parents("li:last").addClass("current");
    var ch=wind.find("#page_content").children("iframe:last");
    ch.attr("src",ch.attr("src"));
    ch.show();
    
    var key = $("#iframe_tab_tit .iftab_ul > li").length;
    if(key <=1){
    	window.location.reload();
    }
    
	 if(key  > 10){
		 $("#index_btndiv").show();
	 }else{
		 $("#index_btndiv").hide(); 
	 }
 }

/* 判断 匹配 回到页面  */
 function query_tab(obj,e){
	 var tab_id= $(obj).attr("data-tab-id"); //得到tab li中的 data-id
	 $(obj).addClass("current").siblings().removeClass("current");
	 var ch=wind.find("#page_content").children("iframe[data-iframe-id='"+tab_id+"']");
	 ch.attr("src",ch.attr("src"));
	 ch.show().siblings().hide();
	 
 }
 

