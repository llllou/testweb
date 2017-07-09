function addTag(obj,tag,content,json,tagclass){
	for (var i = 0; i < json.length; i++) {
		var addContent=json[i][content];
    var child=document.createElement(tag);
    child.className=tagclass||"";
		obj.appendChild(child);
		var addTag=obj.getElementsByTagName(tag);
		addTag[i].innerHTML=addContent;
	}}
function addText(obj,content,json,href){
  for (var i = 0; i < json.length; i++) {
    var addContent=json[i][content];
    if (href){obj[i].href="detail.html?goods_id="+json[i]["goods_id"]}
    try{obj[i].innerHTML=addContent;}catch(err){return};
  }};
function addImg(obj,content,json){
  for (var i = 0; i < json.length; i++) {
    var addContent=json[i][content];
    try{obj[i].src=addContent;}catch(err){return};
  }};
tool={
	ajax:function(options){var url = options.url;
    if (url === undefined) {
      throw new Error('ajax一定要传URL');
      return;
    }
    this.response=null;
    var type = options.type || 'GET';
    var dataType = options.dataType || 'string';
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open(type, url);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          if ((typeof options.success) === 'function') {
            var response = '';
            if (dataType === 'string') {
              response = xhr.responseText;
            } else if(dataType === 'json') {
              response = JSON.parse(xhr.responseText);              
            }
            options.success(response);
          }
        } else {
          if ((typeof options.error) === 'function') {
            options.error(xhr.responseText);
          }
        }
      }
    }
  },
  //从地址栏得到解码的字符串
  getQueryString:function(name){
    var search = location.search.substr(1);
    var reg=new RegExp('(^|&)*'+name+'([^&]*)(&|$)*');
    decodeURI(search) ;
    var r=search.match(reg);
    if (r===null) {return null} else {return decodeURI(r[2])}
  },
//登录
  logined : function() {
  $("nav").append("<div id='userInfo'><img/><strong>尊敬的</strong><b></b><strong>ID:</strong><span></span><button id=logout>退出登录</button><a href=cart.html>购物车</a><a href='order.html'>查看订单</a></div>");
  // $("#userInfo img")[0].setAttribute("src", "http://h6.duchengjiu.top/shop/"+localStorage.avatar);
  $("#userInfo b").text(localStorage.username);
  $("#userInfo span").text(localStorage.user_id);
  },
  //加入购物车
  addCart:function(goods_id,number){
    if(!localStorage.token){alert("清登录");return}
    $.post("http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
      {"goods_id":goods_id,
        "number":number},function (message) {
         alert("加入购物车成功");
        })    
  },
  //创建订单对话框
  order:function () {
    var container=document.createElement("dialog")
  },
  Wave:function () {
    (function waveUp () {
      $(".wave .wave-box-up").animate({
      "left": "-1349px"},
      10000, function() {
      $(".wave .wave-box-up").animate({"left":"0"},10000);
      waveUp();
      });
    })();
    (function waveDown () {
      $(".wave .wave-box-down").animate({
      "left": "-1349px"},6000, function() {
      $(".wave .wave-box-down").animate({"left":"0"},6000);
      waveDown();
      })
    })();  
  },
  AsideBar:function () {
    init();
    $(".float-bar button").click(function(event) {
      $("body").scrollTop(0);
    });
    $(".float-bar a").on("mouseover",function () {
      $(".float-bar a").text("购物车")
    });
    $(".float-bar a").on("mouseout",function () {
      $(".float-bar a").text("")
    })
    $(window).scroll(function (event) {
      event=event||window.event;
      if($("body").scrollTop()>=100){$(".float-bar").css({"display":"block"})}
      else{$(".float-bar").css({"display":"none"})}
    });
    function init (){
      var bar = document.createElement("div");
      $(bar).html("<button>返回顶部</button><a href=cart.html></a>")
      $("body").append(bar).find(bar).addClass("float-bar");
    }
  },
  login:function (){
    if (localStorage.token) {
      $("nav .login").css("display","none");
      tool.logined();
      $(".login-box button:eq(1)").click(function() {
        console.log("cl")
        $(".login").css("display","block");
        localStorage.clear();
        $("#userInfo").remove();
      })
    };
    $("nav>.login>button").click(function() {
      $.ajax(
        {
          "url": "http://h6.duchengjiu.top/shop/api_user.php",
          "dataType": "json",
          "data": {
            "status": "login",
            "username": $(".login input:eq(0)").val(),
            "password": $(".login input:eq(1)").val()
          },
          "type": "POST",
          success: function (response) {
            console.log(response)
            if (response.code === 1001) {
              alert(response.message)
            }
            else if (response.code == 0) {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("username", response.data.username);
              localStorage.setItem("avatar", response.data.avatar)
              localStorage.setItem("user_id", response.data.user_id)
              $("nav .login").css("display", "none");
              tool.logined();
              $(".login-box button:eq(1)").click(function () {
                console.log("cl")
                $(".login").css("display", "block");
                localStorage.clear();
                $("#userInfo").remove();
              });
            }
          }
        })
    })
  }
}
var cat='http://h6.duchengjiu.top/shop/api_cat.php';
var goods='http://h6.duchengjiu.top/shop/api_goods.php';