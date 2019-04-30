//游戏转盘
$(function() {
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60)
        }
    })();
    var totalDeg = 360 * 3 + 0;
    var steps = [];
//          var lostDeg = [51, 141, 231, 321];
//          var prizeDeg = [6, 96, 186 ,276];
    var lostDeg = [50,110, 170,230, 290,350];
    var prize, sncode;
    var count = 0;
    var now = 0;
    var a = 0.01;
    var outter, inner, timer, running = false;

    function countSteps() {
        var t = Math.sqrt(2 * totalDeg / a);
        var v = a * t;
        for (var i = 0; i < t; i++) {
            steps.push((2 * v * i - a * i * i) /2)
        }
        steps.push(totalDeg)
    }
    function step() {
        outter.style.webkitTransform = 'rotate(' + steps[now++] + 'deg)';
        outter.style.MozTransform = 'rotate(' + steps[now++] + 'deg)';
        if (now < steps.length) {
            requestAnimFrame(step)
        } else {
            running = false;
            setTimeout(function() {
            	var tips = [
            	    {"num":1,"result":"1元话费"},
            		{"num":2,"result":"谢谢参与"},
            		{"num":3,"result":"2元话费"},
            		{"num":4,"result":"谢谢参与"},
            		{"num":5,"result":"5元话费"},
            		{"num":6,"result":"谢谢参与"},  
            	];
            	var cur_deg = steps[steps.length-1];
            	var par_deg = 360-(cur_deg-Math.floor(cur_deg/360)*360);
            	var result=0;
            	if(par_deg>0 && par_deg<=50){
            		result = "1元话费";
            		$('#end_text').text('恭喜你抽中的是');
            	}
            	if(par_deg>50 && par_deg<=110){
            		result = "谢谢参与";
            		$('#end_text').text('很遗憾，你抽中的是');
            	}
            	if(par_deg>110 && par_deg<=170){
					result = "2元话费";
					$('#end_text').text('恭喜你抽中的是');
            	}
            	if(par_deg>170 && par_deg<=230){
            		result = "谢谢参与";
            		$('#end_text').text('很遗憾，你抽中的是');
            	}
            	if(par_deg>230 && par_deg<=290){
            		result = "5元话费";
            		$('#end_text').text('恭喜你抽中的是');
            	}
            	if(par_deg>290 && par_deg<=350){
            		result = "谢谢参与";
            		$('#end_text').text('很遗憾，你抽中的是');           		
            	}
            	
              	//alert(par_deg+":"+result)
            	$(".opacityDiv,.pop_end").show();
            	$('#endPrice').text(result);
            	
            	//$("#lotterying").hide();
            }, 200)
        }
    }

    function start(deg) {    	
        deg = deg || lostDeg[parseInt(lostDeg.length * Math.random())];
        running = true;
        clearInterval(timer);
        totalDeg = 360 * 3 + deg;
        steps = [];
        now = 0;
        countSteps();
        requestAnimFrame(step)
    }
    window.start = start;
    outter = document.getElementById('outer');
    inner = document.getElementById('inner');
    i = 6;
    $(".beginPlay").click(function() {
    	//$("#lotterying").show();
        if (running) return;
        //if (count >= 3) {//如果不需要可以注视掉，抽奖次数
           // alert("您已经抽了 3 次奖。");
            //return;
        //}        
        //单机版
        prize = null;
        start();
        //count++;
        running = false;
        
    })
});