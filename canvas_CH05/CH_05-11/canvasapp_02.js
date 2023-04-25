window.addEventListener("load", eventWindowloaded, false);
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
	
		// 計算下一次移動的位置
		ball.velocityy += gravity;
		ball.x += ball.velocityx;
		ball.y += ball.velocityy;
	
		// 當球觸及底部時，反彈並更新速度
		if (ball.y + ball.radius > theCanvas.height) {
		  ball.y = theCanvas.height - ball.radius;
		  ball.velocityy = -ball.velocityy * ball.elasticity;
		  ball.velocityx *= ball.elasticity;
		}
	
		// 計算前一次最高點，並更新速度和位置
		var maxHeight = p1.y;
		for (var i = 0; i < points.length; i++) {
		  if (points[i].y < maxHeight) {
			maxHeight = points[i].y;
		  }
		}
	
		// 當球觸及最高點時，反彈並更新速度
		if (ball.y - ball.radius <= maxHeight) {
		  ball.y = maxHeight + ball.radius;
		  ball.velocityy = -ball.velocityy * ball.elasticity;
		  ball.velocityx *= ball.elasticity;
		}

		//畫球
		context.fillStyle = "#000000";
		context.beginPath();
		context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
		context.closePath();
		context.fill();

	}
	
	var speed = 6;
	var gravity = 0.1;
	var elasticity = 0.5;
	var angle = 330;
	var radians = angle * Math.PI/ 180;
	var radius = 15;
	
	var vx = Math.cos(radians) * speed; //計算的是向量在水平方向的分量,將其乘以速度，可以得到實際移動量。
	var vy = Math.sin(radians) * speed;
	theCanvas = document.getElementById("canvasOne");
	context = theCanvas.getContext("2d");
	
	var p1 = { x: 0, y: 150 };
	var ball = {
		x: p1.x,
		y: p1.y,
		velocityx: vx,
		velocityy: vy,
		radius: radius,
		elasticity: elasticity,
	};
	var points = new Array(); //為了記錄每次移動位置
	
	setInterval(drawScreen, 33);


}

