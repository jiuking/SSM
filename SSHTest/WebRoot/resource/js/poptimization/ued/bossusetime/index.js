//页面加载时执行方法
$(function () { 
	$("[data-toggle='tooltip']").tooltip(); 
    //时间
    var datetime = new Date();
    var str = "" + datetime.getFullYear() + "-";
    str += (datetime.getMonth() + 1) + "-";
    str += datetime.getDate();
    //时间戳
    var timestamp = new Date().getTime();
    var aToday = "aToday_" + timestamp;
    var aYesterday = "aYesterday_" + timestamp;
    var aRecent3Days = "aRecent3Days_" + timestamp;
    var aRecent7Days = "aRecent7Days_" + timestamp;
    var aRecent30Days = "aRecent30Days_" + timestamp;
    var clickCount = 0;
    var tml = '<div class="shortcut">';
    tml += '<a href="javascript:;" id="' + aToday + '" class="date-time "> 今天</a>'
    tml += '<a href="javascript:;"  id="' + aYesterday + '" class="date-time"> 昨天</a>'
    tml += '<a href="javascript:;"  id="' + aRecent3Days + '"  class="date-time"> 最近3天</a>'
    tml += '<a href="javascript:;"  id="' + aRecent7Days + '"  class="date-time">最近7天</a>'
    tml += '<a href="javascript:;"  id="' + aRecent30Days + '" class="date-time">最近30天</a>'
        tml +='</div>'
        $('#date_demo3').click(function () {
            clickCount++
            if (clickCount < 2) { $('.ta_calendar ').prepend(tml) }
        })
    dateRange = new pickerDateRange('date_demo3', {
        aToday: aToday, //今天
        aYesterday: aYesterday, //昨天
        aRecent3Days: aRecent3Days,//最近3天
        aRecent7Days: aRecent7Days, //最近7天
        aRecent30Days: aRecent30Days, //最近30天
        isTodayValid: true,
        startDate: str,
        endDate: str,
        defaultText: ' 至 ',
        inputTrigger: 'input_trigger_demo3',
        theme: 'ta',
        success: function (obj) {
            $("#dCon_demo3").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);

            $(".date-time").removeClass("select");
            $(".date-time").click(function () {
                $(".date-time").removeClass("select");
                $(this).addClass("select")
            })
        }

    });
	
	$("a[name='targetDetails']").click(function(){
		var url = $(this).attr("url");
		var vid = $(this).attr("vid");
		$.ajax({
			url: url+"?vid="+vid,
			type: "get",
			dataType: "html",
			success: function(data){
				$('#dataView').html(data);
	
			}
		});
	});

});