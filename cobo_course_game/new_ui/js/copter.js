$(function () {

    /*
     * 页面信息
     *getGateJson(),storeGateJson(),详见copter_user.js
     * info: 页面信息
     * prev_time 当前关卡的，前一个关卡通过时间,用于设置关卡之间的时间间隔
     * */
    var prev_time = null;
    var next_id=null;
    $.getJSON("new_ui/json/copter.json", function (data) {
        var gate = getGateJson();
        gate.info=null;
        var id = gate.id;
        var arr = data.gatelist;
        $.each(arr, function (i, v) {
            if (v.id == id) {
                gate.info = v;
                if (i > 0) prev_time = arr[i - 1].lastTime;
                if(i<arr.length-1) 
                	next_id=arr[i+1].id;
                else
                	next_id=null;
                return false;
            }
        });
        storeGateJson(gate);
        setPage();
    });

    /*
     * 图片轮播
     * * ** * * */
    var curIndex = 0;
    var autoChange = setInterval(function () {
        if (curIndex < $(".img_list li").length - 1) {
            curIndex++;
        } else {
            curIndex = 0;
        }
        scrollCarousel(curIndex);
    }, 5000);

    $(".ind_list").find("li").each(function (item) {
        $(this).hover(function () {
            clearInterval(autoChange);
            curIndex = $(this).index();
            scrollCarousel(curIndex);
        }, function () {
            autoChange = setInterval(function () {
                if (curIndex < $(".img_list li").length - 1) {
                    curIndex++;
                } else {
                    curIndex = 0;
                }
                scrollCarousel(curIndex);
            }, 5000);
        });
    });

    /*
     * 弹出关卡结果
     * $(".start_study") 闯关结果
     * $(".open_wallet") 打开锦囊
     * */
    $(".start_study").click(function () {
        var flag = judgeGate(); //true 为小关卡，false 为boss 关卡
        var gate = getGateJson();
            gate.info.count++;
        var info = gate.info;
        var str=null;
        $(".gate_modal .gate_title").html(info.name);
        $(".gate_modal .tryTimes span").html(info.count);
        $(".gate_modal .wallet_btn").hide();
        console.log(gate.info.getThrough);
        //打开锦囊倒计时
        var time2=currentTime();
        str1=countTime(prev_time,time2);
        
        if(flag){
	         $(".gate_modal .moal_rate .rate_progress").css({width: info.progress});
	         $(".gate_modal .moal_rate>div:last-child").html(info.progress);
	         if(!info.getThrough){
	        	 gate.target=".props_result_small";
	         }else{
	        	 $(".gate_modal .finishTime span").html(info.finishTime);
	             $(".gate_modal .bestScore span").html(info.bestScore);
	        	 gate.target=".props_result_big";
	        	 gate.first_floor_target=".props_result_big";    
	             
	        	 //判断完成当前关卡和上一个关卡的时间间隔
	        	 if(!info.hspassed){
	        		 if(str1!=null){
	        	        	setInterval(function() {
	        	        		$(".gate_modal .wallet_btn_3").show();
	        		       		 var time2=currentTime();
	        		       		 str1=countTime(prev_time,time2);
	        		       		 str1+="后可以打卡锦囊";
	        		       		 $(".gate_modal .gate_waring").empty().css({color:"red"}).html(str1);
	        		       		 $(".gate_modal .wallet_btn").find("img").attr("src" , "new_ui/images/game/but_7.png")
	        	       	 	},1000);
	        	        }else{
	        	        	$(".gate_modal .wallet_btn_1").show();
	        	        	str = "请先打开锦囊才能过关哦！";
	        	        	$(".gate_modal .gate_waring").empty().html(str);
	        	        }
		         }else{
     	        	 $(".gate_modal .wallet_btn_2").show();
		        	 str = '恭喜获得道具  &nbsp;&nbsp;<img src=" '+info.present.mini_img+' ">';
		        	 $(".gate_modal .gate_waring").empty().html(str);
		        	//如果有下一关直接打开进入下一关按钮
		        	 if(next_id!=null) 
		        		 $(".gate_modal  .footer-btn-group>div:last-child").removeClass().addClass("gonext2");
		         }
	         }
	         	
        }else{
        	$(".gate_modal .curScore span").html(58);//记录本次成绩
        	
        	if(!info.getThrough){
        		gate.target=".weapon_result_small";
        	}else{
        		 $(".gate_modal .finishTime span").html(info.finishTime);
	             $(".gate_modal .bestScore span").html(info.bestScore);
	             gate.target=".weapon_result_big";
	             gate.first_floor_target=".weapon_result_big";
	             if(info.star){
	             	var str="new_ui/images/game/star_s_"+info.star+".png";
	             	$(".gate_modal  .result_star").find("img").attr("src",str);
	             }
	             if(!info.hspassed){
	        		 if(str1!=null){
	        	        	setInterval(function() {
	        		       		 var time2=currentTime();
	        		       		 str1=countTime(prev_time,time2);
	        		       		 str1+="后可以获取法宝";
	        		       		 $(".gate_modal .gate_waring").empty().css({color:"red"}).html(str1);
	        		       		$(".gate_modal .wallet_btn_3").show();
	        	       	 	},1000);
	        	        }else{
	        	        	$(".gate_modal .wallet_btn_1").show();
	        	        	str = "请先获取法宝才能过关哦！";
	        	        	$(".gate_modal .gate_waring").empty().html(str);
	        	        }
		         }else{
		        	 $(".gate_modal .wallet_btn_2").show();
		        	 str = '恭喜获得法宝  &nbsp;&nbsp;<img src=" '+info.present.mini_img+' ">';
		        	 $(".gate_modal .gate_waring").empty().html(str);
		        	
		        	 //如果有下一关直接打开进入下一关按钮
		        	 if(next_id!=null) 
		        		 $(".gate_modal  .footer-btn-group>div:last-child").removeClass().addClass("gonext2");
		         }
        	}
        	
        }
        $(".gate_modal .gate_waring").empty().html(str);
        storeGateJson(gate);
        show_gate_modal();
    });


    /*
     * 打开锦囊
     * */
    $(".open_wallet").click(function () {
        var flag = judgeGate(); //true 为小关卡，false 为boss 关卡
        var gate = getGateJson();
        gate.target=null;
        var info = gate.info;
        var user = gate.user;
        if (info.getThrough) { //通过课程或者考试，判断出可以打开锦囊
            if (!info.hspassed) { //没有通过关卡，判断出还没有打开锦囊
             if(flag){
            	 $(".props_big .modal_info_props").html(info.present.title);
                 $(".props_big .gold_leaf img").attr("src", info.present.img);
                 gate.target=".props_big";
                 user.propNum++;
              }else{
            	  $(".weapon_big .modal_info_weapon").html(info.present.title);
                  $(".weapon_big .gold_leaf img").attr("src", info.present.img);
                  $(".weapon_big .weapon_info").html(info.present.des);
                  gate.target=".weapon_big";
                  user.weapons.push(info.present);
              }
             
             gate.info = info;
             gate.user = user;
             storeGateJson(gate);
             show_gate_modal();
           }else{
        	   var str=null;
           	if(flag)
           		str = "<div>对不起此道具您已经获取</div><div>不能重复获取</div>";
           	else
           		str = "<div>对不起此法宝您已经获取</div><div>不能重复获取</div>";
           	open_wallet_failed(flag,str);
           }
        } else {
        	var str=null;
        	if(flag)
        		str = "<div>对不起您暂未通过本关卡</div><div>不能打开锦囊</div>";
        	else
        		str = "<div>对不起您暂未通过本关卡</div><div>不能获取法宝</div>";
        	open_wallet_failed(flag,str);
        }
    });
    
    
    $(".gate_modal .goBack").click(function () {
        close_gate_modal(true);
    });

    $(".gate_modal .gorefresh").click(function () {
        close_gate_modal(false ,true);
        var gate = getGateJson();
        
        // 注意下列填充的都是模拟数据
        var time2=currentTime();
        gate.info.lastTime=time2;
        gate.info.progress = "100%";
        gate.info.getThrough = true;
        gate.info.curScore = 77, //本次成绩
        gate.info.finishTime = "1小时27分",
        
        
        storeGateJson(gate);
        setPage();
    });

    //直接进入下一关
    $(".gate_modal .footer-btn-group").click(function (e) {
        if ($(e.target).is(".gonext2")) {
        	var gate=getGateJson();
        	gate.id=next_id;
        	storeGateJson(gate);
        	window.location.href="gate.html";
        }
    });

    $(".modal_sure").click(function () {
    	var gate = getGateJson();
        gate.info.hspassed=true;
        
        $(".gate_modal .wallet_btn").hide();
    	$(".gate_modal .wallet_btn_2").show();
        
        var flag = judgeGate();
        if(flag)
        	 str = '恭喜获得道具  &nbsp;&nbsp;<img src=" '+gate.info.present.mini_img+' ">';
        else
        	str = '恭喜获得法宝  &nbsp;&nbsp;<img src=" '+gate.info.present.mini_img+' ">';
   	    $(".gate_modal .gate_waring").empty().html(str);
   	    
   	//直接打开进入下一关按钮
   	    if(next_id!=null)
         $(".gate_modal  .footer-btn-group>div:last-child").removeClass().addClass("gonext2");
   	    else{
   	    	gate.finalBoss.entered=true;//游戏的index.html 页面 显示最终一关
   	    }
   	    
   	 close_gate_modal();
     setPage();
   	 storeGateJson(gate);
    })
    
    $(".modal_sure_false").click(function(){
    		close_gate_modal();
    });

    /*
     * 页面之间的跳转*/
    $(".btn_group .back_index").click(function () {
        go_home();
    });

});

//加载页面关卡信息
function setPage() {
    var gate = getGateJson();
    var obj = gate.info;
    //关卡名称；
    $("#gate_name").html(obj.name);

    //关卡进度
    var flag = judgeGate();
    if (flag) {
        $(".gate_rate_small").show();
        $(".gate_rate .rate_progress").css({
            "width": obj.progress
        });
        $(".gate_rate .user_rate>div:last-child").html(obj.progress);
        
        if(!obj.hspassed)
        	$(".btn_group .open_wallet").find("img").attr("src","new_ui/images/game/but_4.png");
        else
        	$(".btn_group .open_wallet").find("img").attr("src","new_ui/images/game/but_6.png");
        
    } else {
        $(".gate_rate_big").show();
        
        if(!obj.hspassed)
        	$(".btn_group .open_wallet").find("img").attr("src","new_ui/images/game/but_9.png");
        else
        	$(".btn_group .open_wallet").find("img").attr("src","new_ui/images/game/but_10.png");
    }
    
    $(".gate_rate .lastTime span:last-child").html(obj.lastTime);
    $(".gate_rate .user_count div:first-child>span:last-child").html(obj.count);
    if (obj.hspassed) $(".gate_rate .hspassed").show();
    $(".gate_rate .total_time>span:last-child").html(obj.finishTime);
    $(".gate_rate .bestScore>div:first-child span:last-child").html(obj.bestScore);

    //关卡信息
    $(".gate_info .gate_Carousel .img_list").empty();
    if (obj.imgs) {
        $(".gate_info .gate_Carousel").css({
            display: "block"
        });
        var imgs = obj.imgs;
        for (i in imgs) {
            var str1 = '<li><img src=" ' + imgs[i] + ' " alt=" ' + i + ' "></li>';
            var str2 = (i == 0 ? '<li class="indOn"></li>' : '<li></li>');
            $(".gate_info .gate_Carousel .img_list").append(str1);
        }
    }
    $(".gate_info .gate_brief .gate_brief_title").html(obj.brief.title);
    $(".gate_info .gate_brief .gate_brief_details").html(obj.brief.details);
}

//判断当前关卡是小关卡还是boss关卡；{true:小关卡，false:boss 关卡}
function judgeGate() {
    var obj = getGateJson();
    var str = obj.id.split("_")[0];
    var flag = (str == "gate" ? true : false); //判断当前关卡是boss 关卡还是小的关卡
    return flag;
}


/*关卡图片轮播*/
function scrollCarousel(num) {
    var length = $(".img_list li").length;
    var liWidth = $(".img_list li").outerWidth(true);
    var boxWidth = $(".rate_box").outerWidth(true);
    var speed = "slow"; //滚动速度
    $(".ind_list").find("li").removeClass("indOn").eq(num).addClass("indOn");
    $(".img_list").find("li").each(function (item) {
        var str = $(this).find("img").attr("alt");
        if (str == num) {
            $(".img_list").css({
                "width": liWidth * length
            }); //设置滚动盒子的宽度
            $(".img_list").stop().animate({
                "margin-left": "-" + item * liWidth + "px"
            }, speed, function () {
                //将第一张图片放到最后一张图片后面
                for (var i = 0; i < item; i++)
                	$(".img_list").find("li").last().after($(".img_list").find("li").first());
                $(".img_list").css({
                    "margin-left": "0px"
                });
            });
        }
    });
}

/*
 * 自定义模态框：
 * 打开自定义模态框                     show_gate_modal() ;
 * 打开锦囊失败的提示信息         open_wallet_failed(flag,str);
 * 关闭自定义模态框                     close_gate_modal(flag,flag2)  ,  参数flag ：用来判断是否需要返回首页 ,flag2 用来关闭两层第二层弹出窗口
 * */
function show_gate_modal() {
	var gate=getGateJson();
	var target=gate.target;
	var tg=$(target);
	tg.show();
	tg.next(".gate-footer").show();
	tg.parents(".gate_modal").css({display:"block"});
	tg.parent(".modal_content").animate({top:"5%"}, 'slow');
};

function open_wallet_failed(flag,str){
	var gate=getGateJson();
	 gate.target=null; 
	if (flag) {
        $(".gate_modal .props_small .modal_info_props").html(str);
        gate.target=".props_small";
     } else {
         $(".gate_modal .weapon_small .modal_info_weapon").html(str);
         gate.target=".weapon_small";
     }
	storeGateJson(gate);
     show_gate_modal();
}

function close_gate_modal(flag ,flag2) {
	var gate=getGateJson();
	var target=gate.target;
	var firstfloor=gate.first_floor_target;
	var tg=$(target);
	var fft=$(firstfloor);
	
    tg.parent(".modal_content").animate({top: "-50%"}, 'slow', function () {
    	tg.next(".gate-footer").hide();
    	tg.parents(".gate_modal").hide();
        if (flag) go_home();
    });
    
    if(flag2){
    	if(firstfloor){
    		fft.parent(".modal_content").animate({top: "-50%"}, 'slow', function () {
    			fft.next(".gate-footer").hide();
    			fft.parents(".gate_modal").hide();
    			gate.first_floor_target=null;
    			storeGateJson(gate);
            });
    	}
    }
    
    setUser(); //重新加载用户信息，coper_user.js
}

//返回首页
function go_home() {
    window.location.href = "copter_index.html";
}

//显示当前时间
function currentTime(){
    var today=new Date();
    var y=today.getFullYear(); 
    var mon=today.getMonth() + 1;
    var d=today.getDate();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();

    //日期格式 2015/7/31  11:28:10
    var str=y+"/"+mon+"/"+d+"  "+h+":"+m+":"+s; 
    return str;    
}

//计算时间差
function countTime(t1,t2){
   var str=null;
   var time1=Date.parse(t1);
   var time2=Date.parse(t2);
   var t3=time2-time1; //时间差的毫秒数
   var t4=8*3600*1000-t3;//计算离8h 时还有多长时间，关卡时间间隔为8h
   if(t4>0){
     //计算小时数
     var h=Math.floor(t4/(3600*1000));
    
     //计算分钟数
     var level1=t4%(3600*1000);
     var m=Math.floor(level1/(60*1000));

     //计算秒数
     var level2=level1%(60*1000);
     var s=Math.round(level2/1000);
     str=h+"小时"+m+"分钟"+s+"秒";
   }
   return  str;
}




















