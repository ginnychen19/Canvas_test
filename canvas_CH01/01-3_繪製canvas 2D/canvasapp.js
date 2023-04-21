// //方法1
// if (!theCanvas || !theCanvas.getContext) {
//     return;
// }
// //方法2
// function isSupportCanvas() {
//     var elem = document.createElement('canvas');
//     return !!(elem.getContext && elem.getContext('2d'));
// }

// if (!isSupportCanvas()) {
//     alert('您所使用的浏览器不能使用canvas功能~')
// }

// //方法3 
// //使用Modernizr测试Canvas的支持性，只需将上面的canvasSupport函数改动一下就可以了：
// <script src="modernizr-1.6.min.js"></script>
// function canvasSupport() {
//     return Modernizr.canvas;
// }

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
function canvasSupport(){
    return Modernizr.canvas;
}

function canvasApp() {
    //這一行是判斷是否能使用canvas，回看到canvasSupport()就可以發現是引用Modernizr去做檢查。
    if (!canvasSupport()) {
        return;
    }

    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    Debugger.log("畫出canvas")

    function drawScreen() {
        //背景繪製
        context.fillStyle = "#ffffaa";
        context.fillRect(0, 0, 500, 300);
        //文字繪製
        context.fillStyle = "#000000";
        context.font = "20px _sans";
        context.textBaseline = "top";
        context.fillText("hello world！", 50, 50);
        //圖像繪製
        var helloWorldImage = new Image();
        helloWorldImage.src = "helloWorld.gif";
        helloWorldImage.onload = function () {
            context.drawImage(helloWorldImage, 20, 100);
        }
        //方形
        context.strokeStyle = "#000000";
        context.strokeRect(5, 5, 490, 290); //從左上角x、y，和右上角x、y定位
    }

    drawScreen();
}

