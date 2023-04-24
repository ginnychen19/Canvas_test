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
        //建立一顆球
        ball.x += xunits;
        ball.y += yunits;
        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(ball.x, ball.y, 15, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        if (ball.x > theCanvas.width || ball.x < 0) { //x，是否碰到了畫布的邊界
            angle = 180 - angle;
            updateBall();
        } else if (ball.y > theCanvas.height || ball.y < 0) { //y，是否碰到了畫布的邊界
            angle = 360 - angle;
            updateBall();
        }
    }
    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    function updateBall() {
        //來算公式
        radians = angle * Math.PI / 180;
        xunits = Math.cos(radians) * speed;//xunits 和 yunits 變數分別計算了每一次移動球的位置時，
        yunits = Math.sin(radians) * speed;//在 x 軸和 y 軸上所需要移動的距離。
    }
    //指定條件們
    var speed = 5;
    var p1 = { x: 0, y: 0 };
    var angle = 30;
    var radians = 0;
    var xunits = 0;//xunits 和 yunits 變數分別計算了每一次移動球的位置時，
    var yunits = 0;//在 x 軸和 y 軸上所需要移動的距離。
    var ball = { x: p1.x, y: p1.y }; //初始化點的位置
    var points = new Array(); //為了記錄每次移動位置
    updateBall();

    setInterval(drawScreen, 33);


}

