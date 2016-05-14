var fruitObj=function(){
	this.alive=[];
	this.x=[];
	this.y=[];
	this.l=[];
	this.algaNo=[];
	this.speed=[];
	this.fruitType=[];
	this.orange=new Image();
	this.blue=new Image();
};
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.speed[i]=Math.random()*0.017+0.003;
		this.l[i]=0;
		this.algaNo[i]=0;
		this.fruitType[i]="";
	}
	this.orange.src="./images/fruit.png";
	this.blue.src="./images/blue.png";
};
fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		//draw
		//find an alga,grow,fly up
		if(this.alive[i]){
			var pic=new Image();
			if(this.fruitType[i]=="blue"){
				pic=this.blue;
			}else{
				pic=this.orange;
			}
			if(this.l[i]<=14){
				this.x[i]=alga.headX[this.algaNo[i]];
				this.y[i]=alga.headY[this.algaNo[i]];
				this.l[i]+=this.speed[i]*deltaTime;//果实成长
				//果实随海带摆动
				ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);

			}else{
				this.y[i]-=this.speed[i]*7*deltaTime;
				ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			}
			if(this.y[i]<10){
				this.alive[i]=false;
			}
		}

	}
};
fruitObj.prototype.born=function(i){
	this.algaNo[i]=Math.floor(Math.random()*alga.num);
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	ran<0.3?this.fruitType[i]="blue":this.fruitType[i]="orange";
};
fruitObj.prototype.update=function(){
	var num=0;
	for (var i=0;i<this.num;i++){
		if(this.alive[i]){
			num++;
		}
	}
	if(num<15){
		this.sendFruit();
		return;
	}
};
fruitObj.prototype.sendFruit=function(){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.born(i);
			return;
		}
	}
};
fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}