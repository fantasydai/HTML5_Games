var SonFish=function(){
	this.x;
	this.y;
	this.angle;
	this.babyBody=new Image();

	this.babyTailTimer=0;
	this.babyTailCount=0;

	this.babyEyeTimer=0;
	this.babyEyeCount=0;
	this.babyEyeInterval=1000;

	this.babyBodyTimer=0;
	this.babyBodyCount=0;
};
SonFish.prototype.init=function(){
	this.x=canvWidth*0.5-50;
	this.y=canvHeight*0.5+50;
	this.angle=0;
	this.babyBody.src="./images/babyFade0.png";
};
SonFish.prototype.draw=function(){
	//lerp x,y
	this.x=lerpDistance(momFish.x,this.x,0.98);
	this.y=lerpDistance(momFish.y,this.y,0.98);
	//lerpAngle
	var deltaY=momFish.y-this.y;
	var deltaX=momFish.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	//lerp angle**********
	this.angle=lerpAngle(beta,this.angle,0.6);
	//baby tail count
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount=(this.babyTailCount+1)%8;
		this.babyTailTimer%=50;
	}

	//baby eye count
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;

		if(this.babyEyeCount==0){
			this.babyEyeInterval=Math.random()*1500+2000;
		}else{
			this.babyEyeInterval=200;
		}
	}
	//baby body count
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount=this.babyBodyCount+1;
		this.babyBodyTimer%=300;
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;
			//game over
			dataObj.gameOver=true;
		}
	}
	//ctx1
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(babyTail[this.babyTailCount] ,-babyTail[this.babyTailCount].width*0.5+23,-babyTail[this.babyTailCount].height*0.5);
	ctx1.drawImage(babyBody[this.babyBodyCount] ,-babyBody[this.babyBodyCount].width*0.5,-babyBody[this.babyBodyCount].height*0.5);
	ctx1.drawImage(babyEye[this.babyEyeCount] ,-babyEye[this.babyEyeCount].width*0.5,-babyEye[this.babyEyeCount].height*0.5);
	ctx1.restore();
};
