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


        update();
        testWalls();
        collide();
        render();
    }
    // drawScreen()步驟拆分
    function update() {
        for (var i = 0; i < balls.length; i++) {
            ball = balls[i];

            //加入摩擦
            //這樣做的原因是因為，才不會導致速度比率失衡
            ball.velocityx = ball.velocityx - (ball.velocityx * friction);
            ball.velocityy = ball.velocityy - (ball.velocityy * friction);

            ball.nextx = (ball.x += ball.velocityx); // velocityx每秒要多跑多少
            ball.nexty = (ball.y += ball.velocityy);
        }
    }

    function testWalls() {
        var ball;
        var testBall;

        for (var i = 0; i < balls.length; i++) {
            ball = balls[i];//我們使用了 balls 這個全域變數，存儲了所有球。

            if (ball.nextx + ball.radius > theCanvas.width) {
                //撞到了右邊的邊界
                ball.velocityx = ball.velocityx * - 1;
                ball.nextx = theCanvas.width - ball.radius;

            } else if (ball.nextx - ball.radius < 0) { 
                //撞到了左邊的邊界
                ball.velocityx = ball.velocityx * - 1;
                ball.nextx = ball.radius;

            } else if (ball.nexty + ball.radius > theCanvas.height) {
                //撞到了下邊的邊界
                ball.velocityy = ball.velocityy * - 1;
                ball.nexty = theCanvas.height - ball.radius;

            } else if (ball.nexty - ball.radius < 0) {
                //表示撞到了上邊的邊界
                ball.velocityy = ball.velocityy * - 1;
                ball.nexty = ball.radius;
            }
        }
    }

    function collide() {
        var ball;
        var testBall;
        for (var i = 0; i < balls.length; i++) {
            ball = balls[i];
            for (var j = i + 1; j < balls.length; j++) {
                testBall = balls[j];
                if (hitTestCircle(ball, testBall)) {
                    collideBalls(ball, testBall);
                }
            }
        }
    }

    function render() {
        var ball;
        context.fillStyle = "#000000";
        for (var i = 0; i < balls.length; i++) {
            ball = balls[i];
            ball.x = ball.nextx;
            ball.y = ball.nexty;

            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        }
    }

    // hitTestCircle 兩個圓之間的碰撞計算
    function hitTestCircle(ball1, ball2) {
        var retval = false; //預設未相交
        var dx = ball1.nextx - ball2.nextx;
        var dy = ball1.nexty - ball2.nexty;
        var distance = Math.sqrt(dx * dx + dy * dy); //我们得到了两点之间碰到時的最小距离量
        //檢查重疊
        //球1的半徑+球2的半徑 <= 最小距離量的話，retval = true(表示已相交)
        if (distance <= ball1.radius + ball2.radius) {
            retval = true;
        }
        return retval;
    }

    function collideBalls(ball1, ball2) {

        var dx = ball1.nextx - ball2.nextx; //計算2點x差多少
        var dy = ball1.nexty - ball2.nexty; //計算2點y差多少

        var collisionAngle = Math.atan2(dy, dx); //計算兩個球體之間的角度
        
        //接下來，計算每個球體的【初始】速度
        var speed1 = Math.sqrt(ball1.velocityx * ball1.velocityx +
            ball1.velocityy * ball1.velocityy);
        var speed2 = Math.sqrt(ball2.velocityx * ball2.velocityx +
            ball2.velocityy * ball2.velocityy);       
        //計算速度向量的【初始】方向角度
        var direction1 = Math.atan2(ball1.velocityy, ball1.velocityx);
        var direction2 = Math.atan2(ball2.velocityy, ball2.velocityx);

        //計算碰撞後的最終速度和方向
        //使用動量守恆和能量守恆的定律
        var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
        var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
        var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
        var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);
        /*这里，我们使用了三角函数来计算小球1和小球2在碰撞点的速度分量。
          在collisionAngle的方向上，速度大小是speed1或speed2，
          根据direction1或direction2的方向旋转。
          这将导致小球1和小球2在碰撞点的速度方向垂直于collisionAngle。*/

        //计算碰撞后的最终速度，它们基于小球1和小球2的速度和质量
        var final_velocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 +
            (ball2.mass + ball2.mass) * velocityx_2) / (ball1.mass + ball2.mass);
        var final_velocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 +
            (ball2.mass - ball1.mass) * velocityx_2) / (ball1.mass + ball2.mass);

        var final_velocityy_1 = velocityy_1;
        var final_velocityy_2 = velocityy_2;

        /*我们将最终速度分解为x和y分量，并使用三角函数计算新的速度向量，
          更新每个小球的速度和位置*/
        ball1.velocityx = Math.cos(collisionAngle) * final_velocityx_1 +
            Math.cos(collisionAngle + Math.PI / 2) * final_velocityy_1;
        ball1.velocityy = Math.sin(collisionAngle) * final_velocityx_1 +
            Math.sin(collisionAngle + Math.PI / 2) * final_velocityy_1;
        ball2.velocityx = Math.cos(collisionAngle) * final_velocityx_2 +
            Math.cos(collisionAngle + Math.PI / 2) * final_velocityy_2;
        ball2.velocityy = Math.sin(collisionAngle) * final_velocityx_2 +
            Math.sin(collisionAngle + Math.PI / 2) * final_velocityy_2;
        
        //我们将计算出的速度应用于小球的nextx和nexty位置变量，以便在下一帧中更新小球的位置
        ball1.nextx = (ball1.nextx += ball1.velocityx);
        ball1.nexty = (ball1.nexty += ball1.velocityy);
        ball2.nextx = (ball2.nextx += ball2.velocityx);
        ball2.nexty = (ball2.nexty += ball2.velocityy);
    }
    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    //指定條件們
    var numBalls = 200;
    var maxSize = 15;
    var minSize = 5;
    var maxSpeed = maxSize + 5;
    var friction = .01;
    var balls = new Array(); //儲存所有球的陣列
    var tempBall;
    var tempX;
    var tempY;
    var tempSpeed; //暫存球的速度，是由亂數產生的，速度與半徑成反比
    var tempAngle;
    var tempRadius; //暫存球的半徑，是由亂數產生的
    var tempRadians; //將角度轉換成弧度制
    var tempvelocityx; //小球在x轴和y轴上的速度分量
    var tempvelocityy;

    for (var i = 0; i < numBalls; i++) {
        tempRadius = Math.floor(Math.random() * maxSize) + minSize;
        var placeOK = false;
        while (!placeOK) {
            tempX = tempRadius * 3 + (Math.floor(Math.random() * theCanvas.width) - tempRadius * 3);
            tempY = tempRadius * 3 + (Math.floor(Math.random() * theCanvas.height) - tempRadius * 3);
            tempSpeed = 4;
            tempAngle = Math.floor(Math.random() * 360);
            tempRadians = tempAngle * Math.PI / 180;
            tempvelocityx = Math.cos(tempRadians) * tempSpeed;
            tempvelocityy = Math.sin(tempRadians) * tempSpeed;

            tempBall = {
                x: tempX,
                y: tempY,
                nextX: tempX,
                nextY: tempY,
                radius: tempRadius,
                speed: tempSpeed,
                angle: tempAngle,
                velocityx: tempvelocityx,
                velocityy: tempvelocityy,
                mass: tempRadius
            };
            placeOK = canStartHere(tempBall);
        }
        balls.push(tempBall);
    }
    function canStartHere(ball) {
        //表示当前的球是否可以放置在画布上
        var retval = true;
        for (var i = 0; i < balls.length; i++) {
            //表示檢測對象是某顆球，然後這個某顆球去跟每顆畫布上的球去比較一次
            //因為hitTestCircle()是ture表示已相交，所以這裡的retval就設定不能放到畫布中。
            if (hitTestCircle(ball, balls[i])) {
                retval = false;
            }
        }
        return retval;
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

