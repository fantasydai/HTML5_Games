var Dust=function(){
	this.x=[];
	this.y=[];
	this.amp=[];
	this.No=[];

	this.alpha;
};
Dust.prototype.num=30;
Dust.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=Math.random()*canvWidth;
		this.y[i]=Math.random()*canvHeight;
		this.amp[i]=20+Math.random()*25;
		this.No[i]=Math.floor(Math.random()*7);//图片序号
	}
	this.alpha=0;
};
Dust.prototype.draw=function(){
	this.alpha+=deltaTime*0.0009;
	var l=Math.sin(this.alpha);
	for(var i=0;i<this.num;i++){
		var no=this.No[i];
		ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);
	}
};