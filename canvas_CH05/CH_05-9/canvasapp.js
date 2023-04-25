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
        for (var i = 0; i < points.length; i++) {
            context.drawImage(pointImage, points[i].x, points[i].y, 10, 10);
        }
        
        ball.x = circle.centerX + Math.cos(circle.angle) * circle.radius;
        ball.y = circle.centerY + Math.sin(circle.angle) * circle.radius;

        circle.angle += ball.speed;
        circle.radius += circle.radiusInc; //增加這邊就可以了
        
        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(ball.x, ball.y, 15, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

    }
    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    var circle = {
        radius: 2,
        angle: 0,
        centerX: theCanvas.width / 2,
        centerY: theCanvas.height / 2,
        radiusInc: 1, //加上每次要加入的級數
    }
    var ball = {
        x: 0,
        y: 0,
        speed: .1
    };
    var points = new Array(); //為了記錄每次移動位置

    setInterval(drawScreen, 33);


}

