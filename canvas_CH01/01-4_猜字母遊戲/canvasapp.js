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
    var guesses = 0;
    var message = "從 A 到 Z 猜個字吧！";
    var letters = [
        "a", "b", "c", "d", "e", "f", "g",
        "h", "i", "j", "k", "l", "m", "n", "o", "p",
        "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];

    var today = new Date();
    var lettertoguess = "";
    var higherOrlower = "";

    var lettersguess = "";
    var gameover = false;


    if (!canvasSupport()) {
        return;
    }

    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    initGame();

    function initGame() {
        var letterIndex = Math.floor(Math.random() * letters.length);
        console.log("letterIndex = " + letterIndex);
        lettertoguess = letters[letterIndex];
        guesses = 0;
        lettersguess = [];
        gameover = false

        window.addEventListener("keyup", eventKeyPressed, true);

        var formElement = document.getElementById("createImageData");
        formElement.addEventListener("click", createImageDataPressed, false);
        drawScreen();
    }

    function eventKeyPressed(e) {
        if (!gameover) {
            var letterPressed = String.fromCharCode(e.keyCode);
            console.log("letterPressed = " + letterPressed);
            letterPressed = letterPressed.toLowerCase();
            guesses++;

            lettersguess.push(letterPressed);

            if (letterPressed == lettertoguess) {
                gameover = true;
            } else {
                letterIndex = letters.indexOf(lettertoguess);
                guessesIndex = letters.indexOf(letterPressed);
                Debugger.log(guessesIndex);
                if (guessesIndex < 0) {
                    higherOrlower = "你選的可不是字";
                } else if (guessesIndex > letterIndex) {
                    higherOrlower = "在往前點";
                } else {
                    higherOrlower = "在往後點";
                }
            }
            drawScreen();
        }
    }


    function drawScreen() {
        //背景繪製
        context.fillStyle = "#D0D0D0";
        context.fillRect(0, 0, 500, 300);
        //方形
        context.strokeStyle = "#000000";
        context.strokeRect(5, 5, 490, 290); //從左上角x、y，和右上角x、y定位
        context.textBaseline = "top";
        //日期
        context.fillStyle = "#000000";
        context.font = "14px _sans";
        context.fillText(today, 150, 10);
        //訊息
        context.fillStyle = "#ff0000";
        context.font = "16px _sans";
        context.fillText(message, 125, 30);
        //猜了幾次
        context.fillStyle = "#109910";
        context.font = "18px _sans";
        context.fillText("總共猜了：" + guesses, 215, 50);
        //高或低
        context.fillStyle = "#000000";
        context.font = "18x _sans";
        context.fillText("高或低：" + higherOrlower, 150, 125);
        //猜過的字母
        context.fillStyle = "#ff0000";
        context.font = "18px _sans";
        context.fillText("你曾猜過：" + lettersguess.toString(), 10, 260);

        if (gameover) {
            context.fillStyle = "#ff0000";
            context.font = "40px _sans";
            context.fillText(`你成功拉！`, 150, 180);
        }
    }

    // 新視窗的網址 ', '新視窗的名稱', config='height=高度,width=寬度
    function createImageDataPressed(e) {
        console.log(theCanvas.width);
        console.log(theCanvas.height);

        /* 
        window.open(
            theCanvas.toDataURL("image/png"),  
            "canvasImage",
            "left=0,top=0,width =" + theCanvas.width + ",height=" + theCanvas.height + ",toolbar=0,resizable=0"
            );     
        */

        // 將Canvas轉換為DataURL
        var imageData = theCanvas.toDataURL("image/png");
        // 創建包含圖像的HTML字符串
        var html = '<html><body><img src="' + imageData + '"/></body></html>';
        // 使用window.open打開HTML
        var win = window.open('', 'canvasImage');
        win.document.write(html);
    }
}

