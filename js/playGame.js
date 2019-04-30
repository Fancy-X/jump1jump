$(function() {
    //绑定移动端a：active效果
    document.body.addEventListener('touchstart', function() {});

    $(function() {
        //移动端快速点击,fastclick!
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    });

    // 判断用户历史是否点击过说明书
    var explain = localStorage.getItem('explain');
    if(explain){
        $(".explain-how").hide();
    }else{
        $(".explain-how").show();
    }
    $(".explain-how").click(function(){
        $(this).hide();
        localStorage.setItem('explain', 'true');
    })

    $("#gamePeople").removeClass("gamePeoplep").addClass("gamePeople")    //解决ios12跳不起来问题

    // 关闭排行版
    $('.closeBtn').on('click', function(){
        $('.rankPop').removeClass('bounceIn');
        $('.rankPop').hide();

        // $('.successPop').show();
        $('.failPop').show();
    });
    /*显示排行榜弹窗*/
    $('.leaderboardBtn').on('click', function(){
        // $('.successPop').hide();

        $('.failPop').hide();

        $('.rankPop').addClass('bounceIn');
        $('.rankPop').show();
    });
});




window.onload = function(){
    $('.popupBg,.loading').hide();
    
}

/*再玩一次*/
$('.againBtn').on('click', function(){
    window.location.reload();  
});

/*挑战失败弹窗*/
// $('.startBtn').on('click', function(){
// 	$('.failPop').addClass('bounceIn');
// 	$('.popupBg, .failPop').show();
// });

/*挑战成功弹窗*/
// $('.startBtn').on('click', function(){
// 	$('.successPop').addClass('bounceIn');
// 	$('.popupBg, .successPop').show();
// });

var count = 0;   //总分记录
var people = document.getElementById('gamePeople')
var leftTimer;
var rightTimer;
// $("#gamePeople").on({
//     touchstart: function(e){

//         timeOutEvent = setTimeout(function(){
//         //此处为长按事件-----在此显示遮罩层及删除按钮
//         },500);
//     },
//     touchmove: function(e){
//         var xxx = e.originalEvent.touches[0].pageX - peopleW/2
//         people.style.left = xxx+'px'
//         e.preventDefault();
//     },
//     touchend: function(e){
        
//         return false;
//     }
// }); 

 

//判断踩没踩中的变量
var last = 0;
var xxxx;     //人物中间点left
var bbbb;     //人物最下边top值
var widths1;    //取得第1个格子的宽度
var widths2;    //取得第二个格子的宽度
var left1;      //取得第1个格子的left
var left2;      //取得第二个格子的left
var bottom2;      //取得第二个格子的bottom
var flag = false;    //保证踩格子时类名切换只能触发一次，优化性能
var flag2 = false;    //保证头撞到格子时类名切换只能触发一次，优化性能
var top1 = $('.right').eq(0).position().top;
var height1 = $('.right').eq(0).height();
var top2 = $('.right').eq(1).position().top;
var peopleW = $("#gamePeople").width();
var windowW = $(window).width();
var rights;          //用于存更新之后的格子dom数组
var height = [0,3.7,7.4]


$(".jup-left").on({
    touchstart: function(e){
        // 初始化
        clearInterval(rightTimer)
        rightTimer = undefined
        if(!leftTimer && !rightTimer){
            leftTimer = setInterval(function(){
                if($("#gamePeople").position().left<= 0){
                    people.style.left = '0px'
                }else{
                    people.style.left = $("#gamePeople").position().left - 2+ 'px'
                }
            },5)
        }
        e.preventDefault();
    },
    touchmove: function(e){
        e.preventDefault();
    },
    touchend: function(e){
        clearInterval(leftTimer)
        leftTimer = undefined

        return false;
    }
}); 
$(".jup-right").on({
    touchstart: function(e){
        clearInterval(leftTimer)
        leftTimer = undefined
        if(!leftTimer && !rightTimer){
            rightTimer = setInterval(function(){
                if($("#gamePeople").position().left>= windowW - peopleW){
                    people.style.left = windowW - peopleW + "px"
                }else{
                    people.style.left = $("#gamePeople").position().left + 2+ 'px'
                }
            },5)
        }
        e.preventDefault();
    },
    touchmove: function(e){
        e.preventDefault();
    },
    touchend: function(e){
        clearInterval(rightTimer)
        rightTimer = undefined
        return false;
    }
});



var timer = setInterval(function(){

    xxxx = $("#gamePeople").position().left + peopleW/2
    tttt = $("#gamePeople").position().top 
    bbbb = $("#gamePeople").position().top + $("#gamePeople").height()
    left1 = $('.right').eq(0).position().left;
    left2 = $('.right').eq(1).position().left;
    bottom2 = $('.right').eq(1).position().top;
    widths1 = $('.right').eq(0).width();
    widths2 = $('.right').eq(1).width();
    // stopTime = $('#time').html()
    if(bbbb - last > 0) {   //下方向
        flag2 = true;
        if(bbbb >= top2 && bbbb <= top2 + 40) {   
            if(xxxx >= left2 && xxxx <= left2 + widths2) {     //踩到倒数第二个格子
                if(flag) {
                    changeBlank()
                    
                    if(gamePeople.className == 'gamePeople2 prevent' || gamePeople.className == 'gamePeople prevent'||gamePeople.className == 'gamePeoplep prevent') {
                        gamePeople.className = 'gamePeople3 change'
                    }
                    else if(gamePeople.className == 'gamePeople3 prevent') {
                        gamePeople.className = 'gamePeople2 change'
                    }
                    flag = false
                }
            }
        }
        if(bbbb >= top1-10 && bbbb <= top1 +10 ) {     
            if(xxxx >= left1 && xxxx <= left1 + widths1) {      //踩到倒数第一个格子
                if(flag) {
                    if(gamePeople.className == 'gamePeople2 prevent' || gamePeople.className == 'gamePeople3 prevent') {
                        gamePeople.className = 'gamePeoplep  change'
                    }
                    flag = false
                }
            }
            else{                               //倒数第一个格子踩空死亡
                gamePeople.className = 'gamePeople4 prevent'
                $('.popupBg, .failPop').show();
                $('.failPop').addClass('bounceIn');
                if(aaa==undefined)aaa=0;
                $('.failScore').html(aaa + '分')
                clearInterval(timer);
                clearInterval(Dtimer);
                // clearInterval(time);
            }
        }

        if($('#gamePeople').hasClass("change")) {       //切换跳跃动作图
            $('#gamePeople').removeClass('change').addClass('prevent')
        }
    }else{   //上方向
        flag = true;
        // if(tttt >= bottom2 && tttt <= bottom2 + height1) {   
        //     if(xxxx >= left2 && xxxx <= left2 + widths2) {     //撞到倒数第二个格子
        //         if(flag2) {
        //             // gamePeople.className = 'prevent gamePeople5'
        //             // gamePeople.style.top = bottom2 + height1 + 'px'
        //             // console.log(bottom2)
        //             flag2 = false
        //         }
        //     }
        // }
        if($('#gamePeople').hasClass("prevent")) {      //切换跳跃动作图
            $('#gamePeople').removeClass('prevent').addClass('change')
        }
    }

    last = bbbb;

},50)



var aaa;
var lefts;
var newone; 
var newRight; 
var newDiffer; 
var newDiffer1;
var addTime;
var addTime1;
var maxtime = 0.5 * 60; //
var msgArr = ['偷懒','废寝忘食','敬业爱岗','勤劳勇敢','跳']     //普通文字数组
var msgIndex;
var msgContent;
var DbArr = '超级加倍';       //加倍文字内容
var timeArr = '时间加倍';       //加时间文字内容
var timeValue = 6; 		//加时间的多少
var chance = 0.1        //出现特殊格子概率0~1
var timeValueBlock = $("#timeValue")  //加时间的dom
var Dtime = 5;         //加倍时间段
var Dtimer;
var Dshow = $('#double')     //x2字样




function changeBlank() {
    lefts = Math.random();
    if(lefts == 1){   //不能取到最后一个数，这样会找不到值
        lefts = 0.99 
    }
    msgLength = msgArr.length
    msgIndex = Math.floor(lefts*msgLength)
    msgContent = msgArr[msgIndex]
    newone = '<div class="right" style="left:' +(.2+lefts*1.5) +'rem;bottom:15.1rem">'
    newRight = '<div class="right" style="right:' +(.2+lefts*1.5) +'rem;bottom:15.1rem">'
    newDiffer = '<div class="right super" style="left:' +(.2+lefts*1.5) +'rem;bottom:15.1rem">'
    newDiffer1 = '<div class="right super" style="right:' +(.2+lefts*1.5) +'rem;bottom:15rem">'
    addTime = '<div class="right addtime" style="left:' +(.2+lefts*1.5) +'rem;bottom:15.1rem">'
    addTime1 = '<div class="right addtime" style="right:' +(.2+lefts*1.5) +'rem;bottom:15rem">'
    

    //踩到超级加分
    if($('.right').eq(1).hasClass("super")){
        if(Dtimer){
            Dtime+=5         //重复踩格子超级加倍时间叠加
        }else{
            // Dshow.show();
            Dtimer = setInterval(function(){
                Dtime-=1
                if(Dtime==0) {    //时间到重置定时器
                    clearInterval(Dtimer)    
                    Dtimer = undefined
                    Dtime = 5
                    // Dshow.hide();
                }
            },1000)
        }
    }
    // else if($('.right').eq(1).hasClass("addtime")){
    //     maxtime+=timeValue
    //     timeValueBlock.text('+' + timeValue +'s');
    //     if(timeValueBlock[0].className == '' || timeValueBlock[0].className == 'timeValue1' ) {
    //         timeValueBlock[0].className = 'timeValue'
    //     }else if(timeValueBlock[0].className == 'timeValue') {
    //         timeValueBlock[0].className = 'timeValue1'
    //     }
    // }

    if(Dtimer){
        aaa = count+=20
        console.log(Dshow[0].className);
        Dshow[0].style.left = left2 + widths2/2 + "px"
        if(Dshow[0].className=="double1" || Dshow[0].className==""){
            Dshow[0].className = "double"
        }else if(Dshow[0].className == "double"){
            Dshow[0].className = "double1"
        }
    }else{
        aaa = count+=10

    }
    if(aaa >= 1000){      //超过一千分增加难度
        msgArr.push("跳","跳")
    }
    $('.score').html(aaa+ '分')
    
    
    // 格子下移
    $(".wrapPic").find(".right").eq(0).remove();
    
    var place = Math.ceil(Math.random()*10000) -1;    //决定左右
    var differ = Math.ceil(Math.random()*10000) -1;    //决定超级类型和概率
    if(place%2 == 0){	                         //加左边的
        if( differ < 10000*chance){
            // if(differ%2 == 0){
                for(var i=0;i<DbArr.length;i++){
                    newDiffer+='<span class="msg-super">'+DbArr[i]+'</span>'
                }
                $(".wrapPic").append(newDiffer + '</div>')
            // }else{
            //     for(var i=0;i<timeArr.length;i++){
            //         addTime+='<span class="msg-super">'+timeArr[i]+'</span>'
            //     }
            //     $(".wrapPic").append(addTime + '</div>')
            // }
        }else {
            for(var i=0;i<msgContent.length;i++){
                newone+='<span class="msg-normal">'+msgContent[i]+'</span>'
            }
            $(".wrapPic").append(newone + '</div>')
        }
    }else{                                  //加右边的
        if(differ < 10000*chance){
            // if(differ%2 == 0){
                for(var i=0;i<DbArr.length;i++){
                    newDiffer1+='<span class="msg-super">'+DbArr[i]+'</span>'
                }
                $(".wrapPic").append(newDiffer1 + '</div>')
            // }else{
            //     for(var i=0;i<timeArr.length;i++){
            //         addTime1+='<span class="msg-super">'+timeArr[i]+'</span>'
            //     }
            //     $(".wrapPic").append(addTime1 + '</div>')
            // }
        }else {
            for(var i=0;i<msgContent.length;i++){
                newRight+='<span class="msg-normal">'+msgContent[i]+'</span>'
            }
            $(".wrapPic").append(newRight + '</div>')
        }
    }
    
    rights = $(".right")
    setTimeout(function() {
        for(var i=0;i<rights.length;i++){
            rights[i].style.bottom = height[i] + 'rem'
        }
    },50)
}

var xxxx2 = $("#gamePeople").position().left;        //重感
window.addEventListener('deviceorientation',DeviceOrientationHandler,false);
function DeviceOrientationHandler(event){
    var alpha = event.alpha,beta = event.beta,gamma = event.gamma;
    if(alpha != null || beta != null || gamma != null){
        //各个方向旋转的值
        //alert("alpha:" + alpha + "<br />beta:" + beta + "<br />gamma:" + gamma)
    //判断屏幕方向
        var tran;
        if(gamma*7 >= windowW - xxxx2) {
            tran = windowW - xxxx2 - 10
        }else if(gamma*7 <= -xxxx2-peopleW){
            tran = -xxxx2-peopleW + 10
        }else{
            tran = gamma*7
        }
        people.style.transform = 'translateX('+tran+'px)'
    }
}


// function CountDown() {
//     if (maxtime >= 0) {
//     msg = maxtime<10? '0'+ maxtime : maxtime;
//     document.all["time"].innerHTML = msg;
//     maxtime--;
//     } else{
//         clearInterval(time);
//         clearInterval(timer);
//         if(aaa==undefined)aaa=0;
//         $('.successPop').addClass('bounceIn');
//         $('.popupBg, .successPop').show();
//         $('.successScore').html(aaa + '分')
//         gamePeople.className = 'prevent'
//     }
// }
// time = setInterval("CountDown()", 1000);
