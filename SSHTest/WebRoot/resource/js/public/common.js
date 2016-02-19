
   
/*
 * 表单序列化为json对象
 */
$.fn.form2json = function() {
	var json = decodeURIComponent(JSON.stringify(paramString2obj(this.serialize().replace(/\+/g," "))));
	return $.parseJSON(json);
};

function paramString2obj (serializedParams) {
	var obj={};
	function evalThem (serializedParams) {
		var attributeName = serializedParams.split("=")[0];
		var attributeValue = serializedParams.split("=")[1];
		if(!attributeValue){
			return ;
		}
		var array = attributeName.split(".");
		for (var i = 1; i < array.length; i++) {
			var tmpArray = Array();
			tmpArray.push("obj");
			for (var j = 0; j < i; j++) {
				tmpArray.push(array[j]);
			};
			var evalString = tmpArray.join(".");
			// alert(evalString);
			if(!eval(evalString)){
				eval(evalString+"={};");				
			}
		}
		eval("obj."+attributeName+"='"+attributeValue+"';");
	}
	var properties = serializedParams.split("&");
	for (var i = 0; i < properties.length; i++) {
		evalThem(properties[i]);
	}
	return obj;
}   
/*
 * 自适应布局 计算并设置所有autoHeight元素的高度（参数为父元素）
 */
function setAutoHeight($pe,min_height){
	if ($pe != null) {
		// 获取父元素的高度
		var parent_h = 0;									
		//if ($pe.attr("id")=="body"){
		if ($pe.get(0).tagName=="BODY"){	
			parent_h = getTotalHeight();  									// body元素获取窗口的高度			
			//alert("0-"+parent_h);
			min_height = (parseInt(min_height) == "NaN") ? 400 : min_height;  	// 默认最小高度为500
			parent_h = (parent_h<min_height) ? min_height : parent_h;	
			// 动态设置body的
			$pe.css("overflow","hidden");			
		} else {
			parent_h = $pe.height(); 
		}
		// 遍历父元素子级元素中样式类名 包含"autoHeight"但不包含"gridTable"的元素，计算并设置其高度
		$pe.children(".autoHeight").each(function(i){	
			var $e1 = $(this);		
			if ($e1.hasClass("autoHeight") && (! $e1.hasClass("gridTable")) && ($e1.css("display") != "none") ) {		
				// 该元素的纵向的边线宽度及外边距（从边线（border）开始至margin-top或margin-bottom之间的距离
				//（含border线宽度和padding高度））
				var border_outer_h = $e1.outerHeight()-$e1.height();					
				//alert($e1.attr("id")+" : "+border_outer_h);	
				// 遍历该元素的所有 非autoHeight 和 非隐藏 的兄弟元素并合计实际高度（siblings()）
				var sibling_h = 0;
				$e1.siblings().each(function(j){											
					if (!($(this).hasClass("autoHeight") || ($(this).css("display") == "none"))) {																	
						// 获取本元素
						sibling_h = sibling_h+$(this).outerHeight(true);						
						//alert($(this).attr("id")+" : "+sibling_h);	
					};									
				});	
				
				// 遍历父元素的所有子元素， 排除 浮动 的子元素，处理
				// 纵向上的外边距值（maring）之间重叠互吃的问题（两个以上兄弟元素才计算）
				var margin_height_1 = 0;  // 垂直方向的理论外边距（包含margin-top和margin-bottom）
				var margin_height_2 = 0;  // 元素的margin-bottom 与相邻下一个元素间的 margin-top 之间互吃后的实际边距
				if ($pe.children().size()>1) {				
					$pe.children().each(function(k){
						$e2 = $(this);	
						if (!(($e2.css("float")=="left") || ($e2.css("float")=="right"))) {								
							// 垂直方向的理论外边距合计
							margin_height_1 = margin_height_1 + $e2.outerHeight(true) - $e2.outerHeight(false);							
							// 计算元素的margin-bottom 与相邻下一个元素间的 margin-top
							// 之间互吃被吃掉的外边距
							// 当前元素下边距值（只考虑了单位是px的情况，其他单位会出错）
							var v_m_bottom=$e2.css("margin-bottom");
							var index = v_m_bottom.indexOf("px");
							if (index>0) {
								v_m_bottom = v_m_bottom.substring(0,index);
							} else {
								alert("不合乎要求的下外边距设置，计算出的高度可能会有误差："+v_m_bottom);
								v_m_bottom = 0;
							};
							v_m_bottom = parseInt(v_m_bottom);							
							// 下一个元素上边距值（只考虑了单位是px的情况，其他单位会出错）
							var v_m_top = 0;
							if (k<$pe.children().size()-1) {
								v_m_top=$e2.next().css("margin-top");
								var index = v_m_top.indexOf("px");
								if (index>0) {
									v_m_top = v_m_top.substring(0,index);
								} else {
									alert("不合乎要求的上外边距设置，计算出的高度可能会有误差："+v_m_top);
									v_m_top = 0;
								};
								v_m_top = parseInt(v_m_top); 
							};					
							// 实际被吃掉的那一部分边距（小的那一个被吃掉了,等于的时候吃掉任意一个）
							margin_height_2 = margin_height_2 + ((v_m_bottom<v_m_top) ? v_m_bottom : v_m_top);									
							//alert($e2.attr("id")+" : "+  margin_height_1 + " | " + margin_height_2 );
						};								
					});				
				};
				// 设置该元素的高度值
				var h=parent_h-sibling_h-border_outer_h-margin_height_1+margin_height_2-1;	
				//alert($e1.attr("id") +" ::: "+$pe.attr("id")+" :  "+parent_h +"|" +sibling_h+"|" +border_outer_h+"|" +margin_height_1+ "|" +margin_height_2);				
				//alert("h-"+h);				
				$e1.height(h);
				// 递归调用，计算该元素下所有自动高度元素的高度
				setAutoHeight($e1);	
			};						
		});
	}					
}
/*
 * 计算窗口的有效高度
 */
function getTotalHeight(){	  
    if($.support.leadingWhitespace){
    	_h = document.compatMode == "CSS1Compat"? document.documentElement.clientHeight :
            document.body.clientHeight;
    }else{
    	_h = document.compatMode == "CSS1Compat"? document.documentElement.clientHeight :
            	document.body.clientHeight;
    	//return self.innerHeight;
    }
	//alert(_h + "  |  " +self.innerHeight);
	return _h-2;
}
/*
 * 计算窗口的有效宽度
 */
function getTotalWidth(){	             
    if($.support.leadingWhitespace){
        return document.compatMode == "CSS1Compat"? document.documentElement.clientWidth :
                 document.body.clientWidth;
    }else{
        return self.innerWidth;
    }
}