var matchingGame={};
matchingGame.deckEasy=[
	'cardAK','cardAK',
	'cardAQ','cardAQ',
	'cardAJ','cardAJ',
	'cardBK','cardBK',
	'cardBQ','cardBQ',
	'cardBJ','cardBJ',
];
matchingGame.deckNormal=[
	'cardAK','cardAK',
	'cardAQ','cardAQ',
	'cardAJ','cardAJ',
	'cardATen','cardATen',
	'cardBK','cardBK',
	'cardBQ','cardBQ',
	'cardBJ','cardBJ',
	'cardBTen','cardBTen',
	'cardCK','cardCK',
];
matchingGame.deckHard=[
	'cardAK','cardAK',
	'cardAQ','cardAQ',
	'cardAJ','cardAJ',
	'cardATen','cardATen',
	'cardBK','cardBK',
	'cardBQ','cardBQ',
	'cardBJ','cardBJ',
	'cardBTen','cardBTen',
	'cardCK','cardCK',
	'cardCQ','cardCQ',
	'cardCJ','cardCJ',
	'cardCTen','cardCTen',
];
$(function(){
	runGame(matchingGame.deckEasy);
});
$("#pattern").change(function(){
	var patternValue=$(this).val();
	init();
	if(patternValue=="Easy"){
		$("#game").width("500px");
		$("#cards").width("380px");
		runGame(matchingGame.deckEasy);
	}else if(patternValue=="Normal"){
		$("#game").width("700px");
		$("#cards").width("580px");
		runGame(matchingGame.deckNormal);
	}else{
		$("#game").width("900px");
		$("#cards").width("780px");
		runGame(matchingGame.deckHard);
	}
});
function runGame(cards){
	matchingGame.startTime=Date.parse(new Date());
	cards.sort(shuffle);
	//赋值12章牌
	var perLineNum=cards.length/3;
	for (var i = 0; i < cards.length-1; i++) {
		$(".card:first-child").clone().appendTo("#cards");
	}
	//初始化每张纸牌的位置
	var patternTemp=cards.slice();
	$("#cards").children().each(function(index){
		//以4*3形式对齐纸牌
		$(this).css({"left":($(this).width()+20)*(index%perLineNum),"top":($(this).height()+20)*Math.floor(index/perLineNum)+40
		});
		//从已洗过的纸牌中获取图案
		var pattern = patternTemp.pop();
		//应用纸牌的背面图案，并让其可见
		$(this).find(".back").addClass(pattern);
		//把DOM数据嵌入DOM元素中
		$(this).attr("data-pattern",pattern);
		//监听每张牌DIV点击事件
		$(this).click(selectCard);
		});

}
function init(){
	$(".card:not(:first)").remove();
	$(".card").removeAttr("data-pattern");
	$(".card").find(".back").removeClass().addClass("face back");
}
function shuffle () {
	return 0.5-Math.random();
}

function selectCard () {
	//如果已经翻开了两张牌
	if($(".card-flipped").size()>1){
		return;
	}
	$(this).addClass("card-flipped");
	//0.7秒后，检测两张已翻开的牌的图案
	if($(".card-flipped").size()==2){
		setTimeout(checkPattern,700);
		setTimeout(checkEnd,1100);
	}
}

function checkPattern () {
	if(isMatchPattern()){
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
		$(".card-removed").bind("webkitTransitionEnd",removeTookCards);
	}else{
		$(".card-flipped").removeClass("card-flipped");
	}
}
//检测是否结束
function checkEnd () {
	var cards=$(".card");
	if(cards.length==0){
		matchingGame.endTime=Date.parse(new Date());
		var useTime=matchingGame.endTime-matchingGame.startTime;
		alert("You Win!用时："+Math.floor(useTime/(1000*60))+"分"+((useTime/1000)%60)+"秒");
	}
}
//图像检测函数
function isMatchPattern () {
	var cards=$(".card-flipped");
	var pattern=$(cards[0]).data("pattern");
	var anotherPattern=$(cards[1]).data("pattern");
	return (pattern===anotherPattern);
}
//已配对纸牌淡出函数
function removeTookCards () {
	$(".card-removed").remove();
}