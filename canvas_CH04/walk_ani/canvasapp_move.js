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
    } else {
        var theCanvas = document.getElementById("canvasOne");
        var context = theCanvas.getContext("2d");
    }

    //接下來要做動的所以先記下初始位置。
    var dx = 1; //+會往左走 , -會往右走
    var dy = 1; //+會往下走 , -會往上走
    var nowXpoision = 0;
    var nowYpoision = 0;
    var rotation = 0; //畫布轉幾度

    var myGirl_walk = new Image();
    myGirl_walk.addEventListener("load", picLoaded, false);
    myGirl_walk.src = "../img/Walk_ani.png";
    var animationframe = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var frameIndex = 0;

    function picLoaded() {
        starUP();
    }

    function drawScreen() {
        //讓目前位置進行累加
        // nowXpoision = nowXpoision + dx;
        // nowYpoision = nowYpoision + dy;

        context.fillStyle = '#50C878'; //畫背景
        context.fillRect(0, 0, theCanvas.width, theCanvas.height); //(600 * 600 的土地)
        context.save();//背景不轉，所以要先存起來。
        //轉換角度
        context.setTransform(1, 0, 0, 1, 0, 0);
        var angleInRadians = rotation * Math.PI / 180;
        context.translate(myGirl_walk.width / 20, myGirl_walk.height / 2);
        context.rotate(angleInRadians);//這一行後，畫的東西才會被影響

        context.drawImage(myGirl_walk, (myGirl_walk.width / 10 * frameIndex), 0, myGirl_walk.width / 10, myGirl_walk.height, nowXpoision, nowYpoision, myGirl_walk.width / 10, myGirl_walk.height);//複製原圖的方式
                                      // x從哪裡開始裁切(以原圖為比例) , y從哪裡開始裁切 , 從x開始裁多寬 , 從y開始裁多寬  , 貼上位置x , 貼上位置y , x要轉多長 , y要轉多長 
        context.restore();
        
        frameIndex++;
        if (frameIndex == (animationframe.length - 1)) {
            frameIndex = 0;
        }

        //為何我的迴圈只會檢查一次OAO
        // console.log(nowXpoision);
        while (nowXpoision == (theCanvas.width)) {
            nowXpoision = -(myGirl_walk.width / 10);
        }
        while (nowYpoision == (theCanvas.height)) {
            nowYpoision = -(myGirl_walk.height);
        }

        return (nowXpoision, nowYpoision);
    }
    function starUP() {
        setInterval(drawScreen, 100);
    }

}

