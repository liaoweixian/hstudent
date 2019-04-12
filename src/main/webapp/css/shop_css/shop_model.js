
/*window.addEventListener('orientationchange', function(event){
	var mvp = document.getElementById('testViewport');
    if ( window.orientation == 180 || window.orientation==0 ) {
       mvp.setAttribute('content','width=device-width,maximum-scale=3.0,user-scalable=yes');
    }
    if( window.orientation == 90 || window.orientation == -90 ) {
        mvp.setAttribute('content','width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0, user-scalable=yes');
    }
});*/

/*
window.Project = (function(win, doc) {
	var UA = navigator.userAgent,
		isAndroid = /android|adr/gi.test(UA),
		isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,
        isWeixin = /MicroMessenger/gi.test(UA),
        isPC = !isAndroid && !isIos;
	return {
		isAndroid: isAndroid,
		isIos: isIos,
        isPC:isPC,
        isWeixin:isWeixin,
		fixScreen: function() {
            var metaEl = doc.querySelector('meta[name="viewport"]');
            var metaCtt = metaEl ? metaEl.content : '';
            var	height = 1280;
            var ih = win.innerHeight || height,
                oh = win.outerHeight || ih,
                ish = win.screen.height || ih,
                sah = win.screen.availHeight || ih,
                h = Math.min(ih,oh,ish,sah),
            scale = h / height;
            console.log(h);
            metaEl.content = metaCtt + ',' + Scale(scale);
            function Scale(s) {return 'initial-scale=' +s+',maximum-scale='+s+',minimum-scale='+s;}
		}
	};
})(window, document);*/

$(function () {
       $(".table_screen").each(function () {
            $(".table_screen li:gt(3)").hide();
        });
        $("#jadd_more").click(function () {
            if ($(this).attr("data-jadd") == "show") {
                $(".table_screen li:gt(3)").hide();
                $(this).attr("data-jadd", "hide");
            } else {
                $(".table_screen li:gt(3)").show();
                $(this).attr("data-jadd", "show");
            }

        });
        /* 现货 checkbox 事件*/
/*        $("#spot_goods_check").click(function(){
            if($(this).attr('checked') =="checked"){
                $(this).attr("checked","checked");
                $("#spot_goods").show();
            }else{
                $(this).removeAttr('checked');
                $("#spot_goods").hide();
            }
        });*/
        /* 侧边 显示隐藏*/
       /* $(".fa-angle-double-left").mouseenter(function () {
            $(".shop_aside").stop(true).animate({right: "0px"});
        }).mouseleave(function () {
            $(".shop_aside").stop(true).animate({right: "-200px"});
        });

        $(".fade_sign").mouseenter(function () {
            $(".shop_aside").stop(true).animate({right: "0px"});
        }).mouseleave(function () {
            $(".shop_aside").stop(true).animate({right: "-200px"});
        });*/
        
        /* swiper */
        var mySwiper_fashion = new Swiper('.swiper-container', {
            pagination: '.pagination',
            paginationClickable: true,
            calculateHeight: true,
            autoplay: 5000
        });
        var pag_h = parseInt($("#banner .pagination-fashion").width() / 2);
        $("#banner .pagination-fashion").css("margin-left", "-" + pag_h + "px");
    })