var algaObj=function(){
	this.x=[];
	this.len=[];
};
algaObj.prototype.num=50;//海藻数量
algaObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=i*16+Math.random()*20;
		this.len[i]=200+Math.random()*50;
	}
};
algaObj.prototype.draw=function(){
	ctx2.save();
	ctx2.globalAlpha=0.6;
	ctx2.lineWidth=16;
	ctx2.lineCap="round";
	ctx2.strokeStyle="#3b154e";
	for(var i=0;i<this.num;i++){
		//beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globleApha
		ctx2.beginPath();
		ctx2.moveTo(this.x[i],canvHeight);
		ctx2.lineTo(this.x[i],canvHeight-this.len[i]);
		ctx2.stroke();
	}
	ctx2.restore();
};