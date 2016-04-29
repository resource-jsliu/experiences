$(function(){

/*
 * 输出数据
 * arr3  帖子的json 数据;
 * */
var arr3=[];
$.getJSON("new_ui/json/copter_index.json",function(data){
	var arr1=data.herolist;
	var arr2=data.scorelist;
	 arr3=data.postlist;
	var arr=data.gatearr;
	 var gate = getGateJson();
	 //显示用户的通关记录
	 $.each(arr,function(i,v){
		 if(v.entered){
			 $("#"+v.id).addClass("entered");
			 if(v.star){
				 var str=' <img src="new_ui/images/game/star_'+v.star+'.png">';
				 $("#"+v.id+" .boss_picB>div:last-child").append(str);
			 }
		 }
		 
		 //将终极boss 的数据储存起来
		 if(i==(arr.length-1)){
			 if(!gate.finalBoss){
				 gate.finalBoss=v;
				 storeGateJson(gate); 
			 }else{
				 if(gate.finalBoss.entered)
					 $("#"+gate.finalBoss.id).addClass("entered");
			 }
		 }
			 
	 });
	 
	
	//输入最新英雄榜数据
	$.each(arr1,function(i,v){
		if(i<10){
			var numStr=null;
			var ind=i+1;
			if(ind<4)
				numStr='<div class="item_order_bright left_side">'+ind+'</div>';
			else
				numStr='<div class="item_order_dark left_side">'+ind+'</div>';
			var str= '<div class="item">'+
						numStr+
						'<div class="left_side"><img src=" '+  v.img +' "></div>'+
						'<div class="item_text left_side">'+v.name+'</div>'+
						'<div class="item_text right_side">闯关数：'+v.num+'</div>'+
						'<div class="clear"></div>'+
					'</div>';
			$(".hero_list .list_content").append(str);
		}
	});
	
	//输入通关分值英雄榜数据
	$.each(arr2,function(i,v){
		if(i<10){
			var numStr=null;
			var ind=i+1;
			if(ind<4)
				numStr='<div class="item_order_bright left_side">'+ind+'</div>';
			else
				numStr='<div class="item_order_dark left_side">'+ind+'</div>';
			var str= '<div class="item">'+
						numStr+
						'<div class="left_side"><img src=" '+  v.img +' "></div>'+
						'<div class="item_text left_side">'+v.name+'</div>'+
						'<div class="item_text right_side">总分值：'+v.score+'</div>'+
						'<div class="clear"></div>'+
					'</div>';
			$(".score_list .list_content").append(str);
		}
	});
	
	//加载帖子
	showPosts(arr3,false);
});

//跳转到对应关卡
$(".branch_num,.boss_picB").click(function(){
	var pt=$(this).parent();
	if(pt.hasClass('entered')){
		var str=$(this).parent().attr("id");
		/*
		 * getGateJson(),
		 * storeGateJson(), 
		 * 详见copter_user.js*/
		var gate=getGateJson();
		var fb=gate.finalBoss;
		gate.id=str;
		storeGateJson(gate);
		if(str!="boss_8")
		 window.location.href="copter.html";
		else{
			 if(fb.entered){//可以打开最终关卡
				 if(!fb.hspassed)//还没有通过最终关卡
					gate.finalBoss.target=".final_info";
				else
					gate.finalBoss.target=".final_weapon_small";
				 storeGateJson(gate);
				show_final_modal();
			 }
		}
	}
});


$(".get_btn").click(function(){
	var gate=getGateJson();
	gate.finalBoss.target=".final_weapon";
	storeGateJson(gate);
	show_final_modal();
})


$(".see_hero_list").click(function(){
	var gate=getGateJson();
	 gate.finalBoss.hspassed=true;
	 storeGateJson(gate);
	close_final_modal();
})

$(".modal_sure_false").click(function(){
	close_final_modal();
});

/*加载更多的帖子*/
$(".postList .more_posts").click(function(){
	$(this).hide();
	$(".postList .posts_up").show();
	showPosts(arr3,true);
})

$(".postList .posts_up").click(function(){
	$(this).hide();
	$(".postList .more_posts").show();
	showPosts(arr3,false);
});

$(window).scroll(function(){
	var a=$(document).scrollTop();
	if(a>0)
		$(".gotop").show();
	else
		$(".gotop").hide();
});

$(".gotop").click(function(){
	 $('body,html').animate({
	      scrollTop: 0
	    }, 1000);
});

});


function show_final_modal(){
	 var gate = getGateJson();
	 var fb=gate.finalBoss;
	 var fo=$(fb.target);
	 fo.show();
	 fo.parents(".gate_modal").css({display:"block"});
	 fo.parent(".modal_content").animate({top:"5%"}, 'slow');
	 	 
}

function close_final_modal(){
	 $(".modal_content").animate({top:"-50%"}, 'slow',function(){
		 $(".gate_modal").css({display:"none"}); 
		$(".modal_content>div").hide();
	 });
}


/*加载帖子*/
function showPosts(arr,flag){
	$(".postList .posts_area").empty();
	$.each(arr,function(i,v){
		var str= '<div class="post">'+
			'<div class="left_side"><img src=" '+v.img+' "></div>'+
			'<div class="left_side userInfo">'+
				'<div class="post_title">'+
					'<div>'+v.name+'</div>'+
					'<div>'+v.time+'</div>'+
				'</div>'+
				'<div class="poste_name text_overflow">'+v.title+'</div>'+
			'</div>'+
			'<div class="right_side">'+
				'<div><img src="new_ui/images/game/ico_z1.png">('+v.vote+')</div>'+
				'<div><img src="new_ui/images/game/ico_z2.png">('+v.comment+')</div>'+
			'</div>'+
			'<div class="clear"></div>'+
		'</div>';
		
		if(!flag){//!flag==true;加载6个帖子
			if(i<6)
				$(".postList .posts_area").append(str);	
		}else{//flag==true；加载更多帖子
			$(".postList .posts_area").append(str);
		}
	})
}


