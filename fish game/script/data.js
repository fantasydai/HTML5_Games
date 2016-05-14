var DataObj=function(){
	this.fruitNum=0;
	this.double=1;
	this.score=0;
	this.gameOver=false;
	this.alpha=0;
};
DataObj.prototype.reset=function(){
	this.fruitNum=0;
	this.double=1;
};
DataObj.prototype.draw=function(){
	var wid=canv1.width;
	var hei=canv1.height;
	ctx1.save();
	ctx1.fillStyle="white";
	ctx1.shadowBlur=10;
	ctx1.shadowColor="#fff";
	ctx1.fillText("SCORE: "+this.score,wid*0.5,hei-20);
	if(this.gameOver){
		this.alpha+=deltaTime*0.0003;
		if(this.alpha>1){
			this.alpha=1;
		}
		ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
		ctx1.fillText("GameOver",wid*0.5,hei*0.5);
		tip.style.display="block";
	}
	ctx1.restore();
};
DataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*100*this.double;
};