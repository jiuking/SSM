//页面加载时执行方法
$(function(){
//	setAutoHeight($("#cm_wrapper").parent(),500); 
	//绑定功能菜单的点击事件
	$("#lbapp, #dc, #sy, #sh, #tzl, #sysc, #lbsysc, #xxj").click(function(){
		funUrl = $(this).attr('funUrl');
		funId = $(this).attr('funId');
		loadDataGrid(funUrl,funId);
	});
	$("#pad1, #APP1, #pos1, #sh1, #pad2, #lb2,#POS2, #tz2").click(function(){
		funUrl = $(this).attr('funUrl');
		funId = $(this).attr('funId');
		loadDataGrid(funUrl,funId);
	});	
	
});

function loadDataGrid(funUrl,funId){
	$('.ta_calendar').remove();
	if(funUrl != "" && funUrl != null) {
		$.ajax({
			url: funUrl+"?funId="+funId,
			type: "get",
			dataType: "html",
			success: function(data){
				$('#dataView').html(data);
			}
		});
	}
}