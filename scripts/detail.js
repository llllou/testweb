var search =document.getElementsByName("search")[0];
var searchBtn = document.getElementById("search-btn");
searchBtn.onclick=function(){
 	tool.ajax ({
		"url":goods+"?search_text="+search.value,
		"type":"GET",
		"dataType":"json",
		"success":function(response){
			location.href="search.html?search_text="+search.value
		},
		"error":function(message){console.log(message)}
	})
 }
 window.onload=function()
 {
 	var value = tool.getQueryString("goods_id");
 	tool.ajax({
 		"url":goods+"?goods_id"+value,
 		"type":"GET",
 		"dataType":"json",
 		"success":function(response){
 			console.log(response);
 			var content=document.getElementsByTagName("section")[0];
 			var box=document.createElement("div");
 			content.appendChild(box);
 			var img=document.createElement("img");
 			var detail=document.createElement("span");
 			var des=document.createElement("i");
 			var price=document.createElement("h3")
 			box.appendChild(img);
 			box.appendChild(detail);
 			box.appendChild(des);
 			box.appendChild(price);
 			$(box).append("<b class='icon-add'></b><input type='text' value='1'><b class='icon-minus'></b><button class='cart' id='detail-cart'>加入购物车</button> ");
 			img.src=response.data[0].goods_thumb;
 			des.innerHTML=response.data[0].goods_desc;
 			detail.innerHTML=response.data[0].goods_name;
 			price.innerHTML="&yen;"+response.data[0].price;
			$(".detail .icon-add").click(function () {
				var count = $(".detail div input").val();
				count++;
				if (count>=99)count = 99;
				$(".detail div input").val(count);
			});
			$(".detail .icon-minus").click(function () {
				var count = $(".detail div input").val();
				count--;
				if (count<1)count = 1;
				$(".detail div input").val(count);
			});
 			$(".cart").click(function () {
 			tool.addCart(tool.getQueryString("goods_id").substr(1),$(".detail div input").val())
 });
 		},
 		"error":function (message) {
 			console.log(message)
 		}}
 	);
	 new tool.AsideBar();
	 new tool.Wave();
	 tool.login();
 };
 new tool.ajax({
	"url":cat,
	"type": "GET",
    "dataType": "json",
    "success": function(response){
    	var itemHead=document.getElementsByClassName("item-head")[0];
       	addTag(itemHead,"a","cat_name",response.data,"item-head-name");
        var kind=document.getElementsByClassName("item-head-name");		
			for (var n = 0; n < kind.length; n++) {
			kind[n].idx=n;
			kind[n].href="list.html?cat_id="+response.data[n].cat_id;
			}			
        },
    "error": function(message) {
      //
      console.log(message);
    }
});
