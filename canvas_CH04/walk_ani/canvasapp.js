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

    //先確保圖片素材都已經加入近來
    var myGirl_walk = new Image();
    myGirl_walk.addEventListener("load", picLoaded, false);
    myGirl_walk.src = "../img/Walk_ani.png";
    var animationframe = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var frameIndex = 0;
    
    function picLoaded() {
        starUP();
    }

    function drawScreen() {
        var xPoision = (theCanvas.width / 2) - (myGirl_walk.width / 20);//因為有10張圖，所以先 /10、在 /2
        var yPoision = (theCanvas.height / 2) - (myGirl_walk.height / 2);

        context.fillStyle = '#50C878'; //畫背景
        context.fillRect(0, 0, theCanvas.width, theCanvas.height); //(600 * 600 的土地)

        // context.drawImage(myGirl_walk, xPoision, yPoision, myGirl_walk.width, myGirl_walk.height);
        // 貼上位置x , 貼上位置y, 原圖給多寬 , 原圖給多長
        context.drawImage(myGirl_walk, 0 + myGirl_walk.width / 10 * frameIndex, 0, myGirl_walk.width / 10, myGirl_walk.height, xPoision, yPoision, myGirl_walk.width / 10, myGirl_walk.height);//複製原圖的方式
        // x從哪裡開始裁切(以原圖為比例) , y從哪裡開始裁切 , 從x開始裁多寬 , 從y開始裁多寬  , 貼上位置x , 貼上位置y
        frameIndex++;
        console.log(frameIndex);
        if(frameIndex == (animationframe.length-1)){
            frameIndex = 0;
        }
    }
    function starUP() {
        setInterval(drawScreen, 100);
    }

}

