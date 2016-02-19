<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body onload=" toLogin()">
    This is my JSP page. <br>
  </body>
  
  <script src="resource/js/public/jquery-1.8.3.min.js"></script>
    <script src="resource/js/public/jquery.imagesloaded.min.js"></script>
    <script src="resource/js/public/cbpBGSlideshow.min.js"></script>
    <script >
       
        function toLogin() {
        alert("ch")
			$.ajax({
				type: "POST",
				url: 'index',
		    	data: {username:username,password:password,tm:new Date().getTime()},
				dataType:'json',
				cache: false,
				
			});
        }
    </script>    
</body>
</html>
