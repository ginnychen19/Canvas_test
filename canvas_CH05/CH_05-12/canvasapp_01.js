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
		//02.算出每次繪製時，兩點所剩距離
        var dx = Girl.endx - Girl.x;
		var dy = Girl.endy - Girl.y;
		//03.用每次剩餘距離 * 衰減數
		Girl.velocityx = dx * easeValue;
		Girl.velocityy = dy * easeValue;
		//04.於是每次 += 的量越來越少
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

	//01.設定衰減數
	var easeValue = .05;
	var p1 = { x: 240, y: -20 };
	var p2 = { x: 240, y: 470 };

	var Girl = {
		x: p1.x,
		y: p1.y,
		endx: p2.x,
		endy: p2.y,
		velocityx: 0,
		velocityy: 0
	};
	var points = new Array();

	setInterval(drawScreen, 33);
}

