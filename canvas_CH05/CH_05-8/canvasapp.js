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

        //建立一顆球

        points.push({ x: ball.x, y: ball.y });
        var circleRounds = Math.floor(circle.angle / (2 * Math.PI)); //已旋转的圈数
        for (var i = 0; i < points.length; i++) {
            if (circleRounds % 2 === 1) { //奇数圈绘制
                context.drawImage(pointImage, points[i].x, points[i].y, 10, 10);

            } else { //偶数圈擦除 -->目前因該是因為減少點的同時會影響到生成的位置，可能要看如何取得位置資訊
                context.drawImage(pointImage, points[i].x, points[i].y, 10, 10);
                points.shift(); //刪除陣列中第一個元素

            }
        }
        
        /*
        具體來說，球的位置可以用下列公式計算：
        x = cx + r * cos(a)  cx 和 cy 是圓心的 x 和 y 座標
        y = cy + r * sin(a)  r 是球與圓心的距離（也就是半徑），而 a 是球的角度，以弧度為單位。
    
        cos() 和 sin() 函數會回傳給定角度的餘弦值和正弦值，這樣球的位置就可以得到了。
         */
        ball.x = circle.centerX + Math.cos(circle.angle) * circle.radius;
        ball.y = circle.centerY + Math.sin(circle.angle) * circle.radius;

        circle.angle += ball.speed;

        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(ball.x, ball.y, 15, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

    }
    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    var radius = 125;
    var circle = {
        radius: 125,
        angle: 0,
        centerX: theCanvas.width / 2,
        centerY: theCanvas.height / 2,
    }
    var ball = {
        x: 0,
        y: 0,
        speed: .1
    };
    var points = new Array(); //為了記錄每次移動位置

    setInterval(drawScreen, 33);


}

