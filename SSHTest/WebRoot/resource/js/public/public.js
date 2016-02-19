//头部导航切换
$(".topbar-head a").click(function () {
    $(".topbar-head a").eq($(this).index()).addClass("topbar-btn-active").siblings().removeClass('topbar-btn-active')
})
//选中左边第一个框
$(".viewFramework-sidebar .sidebar-nav ul").eq(0).css("display", "block")
//左边导航切换
$(".sidebar-nav li").click(function () {
    $(".sidebar-nav li.active").removeClass("active");
    $(this).addClass("active");
});
$(".sidebar-title").click(function () {
    $(".sidebar-title").removeClass("select");
    $(this).addClass("select");
    var $ul = $(this).next('ul');
    $('.sidebar-nav').find('ul').slideUp();
    if ($ul.is(':visible')) {
        $(this).next('ul').slideUp();
    } else {
        $(this).next('ul').slideDown();
    }
});
$(".date-time").click(function () {
    $(".date-time").removeClass("selected");
    $(this).addClass("selected")
})
 //左边折叠
$("body").on("click", ".product-navbar-collapse", function () {
    var sidebar = $(".viewFramework-sidebar").css("width");
    if (sidebar == "180px") {
        $(".viewFramework-product-navbar-collapse").css("left", "-5px");
        $(".product-navbar-collapse-bg").removeClass("product-navbar-collapse-bg").addClass("product-navbar-collapse-bg1");
        $(".icon-step-backward").hide();
        $(".icon-step-forward").show();
        $(".viewFramework-sidebar").css("width", "0px");
        $(".viewFramework-product").css("left", "0px");
        $(".box-header").css("left", "0px");
        $(".alert-success").css("left", "0px");
    }
    else {
        $(".viewFramework-product-navbar-collapse").css("left", "160px");
        $(".product-navbar-collapse-bg1").removeClass("product-navbar-collapse-bg1").addClass("product-navbar-collapse-bg");
        $(".icon-step-backward").show();
        $(".icon-step-forward").hide()
        $(".viewFramework-sidebar").css("width", "180px");
        $(".viewFramework-product").css("left", "180px");
        $(".box-header").css("left", "180px");
        $(".alert-success").css("left", "180px");
    }
})
/*=================定义Map开始==================
        用法 :  baseMap.put("key", value);
            baseMap.remove("key");
            var array = map.keySet();
            for(var i in array) {
               alert("key:(" + array[i] +") value: ("+map.get(array[i])+")");
            }	 
   =================================================*/

function Map() {
    this.container = new Object();
}

Map.prototype.put = function (key, value) {
    this.container[key] = value;
}

Map.prototype.get = function (key) {
    return this.container[key];
}

Map.prototype.keySet = function () {
    var keyset = new Array();
    var count = 0;
    for (var key in this.container) {
        // 跳过object的extend函数
        if (key == 'extend') {
            continue;
        }
        keyset[count] = key;
        count++;
    }
    return keyset;
}

Map.prototype.size = function () {
    var count = 0;
    for (var key in this.container) {
        // 跳过object的extend函数
        if (key == 'extend') {
            continue;
        }
        count++;
    }
    return count;
}

Map.prototype.remove = function (key) {
    delete this.container[key];
}
/*===============定义Map结束=============*/
//时间      
function timeselect() {
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
    tml += '</div>'
    $('#date_demo').click(function () {
        clickCount++
        if (clickCount < 2) { $('.ta_calendar ').prepend(tml) }
    })
    dateRange = new pickerDateRange('date_demo', {
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
            $(".date-time").removeClass("select");
            $(".date-time").click(function () {
                $(".date-time").removeClass("select");
                $(this).addClass("select")
            })
        }

    });
}