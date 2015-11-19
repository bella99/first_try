var zhufengEffect = {
	//当前时间*变化量/持续时间+初始值
	zfLinear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {//二次方的缓动（t^2）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {//三次方的缓动（t^3）
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {//四次方的缓动（t^4）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {//5次方的缓动（t^5）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {//正弦曲线的缓动（sin(t)）
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {//指数曲线的缓动（2^t）；
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {//指数衰减的正弦曲线缓动；
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	
	Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	zfBounce: {//指数衰减的反弹缓动。
		easeIn: function(t,b,c,d){
			return c - zhufengEffect.zfBounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return zhufengEffect.zfBounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return zhufengEffect.zfBounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
}


function getCss(ele,attr){
	if(window.getComputedStyle){
		return parseFloat(window.getComputedStyle(ele,null)[attr]);	
	}else{
		if(attr=="opacity"){//单独处理IE中的不透明度的问题
			var str=ele.currentStyle.filter;//"alpha(opacity=64)";
			var reg=/alpha\(opacity *= *(\d+)\)/;
			if(reg.test(str)){
				return RegExp.$1/100;//第一个分组的内容
			}else{
				return 1;//既：默认情况下是1，不透明度不写就是1	
			}
			
		}else{
			return parseFloat(ele.currentStyle[attr]);
		}
	}
}

function setCss(ele,attr,val){
	switch(attr){
		case "opacity":
			ele.style.opacity=val;
			ele.style.filter="alpha(opacity="+val*100+")";
			break;
		case "float":
			ele.style.cssFloat=val;//标准浏览器处理浮动的属性
			ele.style.styleFloat=val;//IE的
			break;
		case "height":
		case "width":
		case "top":
		case "left":
		case "margin":
		case "padding":
		case "borderRadius":
		 
			ele.style[attr]=val+"px";
			break;
		default:
			ele.style[attr]=val;
		
	}
}

function animate(ele,oTarget,duration,effect,fnCallback){//attr表示运动的方向
//1、effect动画类型，可选参数，可以不传。如果不传或传错了，则以减速的动画效果为默认效果
//2、可以传一个数组，详见下面的effect instanceof Array那个判断
//3、可以是一个方法,表示在这个位置传了一个回调函数
//4、还可以不传，表示默认使用减速动画，并且没有回调函数

//方法重载：相同的方法名，由于参数不同而实现的功能不同。JS可以使用判断参数个数或参数类型的方式来实现方法重载
var fnEffect=zhufengEffect.Expo.easeOut;
	//0是减速效果，就是默认值
	//1是匀速linear 2是back， 3是弹性Elastic,4是反弹Bounce
	if(typeof effect=="number"){
		switch(effect){
		case 0:
			break;
		case 1:
			fnEffect=zhufengEffect.zfLinear;
			break;
		case 2:
			fnEffect=zhufengEffect.Back.easeOut;
			break;
		case 3:
			fnEffect=zhufengEffect.Elastic.easeOut;
			break;
		case 4:
			fnEffect=zhufengEffect.zfBounce.easeOut;
		}
	}else if(effect instanceof Array){
		
		fnEffect=zhufengEffect[effect[0]][effect[1]];
		//假定effect是['Elastic','easeOut']
		//比如effect是['Elastic','easeOut']，则我们得到的结果是：
		//fnEffect=zhufengEffect.Elastic.easeOut;
		//相当于fnEffect=zhufengEffect["Elastic"]["easeOut"]
	}else if(typeof effect == "function"){
		fnCallback=effect;
	}
	var obj={width:500,height:300,left:800,top:677,opacity:0.1}
	var oBegin={};
	var oChange={};
	var counter=0;//记数器，用来记录各个方向是否有效
	for(var attr in oTarget){
		var target=oTarget[attr];
		var begin=getCss(ele,attr);
		var change=target-begin;
		if(change){//如果change有效才将其保存
			oBegin[attr]=begin;
			oChange[attr]=change;
			counter++;
		}
	}
	if(counter===0)return;//如果各个方向都为0，说明没有必要进行动画
	var times=0;
	var interval=15;
	window.clearInterval(ele.timer);//为了防止

	function step(){
		times+=interval;
		if(times>=duration){
			window.clearInterval(ele.timer);
			ele.timer=null;//动画停止则将其赋值为null
			for(var attr in oTarget){
				var target=oTarget[attr];
				setCss(ele,attr,target);
			}			
			if(typeof fnCallback=="function"){
				fnCallback.call(ele);
			}
		}else{
			for(var attr in oChange){//从有效的oChange里遍历
				var change=oChange[attr];
				var begin=oBegin[attr];//oBegin和oChange里的属性相同
				var val=fnEffect(times,begin,change,duration);//times/duration*change+begin;
				setCss(ele,attr,val);
			}
		}
	}
	ele.timer=setInterval(step,interval);
} 