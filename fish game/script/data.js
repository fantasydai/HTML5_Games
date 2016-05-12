var dataObj=function(){
	this.fruitNum=0;
	this.double=1;
	this.score=0;
};
dataObj.prototype.reset=function(){
	this.fruitNum=0;
	this.double=1;
};
dataObj.prototype.draw=function(){
	var wid=canv1.width;
	var hei=canv1.height;
	ctx1.fillStyle="white";
	ctx1.fillText("score "+this.score,wid*0.5,hei-20);
};
dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*100*this.double;
}