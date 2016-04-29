$(function() {
  $(".picChange").click(function() {
    $(".login_form").slideToggle("slow");
    $(".login_qrCode").slideToggle("slow");
  });

 var flag=true;
 $(".close_msg").click(function() {
	 colse_flag=false;
    $(".notice").hide();
  });
 
 $(window).scroll(function(){
	 var a=$(document).scrollTop();
	 if(flag){
		 if(a>30)
			 $(".notice").hide();
		 else if(a>0&& a<=30)
			 $(".notice").show(); 
	 }
  });
 

  $(document).keyup(function(event) {
    if (event.keyCode == 13) {
      $("#submit").trigger("click");
    }
  });

  $("#submit").click(function() {
    $(".show_error_info,.security_code").show();
    window.open("homePage.html");
  })

  //给网页添加书签 仅IE,firfox 支持
  $("#collect").click(function(e) {
    var bookmarkUrl = this.href;
    var bookmarkTitle = this.title;
    var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';
    var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;

    if (window.external || document.all) { // For IE
      if (isChrome) // chrome
        alert('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹~');
      else
        window.external.AddFavorite(bookmarkUrl, bookmarkTitle);
    } else { // for safari,opera
      alert('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹~');
    }

  });

});