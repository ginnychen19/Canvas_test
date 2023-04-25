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

// 獲取 canvas 元素並設置上下文
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 定義貝茲曲線的控制點
const p0 = { x: 50, y: 50 };
const p1 = { x: 150, y: 200 };
const p2 = { x: 250, y: 50 };

// 定義物件的初始位置
let objectPosition = { x: p0.x, y: p0.y };

// 定義 t 參數的初始值和增量
let t = 0;
const deltaT = 0.01;

// 定義計算物件位置的函數
function calculateObjectPosition() {
    objectPosition.x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
    objectPosition.y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;
}

// 定義繪製函數
function draw() {
    // 清除畫布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 繪製貝茲曲線
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    ctx.stroke();

    // 繪製物件
    ctx.beginPath();
    ctx.arc(objectPosition.x, objectPosition.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // 更新 t 參數的值
    t += deltaT;
    if (t > 1) {
        t = 0;
    }

    // 計算物件位置
    calculateObjectPosition();

    // 請求下一幀動畫
    requestAnimationFrame(draw);
}

// 開始動畫
draw();
// function canvasApp() {
// 	if (!canvasSupport()) {
// 		return;
// 	}
// 	function drawScreen() {
// 		//加入展示移動路徑的點
// 		var pointImage = new Image();
// 		pointImage.src = "../img/point.png"

// 		context.fillStyle = '#50C878'; //畫背景
// 		context.fillRect(0, 0, theCanvas.width, theCanvas.height); //(600 * 600)
// 		var sqWidth = 450;//畫方形
// 		var sqHeight = 450;
// 		context.fillStyle = '#ffffff';
// 		context.fillRect((theCanvas.width - sqWidth) / 2, (theCanvas.height - sqHeight) / 2, sqWidth, sqHeight); //(600 * 600)

// 		//畫球
// 		var t = ball.t;

// 		// var cx = 3 * (p1.x - p0.x)
// 		// var bx = 3 * (p2.x - p1.x) - cx;
// 		// var ax = p3.x - p0.x - cx - bx;
// 		var cx1 = 3 * (p1.x - p0.x);
// 		var bx1 = 3 * (p2.x - p1.x) - cx1;
// 		var ax1 = p3.x - p0.x - cx1 - bx1;
// 		var dx1 = p4.x - p0.x - cx1 - bx1 - ax1;
// 		// var cy = 3 * (p1.y - p0.y);
// 		// var by = 3 * (p2.y - p1.y) - cy;
// 		// var ay = p3.y - p0.y - cy - by;
// 		var cy1 = 3 * (p1.y - p0.y);
// 		var by1 = 3 * (p2.y - p1.y) - cy1;
// 		var ay1 = p3.y - p0.y - cy1 - by1;
// 		var dy1 = p4.y - p0.y - cy1 - by1 - ay1;

// 		// var xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
// 		// var yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;
// 		var xt = ax1 * (t * t * t * t) + bx1 * (t * t * t) + cx1 * (t * t) + dx1 * t + p0.x;
// 		var yt = ay1 * (t * t * t * t) + by1 * (t * t * t) + cy1 * (t * t) + dy1 * t + p0.y;

// 		ball.t += ball.speed;

// 		if (ball.t > 1) {
// 			ball.t = 1;
// 		}

// 		//draw the points
// 		context.font = "10px sans";

// 		context.fillStyle = "#FF0000";
// 		context.beginPath();
// 		context.arc(p0.x, p0.y, 8, 0, Math.PI * 2, true);
// 		context.closePath();
// 		context.fill();
// 		context.fillStyle = "#FFFFFF";
// 		context.fillText("0", p0.x - 2, p0.y + 2);

// 		context.fillStyle = "#FF0000";
// 		context.beginPath();
// 		context.arc(p1.x, p1.y, 8, 0, Math.PI * 2, true);
// 		context.closePath();
// 		context.fill();
// 		context.fillStyle = "#FFFFFF";
// 		context.fillText("1", p1.x - 2, p1.y + 2);

// 		context.fillStyle = "#FF0000";
// 		context.beginPath();
// 		context.arc(p2.x, p2.y, 8, 0, Math.PI * 2, true);
// 		context.closePath();
// 		context.fill();
// 		context.fillStyle = "#FFFFFF";
// 		context.fillText("2", p2.x - 2, p2.y + 2);

// 		context.fillStyle = "#FF0000";
// 		context.beginPath();
// 		context.arc(p3.x, p3.y, 8, 0, Math.PI * 2, true);
// 		context.closePath();
// 		context.fill();
// 		context.fillStyle = "#FFFFFF";
// 		context.fillText("3", p3.x - 2, p3.y + 2);

// 		context.fillStyle = "#FF0000";
// 		context.beginPath();
// 		context.arc(p4.x, p4.y, 8, 0, Math.PI * 2, true);
// 		context.closePath();
// 		context.fill();
// 		context.fillStyle = "#FFFFFF";
// 		context.fillText("3", p4.x - 2, p4.y + 2);

// 		//Draw points to illustrate path
// 		points.push({ x: xt, y: yt });
// 		for (var i = 0; i < points.length; i++) {
// 			context.drawImage(pointImage, points[i].x, points[i].y, 10, 10);
// 		}


// 		context.closePath();

// 		//Draw circle moving
// 		context.fillStyle = "#000000";
// 		context.beginPath();
// 		context.arc(xt, yt, 15, 0, Math.PI * 2, true);
// 		context.closePath();
// 		context.fill();

// 	}
// 	var theCanvas = document.getElementById("canvasOne");
// 	var context = theCanvas.getContext("2d");

// 	var p0 = { x: 60, y: 10 };
// 	var p1 = { x: 200, y: 500 };
// 	var p2 = { x: 125, y: 295 };
// 	var p3 = { x: 350, y: 350 };
// 	var p4 = { x: 550, y: 50 };
// 	var ball = { x: 0, y: 0, speed: .01, t: 0 };
// 	var points = new Array(); //為了記錄每次移動位置

// 	setInterval(drawScreen, 33);


// }

