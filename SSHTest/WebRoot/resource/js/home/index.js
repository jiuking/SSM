//页面加载时执行方法
$(function() {
	setAutoHeight($("body"),500);
	//绑定主菜单的点击事件		
	$("#menu a").click(function(){
	});

	//默认进入第一个应用菜单
	_e=$("#menu a:first-child").next();
	appurl = _e.attr('appurl');
	appid = _e.attr('appid');
	loadFirstModule(appurl,appid);
	
	$("#yhcp").click(function() {
		window.location.href = "../home/index";
	});
});

function loadContents(){
	alert("load Contents");
}

//加载一级模块
function loadFirstModule(appurl,appid){
	//加载模块
	$.ajax({
		url: appurl+"?appId="+appid,
		type: "get",
		dataType: "html",
		success: function(data){
			$('#mainDiv').html(data);

		}
	});
}