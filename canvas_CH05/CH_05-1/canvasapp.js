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
        context.fillStyle = '#50C878'; //畫背景
        context.fillRect(0, 0, theCanvas.width, theCanvas.height); //(600 * 600)

        //方形
        var sqWidth = 450;
        var sqHeight = 450;

        context.fillStyle = '#000000'; 
        context.fillRect((theCanvas.width-sqWidth)/2, (theCanvas.height-sqHeight)/2, sqWidth, sqHeight); //(600 * 600)

        //建立一顆球
        y += speed;

        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(x, y, 15, 0, Math.PI * 2 , true);
        context.closePath();
        context.fill();
        
        
    }
    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");
    
    var speed = 5;
    var x = 15; //移動初始位置
    var y = 0;
    
    setInterval(drawScreen,33)


}

