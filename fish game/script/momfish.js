var momFish=function(){
	this.x;
	this.y;
	this.angle;
	this.bigBody=new Image();

	this.momTailTimer=0;
	this.momTailCount=0;

	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;

	this.momBodyCount=0;
};
momFish.prototype.init=function(){
	this.x=canvWidth*0.5;
	this.y=canvHeight*0.5;
	this.angle=0;
	this.bigBody.src="./images/bigSwim0.png";
};
momFish.prototype.draw=function(){
	//lerpx,y
	this.x=lerpDistance(mx,this.x,0.95);
	this.y=lerpDistance(my,this.y,0.95);

	//delta angle********
	//Math.atan2(x,y)
	var deltaY=my-this.y;
	var deltaX=mx-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	//lerp angle**********
	this.angle=lerpAngle(beta,this.angle,0.6);

	//tail count
	this.momTailTimer+=deltaTime;
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8;
		this.momTailTimer%=50;
	}
	// eye count
	this.momEyeTimer+=deltaTime;
	if(this.momEyeTimer>this.momEyeInterval){
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer%=this.momEyeInterval;
		if(this.momEyeCount==0){
			this.babyEyeInterval=Math.random()*1500+2000;
		}else{
			this.babyEyeInterval=200;
		}

	}
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(momTail[this.momTailCount],-momTail[this.momTailCount].width*0.5+30,-momTail[this.momTailCount].height*0.5);
	if(dataObj.double==1){//判断吃到的是蓝色还是橙色
		ctx1.drawImage(momBodyOra[this.momBodyCount],-momBodyOra[this.momBodyCount].width*0.5,-momBodyOra[this.momBodyCount].height*0.5);
	}else{
		ctx1.drawImage(momBodyBlue[this.momBodyCount],-momBodyBlue[this.momBodyCount].width*0.5,-momBodyBlue[this.momBodyCount].height*0.5);
	}
	
	ctx1.drawImage(momEye[this.momEyeCount],-momEye[this.momEyeCount].width*0.5,-momEye[this.momEyeCount].height*0.5);
	ctx1.restore();
};