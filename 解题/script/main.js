var untangleGame={
	circles: [],
	thinLineThickness:1,
	boldLineThickness:5,
	lines:[],
	currentLevel:0,
	levels:[
		{
			"level":0,
			"circles":[
				{"x":400,"y":156},
				{"x":381,"y":241},
				{"x":84,"y":233},
				{"x":88,"y":73},
			],
			"relationship":{
				"0":{connectedPoints:[1,2]},
				"1":{connectedPoints:[0,3]},
				"2":{connectedPoints:[0,3]},
				"3":{connectedPoints:[1,2]},
			}
		},
		{
			"level":1,
			"circles":[
				{"x":401,"y":73},
				{"x":400,"y":240},
				{"x":88,"y":241},
				{"x":84,"y":72},
			],
			"relationship":{
				"0":{connectedPoints:[1,2,3]},
				"1":{connectedPoints:[0,2,3]},
				"2":{connectedPoints:[0,1,3]},
				"3":{connectedPoints:[0,1,2]},
			}
		},
		{
			"level":2,
			"circles":[
				{"x":92,"y":85},
				{"x":253,"y":13},
				{"x":393,"y":86},
				{"x":390,"y":214},
				{"x":248,"y":275},
				{"x":95,"y":216}
			],
			"relationship":{
				"0":{connectedPoints:[2,3,4]},
				"1":{connectedPoints:[3,5]},
				"2":{connectedPoints:[0,4,5]},
				"3":{connectedPoints:[0,1,5]},
				"4":{connectedPoints:[0,2]},
				"5":{connectedPoints:[1,2,3]},
			}
		},
		{
			"level":3,
			"circles":[
				{"x":92,"y":85},
				{"x":253,"y":13},
				{"x":393,"y":86},
				{"x":390,"y":214},
				{"x":248,"y":275},
				{"x":95,"y":216},
				{"x":240,"y":105}
			],
			"relationship":{
				"0":{connectedPoints:[2,3,4]},
				"1":{connectedPoints:[3,5]},
				"2":{connectedPoints:[0,4,5]},
				"3":{connectedPoints:[0,1,5]},
				"4":{connectedPoints:[0,2]},
				"5":{connectedPoints:[1,2,3]},
				"6":{connectedPoints:[0,1,3,4]}
			}
		},
		{
			"level":4,
			"circles":[
				{"x":92,"y":85},
				{"x":253,"y":13},
				{"x":393,"y":86},
				{"x":390,"y":214},
				{"x":248,"y":275},
				{"x":95,"y":216},
				{"x":240,"y":105},
			],
			"relationship":{
				"0":{connectedPoints:[2,3,4]},
				"1":{connectedPoints:[1,3,5]},
				"2":{connectedPoints:[0,4,5]},
				"3":{connectedPoints:[0,1,5]},
				"4":{connectedPoints:[0,2,4]},
				"5":{connectedPoints:[1,2,3]},
				"6":{connectedPoints:[0,1,3,4]}
			}
		},
		{
			"level":5,
			"circles":[
				{"x":92,"y":85},
				{"x":253,"y":13},
				{"x":393,"y":86},
				{"x":390,"y":214},
				{"x":248,"y":275},
				{"x":95,"y":216},
				{"x":120,"y":260},
				{"x":368,"y":260}
			],
			"relationship":{
				"0":{connectedPoints:[2,3,4]},
				"1":{connectedPoints:[1,3,5]},
				"2":{connectedPoints:[0,4,5]},
				"3":{connectedPoints:[0,1,5]},
				"4":{connectedPoints:[0,2,4]},
				"5":{connectedPoints:[1,2,3]},
				"6":{connectedPoints:[0,1,2]},
				"7":{connectedPoints:[0,1,5]}
			}
		}
	]
};
//保存圆的信息函数
function Circle (x,y,radius ){
	this.x=x;
	 this.y=y;
	 this.radius=radius;
}
///保存线的信息函数
function Line (startPoint,endPoint,thickness){
	this.startPoint=startPoint;
	this.endPoint=endPoint;
	this.thickness=thickness;
}
//绘制圆函数
function drawCircle (ctx,x,y,radius){
	ctx.fillStyle="rgba(200,200,100,.9)";
	ctx.beginPath();
	ctx.arc(x,y,radius,0,Math.PI*2,true);
	ctx.closePath();
	ctx.fill();
}
//绘制线函数
function drawLine (ctx,x1,y1,x2,y2,thickness){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineWidth=thickness;
	ctx.strokeStyle="#cfc";
	ctx.stroke();
}
//清除画布
function clear (ctx,canvas){
	ctx.clearRect(0,0,canvas.width,canvas.height);
}
//为每个圆分配连接线的函数
function connectCircles (){
	//根据圆的关卡数据设置所有连接线
	var level=untangleGame.levels[untangleGame.currentLevel];
	untangleGame.lines.length=0;
	for( var i in level.relationship){
		var connectedPoints=level.relationship[i].connectedPoints;
		var startPoint=untangleGame.circles[i];
		for(var j in connectedPoints){
			var endPoint=untangleGame.circles[connectedPoints[j]];
			untangleGame.lines.push(new Line(startPoint,endPoint,untangleGame.thinLineThickness))
		}
	}
}
//判断线是否相交函数
function isIntersect (line1,line2){
	//转换line1、line2成一般式：Ax+By=C
	var a1=line1.endPoint.y-line1.startPoint.y,
	      b1=line1.startPoint.x-line1.endPoint.x,
	      c1=a1*line1.startPoint.x+b1*line1.startPoint.y;
	var a2=line2.endPoint.y-line2.startPoint.y,
	      b2=line2.startPoint.x-line2.endPoint.x,
	      c2=a2*line2.startPoint.x+b2*line2.startPoint.y;
	//计算交点
	var d=a1*b2-a2*b1;
	//当d等于0时，两线平行
	if(d==0){
		return false;
	}else {
		var x=(b2*c1-b1*c2) / d,
		      y=(a1*c2-a2*c1) / d;
		//检测截点是否在两条线段之上
		if((isInBetween(line1.startPoint.x,x,line1.endPoint.x)||
		  isInBetween(line1.startPoint.y,y,line1.endPoint.y))&&
	 	 (isInBetween(line2.startPoint.x,x,line2.endPoint.x)||
	 	 isInBetween(line2.startPoint.y,y,line2.endPoint.y))){
			return true;
		}
	}
	return false;
}
//如果b在a与c之间返回true
//当a==b或b==c时排除结果，返回false
function isInBetween (a,b,c){
	//如果b几乎等于a或c返回false
	//为避免浮点预算时两值几乎相等
	if(Math.abs(a-b)<0.000001||Math.abs(b-c)<0.000001){
		return false;
	}
	//如果b在a与c之间返回true
	return (a<b&&b<c)||(c<b&&b<a);
}
//检测线是否相交
function updateLineIntersection () {
	//检测相交的线，并加粗这些线
	for(var i=0;i<untangleGame.lines.length;i++){
		for(var j=0;j<i;j++){
			var line1=untangleGame.lines[i];
			var line2=untangleGame.lines[j];
			//如果检测到如果两条线相交，将加粗该线
			if(isIntersect(line1,line2)){
				line1.thickness=untangleGame.boldLineThickness;
				line2.thickness=untangleGame.boldLineThickness;
			}
		}
	}
}
//设置关卡函数
function setupCurrentLevel () {
	untangleGame.circles=[];
	var level=untangleGame.levels[untangleGame.currentLevel];
	for(var i=0;i<level.circles.length;i++){
		untangleGame.circles.push(new Circle(level.circles[i].x,level.circles[i].y,10));
	}
	//设置圆后再设置连接数据
	connectCircles();
	updateLineIntersection();
}
//更新游戏进度
function updateLevelProgess (){
	var progress =0;
	for(var i=0;i<untangleGame.lines.length;i++){
		if(untangleGame.lines[i].thickness== untangleGame.thinLineThickness){
			progress++;
		}
	}
	var progressPercentage=Math.floor(progress/untangleGame.lines.length*100);
	$("#progress").html(progressPercentage);
	//显示当前关卡
	$("#level").html(untangleGame.currentLevel);
}
//检测是否通关
function checkLevelCompleteness (){
	if($("#progress").html()=="100"){
		if(untangleGame.currentLevel+1<untangleGame.levels.length){
			untangleGame.currentLevel++;
			setupCurrentLevel();
		}
	}
}
//游戏主循环
function gameLoop(){
	var canvas=$("#game")[0];
	var ctx=canvas.getContext("2d");
	//重绘前清空
	clear(ctx,canvas);
	//绘制所有保存的线
	for(var i = 0;i<untangleGame.lines.length;i++){
		var line=untangleGame.lines[i];
		var startPoint=line.startPoint;
		var endPoint=line.endPoint;
		var thickness=line.thickness;
		drawLine(ctx,startPoint.x,startPoint.y,endPoint.x,endPoint.y,thickness);
	}
	//绘制所有保存的圆
	for(var i=0;i<untangleGame.circles.length;i++){
		var circle=untangleGame.circles[i];
		drawCircle(ctx,circle.x,circle.y,circle.radius);
	}
}
//游戏初始渲染
$(function(){
	var canvas=$("#game")[0];
	var ctx=canvas.getContext("2d");
	var circleRadius=10;
	var width=canvas.width;
	var height=canvas.height;
	setupCurrentLevel();
	connectCircles();
	updateLineIntersection ();
	//给Canvas添加鼠标事件监听器
	//检查按下鼠标的位置是否在任何一个圆上
	//并设置那个圆为拖曳目标小球
	$("#game").mousedown(function(e){
		var canvasPosition=$(this).offset();
		var mouseX=(e.pageX-canvasPosition.left)||0;
		var mouseY=(e.pageY-canvasPosition.top)||0;

		for(var i = 0;i<untangleGame.circles.length;i++){
			var circleX=untangleGame.circles[i].x;
			var circleY=untangleGame.circles[i].y;
			var radius=untangleGame.circles[i].radius;
			if(Math.pow(mouseX-circleX,2)+Math.pow(mouseY-circleY,2)< Math.pow(radius,2)){
				untangleGame.targetCircle=i;
				break;
			}
		}
	});
	//当鼠标移动时，移动拖曳目标小球
	$("#game").mousemove(function(e){
		if (untangleGame.targetCircle!=undefined){
			var canvasPosition=$(this).offset();
			var mouseX=(e.pageX-canvasPosition.left)||0;
			var mouseY=(e.pageY-canvasPosition.top)||0;
			var radius=untangleGame.circles[untangleGame.targetCircle].radius;
			untangleGame.circles[untangleGame.targetCircle]=new Circle(mouseX,mouseY,radius);
		}
	connectCircles();
	updateLineIntersection ();
	updateLevelProgess();
	});
	$("#game").mouseup(function(e){
		untangleGame.targetCircle=undefined;
		//每次放开鼠标，检测是否过关
		checkLevelCompleteness();
	});

	//设置游戏主循环时间间隔
	setInterval(gameLoop,30);
});