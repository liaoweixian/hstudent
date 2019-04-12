<%@ page contentType="text/html;charset=UTF-8" %>

<div class="header" id="header">
    <div class="header_top">
        <div class="wrapper">
            <ul class="pull-right header_top_ul">
<%-- 	             <c:if test="${locale.language == 'zh' }">
		               <li><a href="jsp/operations_zh.jsp" target="_blank"><s:message code="label.operation_guide" /></a>|</li>
	             </c:if>
	             <c:if test="${locale.language == 'en' }">
	                    <li><a href="jsp/operations_en.jsp" target="_blank"><s:message code="label.operation_guide"/></a>|</li>     	
	             </c:if>   --%>
           		
               <%--  <li><a href="jsp/help_center.jsp?divs=helpcent_div1"><s:message code="label.help.center" /></a>|</li>
                <li><a href="${pageContext.request.contextPath }/jsp/help_center.jsp?divs=helpcent_div5"><s:message code="label.feedback" /></a>|</li>  --%>
                <c:if test="${locale.language == 'zh' }">
	                <li><a href="javascript:;" onclick="changeLocale('en_US');">English</a></li>
               	</c:if>
               	<c:if test="${locale.language == 'en' }">
	               <li><a href="javascript:;" onclick="changeLocale('zh_CN');">中文</a></li>           	
               	</c:if>
            </ul>
        </div>
    </div>
   <!--  <div class="header_center">
        <div class="wrapper">
            <a href="javascript:;"><img src="images/logo.png" class="logo"/></a>
        </div>
    </div> -->
</div>
