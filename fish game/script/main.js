var canv1,
      canv2,
      ctx1,
      ctx2,
      lastTime,//上一帧执行时间
      daltaTime,//两帧间隔时间差
      bgPic=new Image(),
      canvWidth,
      canvHeight,
      alga,
      fruit,
      momFish,
      sonFish,
      mx,
      my,
      dataObj,
      wave,
      dust,//漂浮物
      dustPic=[],
      babyTail=[],
      babyEye=[],
      babyBody=[],
      momTail=[],
      momEye=[],
      momBodyOra=[],
      momBodyBlue=[],
      tip=document.getElementById("tip"),
      restart=document.getElementById("restart"),
      moreGame=document.getElementById("moreGames");
function runGame(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();

}
function init(){
	//获得 canvas context
	canv1=document.getElementById("canvas1");//fished dust UI
	canv2=document.getElementById("canvas2");//background
	ctx1=canv1.getContext("2d");
	ctx2=canv2.getContext("2d");
	canv1.addEventListener("mousemove",mouseMove,false);
	bgPic.src="./images/background.jpg"

	canvWidth=canv1.width;
	canvHeight=canv1.height;

	alga=new algaObj();
	alga.init();
	fruit=new fruitObj();
	fruit.init();
	momFish=new MomFish();
	momFish.init();
	sonFish=new SonFish();
	sonFish.init();
	dataObj=new DataObj();

	wave=new Wave();
	wave.init();

	dust=new Dust();
	dust.init();
	mx=canvWidth*0.5;
	my=canvHeight*0.5;
	//设置画布中分数字体和位置
	ctx1.font="30px Verdana";
	ctx1.textAlign="center";
	//dustPic遍历
	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="./images/dust"+i+".png";
	}
	for(var i=0;i<8;i++){
		babyTail[i]=new Image();
		momTail[i]=new Image();
		babyTail[i].src="./images/babyTail"+i+".png";
		momTail[i].src="./images/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		momEye[i]=new Image();
		babyEye[i].src="./images/bigEye"+i+".png";
		momEye[i].src="./images/bigEye"+i+".png";
	}
	for(var i=0;i<20;i++){
		babyBody[i]=new Image();
		babyBody[i].src="./images/babyFade"+i+".png";
	}
	for(var i=0;i<8;i++){
		momBodyBlue[i]=new Image();
		momBodyOra[i]=new Image();
		momBodyBlue[i].src="./images/bigSwimBlue"+i+".png";
		momBodyOra[i].src="./images/bigSwim"+i+".png";
	}
}
function gameloop(){
	window.requestAnimFrame(gameloop);
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>50){
		deltaTime=50;
	}
	drawBackground();
	alga.draw();
	fruit.update();
	fruit.draw();
	ctx1.clearRect(0,0,canvWidth,canvHeight);
	momFish.draw();
	momFruitCollision();
	momBabyCollision();
	sonFish.draw();
	dataObj.draw();
	wave.draw();
	dust.draw();
}
function mouseMove(e){
	if(!dataObj.gameOver){
		if(e.offsetX||e.layerX){
			mx=e.offsetX==undefined?e.layerX:e.offsetX;
			my=e.offsetY==undefined?e.layerY:e.offsetY;
		}
	}
}
restart.addEventListener("click",function(){
	tip.style.display="none";
	runGame();
},false);
moreGame.addEventListener("click",function)
runGame();