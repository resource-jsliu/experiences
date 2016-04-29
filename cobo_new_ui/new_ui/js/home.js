$(function() {
	$(".goTop").click(function() {
	    $('body,html').animate({
	      scrollTop: 0
	    }, 1000);
	  })
	
  var msgFlag = true;
   $(".msg_close").click(function() {
	   $(".notice").hide();
	   $(".mainContent").css({
			"padding-top":"35px",
		})
		msgFlag=false;
   });  
  $(window).scroll(function() {
    var top = $(document).scrollTop();
    if(msgFlag){
    	if(top>30){
    		$(".notice").hide();
    		$(".mainContent").css({
    			"padding-top":"35px",
    		});
    	}else{
    		$(".notice").show();
    	} 	
    }

    if (top > 0) {
      $(".goTop").show();
    } else {
      $(".goTop").hide();
    }
  });

  

 

  $(".ctrl_list li").mouseover(function() {
    var ind = $(this).index();
    if(ind==12){
      //$(this).find(".li_info .left_side:first-child>img").attr("src", "images/system/mobile_blue.png");
      
      $(this).find(".li_info>i:first-child").removeClass("cobo-mobile").addClass("cobo-mobile-blue");
      $(".mobile_menu").slideDown("slow");
      
      $(this).css({
          background: "rgb(255,255,255)",
          color: "rgb(0,78,152)"
        });
      
      $(this).find(".li_info .second_i").removeClass("cobo-dropImg-white").addClass("cobo-dropImg").css({
    	  transform:"rotate(180deg)",
      });
    }
  });

  $(".ctrl_list li").mouseout(function() {
    $(".drop_menu").stop().hide();
    var ind = $(this).index();
    if(ind==12){
    	$(this).find(".li_info>i:first-child").removeClass("cobo-mobile-blue").addClass("cobo-mobile");
      $(this).css({
          background: "none",
          color: "rgb(255,255,255)"
        });
      $(this).find(".li_info .second_i").removeClass("cobo-dropImg").addClass("cobo-dropImg-white").css({
    	  transform:"rotate(0deg)",
      });
    }
  });

  $("#nav_menu>li").mouseenter(function() {
    var ind = $(this).index();
   $(".navBtn ul").find("li").removeClass("navOn").eq(ind).addClass("navOn");
    if(ind==2){
      $(".course_menu").slideDown("slow");
    }else if(ind==3){
      $(".app_menu").slideDown("slow");
    }
    $(this).find(".nav_info i").removeClass("cobo-dropImg").addClass("cobo-dropImg-white").css({
  	  transform:"rotate(180deg)",
    });
    
   
  })

 

  $("#nav_menu>li").mouseleave(function() {
    var ind=$(this).index();
    if(ind==2 || ind==3){
      $(".drop_menu").stop().hide();
      $(this).find(".nav_info i").removeClass("cobo-dropImg-white").addClass("cobo-dropImg").css({
      	  transform:"rotate(0deg)",
        });
    }
     $(".navBtn ul").find("li").removeClass("navOn").eq(0).addClass("navOn");
   
  })

  /*
   * banner 轮播
   * curIndex：当前index；
   * autoChange ；定时器自动变换2.5秒每次；
   * changeTo  调用变换处理函数
   * */

  var curIndex = 0;
  var autoChange = setInterval(function() {
    if (curIndex < $(".imgList li").length - 1) {
      curIndex++;
    } else {
      curIndex = 0;
    }
    changeTo(curIndex);
  }, 6000);

  $(".mini_imgList").find("li").each(function(item) {
    $(this).hover(function() {
      clearInterval(autoChange);
      changeTo(item);
      curIndex = item;
    }, function() {
      autoChange = setInterval(function() {
        if (curIndex < $(".imgList li").length - 1) {
          curIndex++;
        } else {
          curIndex = 0;
        }
        //调用变换处理函数
        changeTo(curIndex);
      }, 6000);
    });
  });

  function changeTo(num) {
    $(".imgList").find("li").removeClass("imgOn").fadeOut("slow").eq(num).fadeIn("slow").addClass("imgOn");
    $(".mini_imgList").find("li").removeClass("mini_imgOn").eq(num).addClass("mini_imgOn");
  }

  /*
   * 用户信息 下方功能板块轮播
   * cur_ind：当前index；
   * */
  var cur_ind = 0;
  $(".index_list li").mouseover(function() {
    var num = $(this).index();
    changeCmd(num);
  });

  function changeCmd(num) {
    $(".command_list").find("li").removeClass("comOn").hide().eq(num).show().addClass("comOn");
    $(".index_list").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
  }

  /*
   * $('.pics_box_*').marquee(function(){})
   * 无缝滚动
   * */
  $('.pics_box_1').marquee({
    auto: false,
    interval: 6000,
    speed:1500,
    showNum: 3,
    stepLen: 3,
    prevElement: $('#next1'),
    nextElement: $('#prev1')
  });

  $('.pics_box_2').marquee({
    auto: false,
    interval: 9000,
    speed:1500,
    showNum: 6,
    stepLen: 6,
    prevElement: $('#next2'),
    nextElement: $('#prev2')
  });

  $('.pics_box_3').marquee({
    auto: false,
    interval: 12000,
    speed:2000,
    showNum: 6,
    stepLen: 6,
    prevElement: $('#next3'),
    nextElement: $('#prev3')
  });
  
  /*chip_recommend*/
  $('#myTab a:first').tab('show');
  

});