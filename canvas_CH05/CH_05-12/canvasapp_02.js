window.addEventListener("load", eventWindowLoaded, false);
var Debugger = function () { };
Debugger.log = function (massage) {
	try {
		console.log(massage)
	} catch (exception) {
		return;
	}
}

function eventWindowLoaded() {
	myGirl = new Image();
	myGirl.src = "../img/Walk_(1).png";
	myGirl.width = 120;
	myGirl.height = 120;
	myGirl.onload = eventAssetsLoaded;
}

function eventAssetsLoaded() {

	canvasApp();
}
function canvasSupport() {
	return Modernizr.canvas;
}


function canvasApp() {
	if (!canvasSupport()) {
		return;
	}
	function drawScreen() {
		//加入展示移動路徑的點
		var pointImage = new Image();
		pointImage.src = "../img/point.png"

		context.fillStyle = '#50C878'; //畫背景
		context.fillRect(0, 0, theCanvas.width, theCanvas.height); //(600 * 600)
		var sqWidth = 450;//畫方形
		var sqHeight = 450;
		context.fillStyle = '#ffffff';
		context.fillRect((theCanvas.width - sqWidth) / 2, (theCanvas.height - sqHeight) / 2, sqWidth, sqHeight); //(600 * 600)
        
		//從這裡開始		
		//直接讓每次 += 的量 +上(當下原動量 * 增加值)
		Girl.velocityx = Girl.velocityx + ( Girl.velocityx*easeValue);
		Girl.velocityy = Girl.velocityy + ( Girl.velocityy*easeValue);
		
		Girl.x += Girl.velocityx;
		Girl.y += Girl.velocityy;
		
		
		//Draw points to illustrate path
		
		points.push({x:Girl.x,y:Girl.y});
		for (var i= 0; i< points.length; i++) {
			context.drawImage(pointImage, (points[i].x + myGirl.width/2) , (points[i].y + myGirl.height/2 ),10,10);
		}
		
		context.drawImage(myGirl,Girl.x,Girl.y,myGirl.width,myGirl.height);
	}
	var theCanvas = document.getElementById("canvasOne");
	var context = theCanvas.getContext("2d");

	var easeValue = .05;
	var p1 = {x:240,y:470};

	var tempSpeed = .5;
	var tempAngle = 270 ;
	var tempRadians = tempAngle * Math.PI/ 180;//算出弧長
	var tempvelocityx = Math.cos(tempRadians) * tempSpeed;
	var tempvelocityy  = Math.sin(tempRadians) * tempSpeed;

	var Girl = {
		x: p1.x,
		y: p1.y,
		velocityx: tempvelocityx,
		velocityy: tempvelocityy
	};
	var points = new Array();

	setInterval(drawScreen, 33);
}