$(function(){
	
	//绑定移动端a：active效果
	   document.body.addEventListener('touchstart', function () {});	
	 
})
$('.closeBtn') .on('click',function(){
    var _this=$(this);
    _this.parents('.popMod').hide();
    $('.flexBg').hide();
})

