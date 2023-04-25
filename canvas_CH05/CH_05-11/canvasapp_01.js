window.addEventListener("load", eventWindowloaded, false);
var Debugger = function () { };
Debugger.log = function (massage) {
	try {
		console.log(massage)
	} catch (exception) {
		return;
	}
}

function eventWindowloaded() {
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


		points.push({ x: ball.x, y: ball.y });
        for (var i = 0; i < points.length; i++) {
            context.drawImage(pointImage, points[i].x, points[i].y, 10, 10);
        }

		//畫球
		//這段是要判斷是否已經掉到地上，所以大於等於600(下方地板)，就不再動
		if (ball.y + ball.radius <= theCanvas.height) {
			ball.velocityy += gravity;
		} else {
			ball.velocityx = 0;
			ball.velocityy = 0;
			ball.y = theCanvas.height - ball.radius;
			
		}
		
		ball.y += ball.velocityy;
		ball.x += ball.velocityx;
		
		context.fillStyle = "#000000";
		context.beginPath();
		context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
		context.closePath();
		context.fill();

	}
	var theCanvas = document.getElementById("canvasOne");
	var context = theCanvas.getContext("2d");

	var speed = 4;

	var gravity = .1;
	var angle = 305;
	var radians = angle * Math.PI / 180;
	var radius = 15;
	var vx = Math.cos(radians) * speed; //計算的是向量在水平方向的分量,將其乘以速度，可以得到實際移動量。
	var vy = Math.sin(radians) * speed;
	var points = new Array(); //為了記錄每次移動位置

	var p1 = { x: 0, y: 150 };
	var ball = {
				x: p1.x,
				y: p1.y,
		velocityx: vx,
		velocityy: vy,
		   radius: radius
	};

	setInterval(drawScreen, 33);


}

