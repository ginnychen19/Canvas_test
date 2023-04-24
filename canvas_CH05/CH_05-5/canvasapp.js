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

    formElement = document.getElementById("canvasWidth");
    formElement.addEventListener("change", canvasWidthChanged, false);
    formElement = document.getElementById("canvasHeight");
    formElement.addEventListener("change", canvasHeightChanged, false);

    function drawScreen() {
        context.fillStyle = '#50C878'; //畫背景
        context.fillRect(0, 0, theCanvas.width, theCanvas.height); //(600 * 600)
        var sqWidth = 450;//畫方形
        var sqHeight = 450;
        context.fillStyle = '#ffffff';
        context.fillRect((theCanvas.width - sqWidth) / 2, (theCanvas.height - sqHeight) / 2, sqWidth, sqHeight); //(600 * 600)

        //建立一顆球
        context.fillStyle = "#000000";
        var ball;

        for (var i = 0; i < balls.length; i++) {
            ball = balls[i];
            ball.x += ball.xunits;
            ball.y += ball.yunits;

            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();

            if (ball.x > theCanvas.width || ball.x < 0) { //x，是否碰到了畫布的邊界
                ball.angle = 180 - ball.angle;
                updateBall(ball);
            } else if (ball.y > theCanvas.height || ball.y < 0) { //y，是否碰到了畫布的邊界
                ball.angle = 360 - ball.angle;
                updateBall(ball);
            }
        }
    }
    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    function updateBall(ball) {
        ball.radians = ball.angle * Math.PI / 180;
        ball.xunits = Math.cos(ball.radians) * ball.speed;//xunits 和 yunits 變數分別計算了每一次移動球的位置時，
        ball.yunits = Math.sin(ball.radians) * ball.speed;//在 x 軸和 y 軸上所需要移動的距離。
    }
    //指定條件們
    var numBalls = 100;
    var maxSize = 8;
    var minSize = 5;
    var maxSpeed = maxSize + 5;
    var balls = new Array(); //儲存所有球的陣列
    var tempBall;
    var tempX;
    var tempY;
    var tempSpeed; //暫存球的速度，是由亂數產生的，速度與半徑成反比
    var tempAngle;
    var tempRadius; //暫存球的半徑，是由亂數產生的
    var tempRadians; //將角度轉換成弧度制
    var tempXunits; //球在 x 軸上每次移動的距離，是由 tempSpeed 和 tempRadians 計算出來的。
    var tempYunits;

    for (var i = 0; i < numBalls; i++) {
        tempRadius = Math.floor(Math.random() * maxSize) + minSize;
        /* 看不懂oAO  P.191*/
        tempX = tempRadius * 2 + (Math.floor(Math.random() * theCanvas.width) - tempRadius * 2);
        tempY = tempRadius * 2 + (Math.floor(Math.random() * theCanvas.height) - tempRadius * 2);
        /* 
        tempRadius * 2 是為了讓球的直徑能完整地顯示在畫布中，
        (Math.floor(Math.random()*theCanvas.width)-tempRadius*2) 
        則是隨機選取一個在畫布寬度範圍內的位置，並減去 tempRadius * 2 的值，
        這樣球的邊界就不會超出畫布。

        最後再加上 tempRadius * 2，即可得到球的初始 X 座標。
        */
        tempSpeed = maxSpeed - tempRadius;
        tempAngle = Math.floor(Math.random() * 360);
        tempRadians = tempAngle * Math.PI / 180;
        tempXunits = Math.cos(tempRadians) * tempSpeed;
        tempYunits = Math.sin(tempRadians) * tempSpeed;

        tempBall = {
                 x: tempX,
                 y: tempY,
            radius: tempRadius,
             speed: tempSpeed,
             angle: tempAngle,
            xunits: tempXunits,
            yunits: tempYunits,
        }
        balls.push(tempBall);
    }
    setInterval(drawScreen, 33);

    function canvasWidthChanged(e) {
        var target = e.target;
        theCanvas.width = target.value;
        drawScreen();
    }
    function canvasHeightChanged(e) {
        var target = e.target;
        theCanvas.height = target.value;
        drawScreen();
    }


}

