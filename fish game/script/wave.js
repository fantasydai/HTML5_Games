var Wave=function(){
	this.x=[];
	this.y=[];
	this.alive=[];
	this.r=[];
	this.type=[];
};
Wave.prototype.num=10;
Wave.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=true;
		this.r[i]=0;
	}
};
Wave.prototype.draw=function(){
	ctx1.lineWidth=2;
	ctx1.shadowBlur=10;
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			//draw
			this.r[i]+=deltaTime*0.03;
			if(this.r[i]>40){
				this.alive[i]=false;
				break;
			}
			var alpha=1-this.r[i]/100;
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			ctx1.closePath();
			if(this.type[i]==="fruit"){
				ctx1.strokeStyle="rgba(255,255,255,"+alpha+")";
				ctx1.shadowColor="#fff";
			}else{
				ctx1.strokeStyle="rgba(203,91,0,"+alpha+")";
				ctx1.shadowColor="#CB5B00";
			}
			ctx1.stroke();
		}
	}
};
Wave.prototype.born=function(x,y,type){
	for(var i=0;i<this.num;i++){
		//born
		if(!this.alive[i]){
			this.alive[i]=true;
			this.r[i]=20;
			this.x[i]=x;
			this.y[i]=y;
			this.type[i]=type;
			return;
		}
	}
};