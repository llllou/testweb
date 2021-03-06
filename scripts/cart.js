function cartItem (imgSrc,des,num,price,id) {
	this.price=price;
	this.imgSrc=imgSrc;
	this.num=num;
	this.id=id;
	this.des=des;
	this.inti();
}
cartItem.prototype.inti = function () {
		var li=document.createElement("li");
		li.goods_id=this.id;
		li.price=this.price;
		$(li).html('<input type="checkbox" class="cart-check"/><img/><a href="detail.html?goods_id='+this.id+'">'+this.des+'</a><b class="left-icon">-</b><input type="text" class="cart-num"/><b class="right-icon">+</b><i>'+this.price+'</i><span>'+this.price*this.num+'</span><button>删除</button>')
		$("article ul").append(li);
		$(li).find("input").val(this.num);
		$(li).find("img").attr("src",this.imgSrc)
	}
window.onload=function () {
	tool.login();
	new tool.Wave();
	var search =document.getElementsByName("search")[0];
	var searchBtn = document.getElementById("search-btn");
	searchBtn.onclick=function searchClick(){
		tool.ajax ({
			"url":goods+"?search_text="+search.value,
			"type":"GET",
			"dataType":"json",
			"success":function(response){
				console.log(response);
				location.href="search.html?search_text="+search.value
			},
			"error":function(message){console.log(message)}
		})
	};
	$.ajax(
		{
			"url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
			"type":"get",
			"dataType":"json",
			success:function (response) {
				for (var i = 0; i < response.data.length; i++) {
					new cartItem(response.data[i].goods_thumb,response.data[i].goods_name,response.data[i].goods_number,response.data[i].goods_price,response.data[i].goods_id)	
				}	
				allprice();
				//选择全部
				$("#all-check").click(function(){
					$("article ul li .cart-check").trigger('click');
					allprice();
				});
				//删除商品
				$("article ul li button").click(function () {
					var id=$(this).parent().get();
					$.ajax({
						url: 'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
						type: 'post',
						dataType: 'json',
						data: {"goods_id":id[0].goods_id,
									"number": 0}
								})
					.done(function(response) {
						console.log(response);
					});
					$(this).parent().remove();
					allprice();
				})
				$("article>div>a").click(function () {
					var box=$(".cart-check:checked").siblings('button').get();
					for (var i = 0; i <box.length; i++) {
						$(box[i]).trigger("click")
					};				
				});
				//改变商品数量
				$("article ul li").click(function (event){	
					event=event||window.event;
					target=event.target||event.srcElement;
					cartId=this.goods_id;
					var carNum= $(this).find(".cart-num").val();
					if(target.innerText==="-"&&carNum>1){
						carNum--;
						$(this).find(".cart-num").val(carNum);
						$(this).find('span').text(this.price*carNum);
						updateCart(cartId,carNum);}
					else if(target.innerText==="+"&&carNum<=999){
						carNum++;
						$(this).find(".cart-num").val(carNum);
						$(this).find('span').text(this.price*carNum);
						updateCart(cartId,carNum);
					}
				});
				$(".cart-check").click(
					function(){allprice()}
				);
				$("article h2 a").click(function(event){
					event.preventDefault();
					localStorage.checked="";
					var arr=$(".cart-check:checked").parent().get();
					for (var i = 0;i < arr.length;i++)
					{
						localStorage.checked+="/"+arr[i].goods_id;
					};
					location.assign("order.html")
				})
			}
		})
}
function updateCart (goods_id,carNum) {
	$.ajax({
		url: 'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
		type: 'post',
		dataType: 'json',
		data: {"goods_id":goods_id,
					"number": carNum}
	});
	allprice();
}
function allprice () {
	var all=$("article ul li .cart-check:checked").siblings("span").get();
	var allVal=0;
	for (var i = 0; i < all.length; i++) {
		allVal+=parseInt(all[i].innerText,10);
	}
	$("article h2 span").text(allVal)
}