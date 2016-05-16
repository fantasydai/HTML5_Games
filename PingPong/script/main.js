var pingpong={
	scoreA:0,
	scoreB:0
},
      playButton=document.getElementById("play"),
      patternSelect=document.getElementById("pattern");
pingpong.pressKeys=[];
pingpong.ball={
	speed:{
		easy:4,
		normal:5,
		hard:6
	},
	x:250,
	y:150,
	directionX:1,
	directionY:1,
	initial:{
		left:250,
		top:150,
		x:250,
		y:150,
	}
};
var KEY={
	UP:38,
	DOWN:40,
	W:87,
	S:83
};
playButton.addEventListener("click",function(){
	if(pingpong.timer){
		alert("游戏未结束");
		return;
	}
	initial();
	$("#scoreA").html(0);
	$("#scoreB").html(0);
	pingpong.scoreA=0;
	pingpong.scoreB=0;
	pingpong.timer=setInterval(gameloop,30);
	$(document).keydown(function(e){
		pingpong.pressKeys[e.which]=true;
	});
	$(document).keyup(function(e){
		pingpong.pressKeys[e.which]=false;
	});
},false);
//初始化
function initial(){
	$("#ball").css("left",pingpong.ball.initial.left);
	$("#ball").css("top",pingpong.ball.initial.top);
	pingpong.ball.x=pingpong.ball.initial.x;
	pingpong.ball.y=pingpong.ball.initial.y;
	var randomNum=Math.random()*4;
	if(randomNum<1){
		pingpong.ball.directionX=1;
		pingpong.ball.directionY=1;
	}else if(randomNum<2){
		pingpong.ball.directionX=1;
		pingpong.ball.directionY=-1;
	}else if(randomNum<3){
		pingpong.ball.directionX=-1;
		pingpong.ball.directionY=1;
	}else{
		pingpong.ball.directionX=-1;
		pingpong.ball.directionY=-1;
	}
}
function gameloop(){
	movePaddles();
	moveBall();
	var timer;
	if(pingpong.ball.x<parseInt($("#paddleA").css("left"))-parseInt($("#ball").width())){
		clearInterval(pingpong.timer);
		pingpong.scoreB++;
		$("#scoreB").html(pingpong.scoreB);
		timer=setTimeout(function(){
			initial();
			pingpong.timer=setInterval(gameloop,30);
		},1500);
	}
	if(pingpong.ball.x>parseInt($("#paddleB").css("left"))+parseInt($("#paddleB").width())){
		clearInterval(pingpong.timer);
		pingpong.scoreA++;
		$("#scoreA").html(pingpong.scoreA);
		timer=setTimeout(function(){
			initial();
			pingpong.timer=setInterval(gameloop,30);
		},1500);
	}
	if(pingpong.scoreA==11){
		alert("游戏结束，playA WIN");
		clearInterval(pingpong.timer);
		pingpong.timer=null;
		return;
	}else if(pingpong.scoreB===11){
		alert("游戏结束，playB WIN");
		clearInterval(pingpong.timer);
		clearTimeout(timer);
		pingpong.timer=null;
		return;
	}
}
//球拍移动函数
function movePaddles(){
	var $paddleA=$("#paddleA"),
   	      $paddleB=$("#paddleB");
	if(pingpong.pressKeys[KEY.UP]){
		if(parseInt($paddleB.css("top"))===0){
			return;
		}
		//获得球拍B的当top值并转化为Number
		var top=parseInt($paddleB.css("top"));
		//球拍B向上移动5px
		$paddleB.css("top",top-5);
	}
	if(pingpong.pressKeys[KEY.DOWN]){
		if(parseInt($paddleB.css("top"))===parseInt($("#playground").height())-parseInt($paddleB.height())){
			return;
		}
		//获得球拍B的当top值并转化为Number
		var top=parseInt($paddleB.css("top"));
		//球拍B向下移动5px
		$paddleB.css("top",top+5);
	}
	if(pingpong.pressKeys[KEY.W]){
		if(parseInt($paddleA.css("top"))===0){
			return;
		}
		//获得球拍A的当top值并转化为Number
		var top=parseInt($paddleA.css("top"));
		//球拍A向上移动5px
		$paddleA.css("top",top-5);
	}
	if(pingpong.pressKeys[KEY.S]){
		if(parseInt($paddleA.css("top"))===parseInt($("#playground").height())-parseInt($paddleA.height())){
			return;
		}
		//获得球拍A的当top值并转化为Number
		var top=parseInt($paddleA.css("top"));
		//球拍A向下移动5px
		$paddleA.css("top",top+5);
	}
}
//乒乓球移动函数
function moveBall(){
	var playgroundHeight=parseInt($("#playground").height()),
	      playgroundWidth=parseInt($("#playground").width()),
	      ball=pingpong.ball,
	      speed=pingpong.ball.speed[patternSelect.value.toLowerCase()];
	      paddleA_X=parseInt($("#paddleA").css("left"))+parseInt($("#paddleA").width()),
	      paddleA_Y_Bottom=parseInt($("#paddleA").css("top"))+parseInt($("#paddleA").height()),
	      paddleA_Y_Top=parseInt($("#paddleA").css("top")),
	      paddleB_X=parseInt($("#paddleB").css("left")),
	      paddleB_Y_Bottom=parseInt($("#paddleB").css("top"))+parseInt($("#paddleB").height()),
	      paddleB_Y_Top=parseInt($("#paddleB").css("top")),
	      ballPosX=ball.x+speed*ball.directionX,
	      ballPosY=ball.y+speed*ball.directionY;
	      //检测球台边缘
	      //检测底边
	      if(ballPosY>playgroundHeight-parseInt($("#ball").height())){
	      	ball.directionY=-1;
	      }
	      //检测顶边
	      if(ballPosY<0){
	      	ball.directionY=1;
	      }
	      //检测右边
	      if(ballPosX>playgroundWidth-parseInt($("#ball").width())){
	      	ball.directionX=-1;
	      }
	      //检测左边
	      if(ballPosX<0){
	      	ball.directionX=1;
	      }
	      ball.x+=speed*ball.directionX;
	      ball.y+=speed*ball.directionY;
	      //碰撞检测
	      //检测左边球拍
	      if(ballPosX<paddleA_X){
	      	if(ballPosY<=paddleA_Y_Bottom&&ballPosY>=paddleA_Y_Top){
	      		ball.directionX=1;
	      	}
	      }
	      //检测右边球拍
	      if(ballPosX>paddleB_X-parseInt($("#ball").width())){
	      	if(ballPosY<=paddleB_Y_Bottom&&ballPosY>=paddleB_Y_Top){
	      		ball.directionX=-1;
	      	}
	      }
	      $("#ball").css({
	      	"left":ball.x,
	      	"top":ball.y
	      });
}