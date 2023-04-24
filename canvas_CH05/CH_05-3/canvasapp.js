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
        if (ball.x < theCanvas.width) {
            ball.x += xunits;
            ball.y += yunits;
        } else if (ball.x = theCanvas.width) {
            ball.x = p1.x
            ball.y = p1.y
            points = new Array();
        }
        
        points.push({ x: ball.x, y: ball.y });
        for (var i = 0; i < points.length; i++) {
            context.drawImage(pointImage, points[i].x, points[i].y, 10, 10);
        }


        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(ball.x, ball.y, 15, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

    }
    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    var speed = 5;
    //指定移動點的位置
    var p1 = { x: 0, y: 0 };
    var angle = 30;
    //來算公式
    var radians = angle * Math.PI / 180;
    var xunits = Math.cos(radians) * speed;//xunits 和 yunits 變數分別計算了每一次移動球的位置時，
    var yunits = Math.sin(radians) * speed;//在 x 軸和 y 軸上所需要移動的距離。
    var ball = { x: p1.x, y: p1.y }; //初始化點的位置
    var points = new Array(); //為了記錄每次移動位置

    setInterval(drawScreen, 33);


}

