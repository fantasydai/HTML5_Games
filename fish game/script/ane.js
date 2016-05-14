var algaObj=function(){
	//start point,control point,end point(sin)
	this.rootX=[];
	this.headX=[];
	this.headY=[];
	this.alpha=0;//sin abgle
	this.amp=[];//摆动幅度
};
algaObj.prototype.num=50;//海藻数量
algaObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.rootX[i]=i*16+Math.random()*20;
		this.headX[i]=this.rootX[i];
		this.headY[i]=canvHeight-200+Math.random()*50;
		this.amp[i]=Math.random()*50+30;
	}
};
algaObj.prototype.draw=function(){
	this.alpha+=deltaTime*0.0009;
	var l=Math.sin(this.alpha);
	ctx2.save();
	ctx2.globalAlpha=0.6;
	ctx2.lineWidth=16;
	ctx2.lineCap="round";
	ctx2.strokeStyle="#3b154e";
	for(var i=0;i<this.num;i++){
		//beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globleApha
		ctx2.beginPath();
		ctx2.moveTo(this.rootX[i],canvHeight);
		this.headX[i]=this.rootX[i]+l*this.amp[i];
		ctx2.quadraticCurveTo(this.rootX[i],canvHeight-100,this.headX[i],this.headY[i]);
		ctx2.stroke();
	}
	ctx2.restore();
};