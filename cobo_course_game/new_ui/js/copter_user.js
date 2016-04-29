$(function(){
	$.getJSON("new_ui/json/copter_user.json",function(data){
		var gate=getGateJson();
		if(!gate)
			gate={};
		gate.user=data;
		
		storeGateJson(gate);
		setUser();
	});	
});

/*将json 数据存储在localStorage*/
function storeGateJson(obj){
	obj = JSON.stringify(obj);
	localStorage.setItem("gate",obj);
}

/*从localStorage中获取json 数据*/
function getGateJson(){
	var gate = localStorage.getItem("gate");
	gate = JSON.parse(gate);
	return gate;
}

//加载页面的用户信息
function setUser(){
	var data=getGateJson().user;
	$(".uerInfo .user_msg>div:first-child span").html(data.name);
	$(".uerInfo .user_msg .prop div:nth-child(1) span").html(data.propNum);
	$(".uerInfo .user_msg .prop div:nth-child(2) span").html(data.totalScore);
	$(".uerInfo .weapon").empty();
	var str="<div>已获法宝:</div>";
	var obj=data.weapons;
	for(i in obj){
		var str1='<div>'+
					'<img src="'+obj[i].img+'"'+
					    'width="35px" height="44px" data-toggle="tooltip" data-placement="bottom"'+
						'title='+obj[i].des+'>'+
				 '</div>';
		str+=str1;
	}
	$(".uerInfo .weapon").append(str);
	//法宝的提示信息
	$("[data-toggle='tooltip']").tooltip();
}