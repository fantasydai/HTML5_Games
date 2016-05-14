//碰撞检测
//判断大鱼和果实距离
function momFruitCollision(){
	for(var i=0;i<fruit.num;i++){
		if(!dataObj.gameOver){
			if(fruit.alive[i]){
				//calculate length
				var l=calLength2(fruit.x[i],fruit.y[i],momFish.x,momFish.y);
				if(l<900){
					//果实 被吃掉
					fruit.dead(i);
					dataObj.fruitNum++;
					momFish.momBodyCount++;
					if(momFish.momBodyCount>7){
						momFish.momBodyCount=7;
					}
					if(fruit.fruitType[i]=="blue"){//blue
						dataObj.double=2;
					}
					wave.born(fruit.x[i],fruit.y[i],"fruit");
				}
			}
		}
	}
}
// mom baby collision
function momBabyCollision(){
	if(dataObj.fruitNum>0&&!dataObj.gameOver){
		var l=calLength2(momFish.x,momFish.y,sonFish.x,sonFish.y);
		if(l<900){
			//baby count
			sonFish.babyBodyCount=0;
			//data 归零
			momFish.momBodyCount=0;
			//更新分数
			dataObj.addScore();
			dataObj.reset();
			wave.born(sonFish.x,sonFish.y,"fish");
		}
	}
}