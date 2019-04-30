var lastLeft = new Date();
var lastRight = new Date();
var shaking = false;
var stopNum = 0;
var bbCount=10;
var ds, a1, a2, a3, a4, a5, a6;
var flag = 1; //博饼初始状态
var gamecoin = 0;
// 首先，定义一个摇动的阀值
var SHAKE_THRESHOLD = 800;
// 定义一个变量保存上次更新的时间
var last_update = 0;
// 紧接着定义x、y、z记录三个轴的数据以及上一次出发的时间
var x;
var y;
var z;
var last_x;
var last_y;
var last_z;

function deviceMotionHandler(eventData) {　　 // 获取含重力的加速度
    　　
    var acceleration = eventData.accelerationIncludingGravity;

    　　 // 获取当前时间
    　　
    var curTime = new Date().getTime();　　
    var diffTime = curTime - last_update;　　 // 固定时间段
    　　
    if (diffTime > 100) {　　　　
        last_update = curTime;

        x = acceleration.x;　　　　
        y = acceleration.y;　　　　
        z = acceleration.z;

        　　　　
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

        　　　　
        if (speed > SHAKE_THRESHOLD) {　　　　　　 // TODO:在此处可以实现摇一摇之后所要进行的数据逻辑操作
            　　　　　　begin_func();
            //alert("test yao!");
        }

        last_x = x;　　　　
        last_y = y;　　　　
        last_z = z;
    }
}

window.onload = function() {
    window.scroll(0, 0);
    if (window.DeviceMotionEvent) {

        　　　　 // 移动浏览器支持运动传感事件
        　　　　window.addEventListener('devicemotion', deviceMotionHandler, false);
    }
}
/*点击博一博*/
$('#boyiba').on('click',begin_func);
function imghide(num01,num02,num03,num04,num05,num06) {
    a1 = num01||rnd(1,7);
    a2 = num02||rnd(1,7);
    a3 = num03||rnd(1,7);
    a4 = num04||rnd(1,7);
    a5 = num05||rnd(1,7);
    a6 = num06||rnd(1,7);
    audioAutoPlay();
    //autoPlayMusic();
    $('.sievePlay span').show().addClass('active');
    $('.sieve01').css('background-image','url(./images/'+a1+'.png)');
    $('.sieve02').css('background-image','url(./images/'+a2+'.png)');
    $('.sieve03').css('background-image','url(./images/'+a3+'.png)');
    $('.sieve04').css('background-image','url(./images/'+a4+'.png)');
    $('.sieve05').css('background-image','url(./images/'+a5+'.png)');
    $('.sieve06').css('background-image','url(./images/'+a6+'.png)');
    $("#boyiba").attr("disabled", false);
    addinfo();
}

function addinfo() {
    bbCount--;
    setTimeout(diceReset, 1000);
    setTimeout(function() {
        $("#id_leftcount").html(bbCount);
        $(".prompTxt").show();
        musicPlay(false);
    }, 1500);

}
function diceReset() {
    $('.sievePlay span').removeClass('active');
    // $('.dice6').addClass('active1'); 
    flag = 1;
    console.log(flag);

}
var nowDate = 0,
    lastDate = 0;
function begin_func() {
    if (flag) {
        flag = 0;
        nowDate = new Date().getTime();
        //  alert(nowDate-lastDate);
        if (nowDate - lastDate < 1500) {
            lastDate = nowDate;
            return false;
        }

        var bbCount = parseInt($("#id_leftcount").html());
        if (bbCount > 0) {
            $(".prompTxt").hide();
            $("#boyiba").attr("disabled", true);
            setTimeout(imghide, 500);
        } else {
            musicPlay(false);
            $(".prompTxt").show();
            $(".prompTxt p").html("您今日次数已用完，分享可获一次机会！");
        }
    }
}
function addOne() {

    $('#mcover').show();

}
function shareHide() {

    $("#shareImg").hide();

}
/*获取1-6之间的随机数*/
function rnd(m,n){ 
    return  Math.floor(Math.random()*(n-m)+m);
}
/*音乐开始*/
function audioAutoPlay() {
    var audio = document.getElementById('bg-music');
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
    }, false);
}
// 音乐播放
// function autoPlayMusic() {
//     // 自动播放音乐效果，解决浏览器或者APP自动播放问题
//     function musicInBrowserHandler() {
//         musicPlay(true);
//         document.body.removeEventListener('touchstart', musicInBrowserHandler);
//     }
//     document.body.addEventListener('touchstart', musicInBrowserHandler);
//     // 自动播放音乐效果，解决微信自动播放问题
//     function musicInWeixinHandler() {
//         musicPlay(true);
//         document.addEventListener("WeixinJSBridgeReady", function () {
//             musicPlay(true);
//         }, false);
//         document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
//     }
//     document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
// }
function musicPlay(isPlay) {
    var media = document.querySelector('#bg-music');
    if (isPlay && media.paused) {
        media.play();
    }
    if (!isPlay && !media.paused) {
        media.pause();
    }
}