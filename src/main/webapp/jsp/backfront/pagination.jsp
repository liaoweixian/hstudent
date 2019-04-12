<%@ page contentType="text/html;charset=UTF-8" %>
<div class="page_wrap" style="display:none">
	<div id="pages"  class="pull-right"></div>
	<div class="page_sele pull-right">
		<s:message code="label.page"/>:
		 <select class="span1" onchange="loadData();">
			<option>10</option>
			<option>20</option>
			<option>30</option>
		 </select>
	</div>	
</div>

<!-- <div id="pages" class="fr"></div> -->
<script type='text/javascript' src="${pageContext.request.contextPath }/js/jquery.paginate.js"></script>
<script type="text/javascript">


function paginate(count,start,obj,conditions){
	if(null == obj || undefined == obj){
		obj = $("#pages");
	}
	
	if(count <= 1){
		$(obj).parent().hide();
	}else{
		$(obj).parent().show();
		$(obj).paginate({
			count 		: count,
			start 		: start,
			display     : 20,
			border					: true,
			border_color			: '#d9edf7',
			text_color  			: '#337ab7',
			background_color    	: '#fff',	
			border_hover_color		: '#337ab7',
			text_hover_color  		: '#fff',
			background_hover_color	: '#337ab7', 
			images					: false,
			mouse					: 'press',
			onChange     			: function(page,conditions){ loadData(page,conditions);}
		});
	}
	
	
}

</script>