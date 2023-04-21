window.addEventListener("load", eventWindowloaded, false);

function eventWindowloaded() {
    canvasApp();
}
function canvasSupport() {
    return Modernizr.canvas;
}

function canvasApp() {
    var message = "your text";
    var fillOrstroke = "fill";
    var fontStyle = "normal";
    var textFont = "serif";
    var fontWeight = "bold";
    var fontSize = "20";
    var fontColor = "#ff0000"
    var textBaseline = "middle";
    var textAlign = "center";
    var textAlpha = 1;
    var shadowX = 1;
    var shadowY = 1;
    var shadowBlur = 1;
    var shadowColor = "#707070";

    var fontWeight = "normal";
  
    var fillType = "colorFill";
    var textFillColor2 = "#000000";
    var pattern = new Image();


    if (!canvasSupport()) {
        return;
    } else {
        var theCanvas = document.getElementById("canvasOne");
        var context = theCanvas.getContext("2d");

        var formElement = document.getElementById("textBox");
        formElement.addEventListener("keyup", textBoxChanged, false);
        var formElement = document.getElementById("fillOrStroke");
        formElement.addEventListener("change", fillrstrokeChanged, false);
        var formElement = document.getElementById("textFont");
        formElement.addEventListener("change", textFontChanged, false);
        var formElement = document.getElementById("fontStyle");
        formElement.addEventListener("change", fontStyleChanged, false);
        var formElement = document.getElementById("fontSize");
        formElement.addEventListener("change", fontSizeChanged, false);
        var formElement = document.getElementById("fontColor");
        formElement.addEventListener("change", fontColorChanged, false);
        var formElement = document.getElementById("textBaseline");
        formElement.addEventListener("change", textBaselineChanged, false);
        var formElement = document.getElementById("textAlign");
        formElement.addEventListener("change", textAlignChanged, false);
        var formElement = document.getElementById("textAlpha");
        formElement.addEventListener("change", textAlphaChanged, false);
        var formElement = document.getElementById("shadowX");
        formElement.addEventListener("change", shadowXChanged, false);
        var formElement = document.getElementById("shadowY");
        formElement.addEventListener("change", shadowYChanged, false);
        var formElement = document.getElementById("shadowblur");
        formElement.addEventListener("change", shadowblurChanged, false);
        var formElement = document.getElementById("shadowcolor");
        formElement.addEventListener("change", shadowcolorChanged, false);
        var formElement = document.getElementById("canvasWidt");
        formElement.addEventListener("change", canvasWidtChanged, false);
    }

    function drawScreen() {
        context.globalAlpha = 1.0;
        context.shadowColor = "#707070";
        context.shadowX = 0;
        context.shadowY = 0;
        context.shadowBlur = 0;

        //背景繪製
        context.fillStyle = "#ffffaa";
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);
        // //方形
        // context.strokeStyle = "#000000";
        // context.strokeRect(5, 5, theCanvas.width - 10, theCanvas.height - 10); //從左上角x、y，和右上角x、y定位
        // //文字
        context.textBaseline = textBaseline;
        context.textAlign = textAlign;
        context.font = fontStyle+" "+fontWeight+" "+ fontSize + "px "+ textFont;
        
        context.shadowColor = shadowColor;
        context.shadowOffsetX = shadowX;
        context.shadowOffsetY= shadowY;
        context.shadowBlur = shadowBlur;
        context.globalAlpha = textAlpha;

        var metrics = context.measureText(message);
        var textWidth = metrics.width;
        var xPoision = (theCanvas.width / 2) - (textWidth / 2);
        var yPoision = (theCanvas.height / 2);
        var tempColor = fontColor;

        switch (fillOrstroke) {
            case "fill":
                context.fillStyle = tempColor;
                context.fillText(message, xPoision, yPoision);
                break;
            case "stroke":
                context.strokeStyle = tempColor;
                context.strokeText(message, xPoision, yPoision);
                break;
            case "both":
                context.fillStyle = tempColor;
                context.fillText(message, xPoision, yPoision);
                context.strokeStyle = tempColor;
                context.strokeText(message, xPoision, yPoision);
                break;
        }
    }

    function textBoxChanged(e) {
        var target = e.target;
        message = target.value;
        drawScreen();
    }
    function fillrstrokeChanged(e) {
        var target = e.target;
        fillOrstroke = target.value;
        drawScreen();
    }
    function textFontChanged(e) {
        var target = e.target;
        textFont = target.value;
        drawScreen();
    }
    function fontStyleChanged(e) {
        var target = e.target;
        fontStyle = target.value;
        drawScreen();
    }
    function fontSizeChanged(e) {
        var target = e.target;
        fontSize = target.value;
        drawScreen();
    }
    function fontColorChanged(e) {
        var target = e.target;
        fontColor = target.value;
        drawScreen();
    }
    function textBaselineChanged(e) {
        var target = e.target;
        textBaseline = target.value;
        drawScreen();
    }
    function textAlignChanged(e) {
        var target = e.target;
        textAlign = target.value;
        drawScreen();
    }
    function textAlphaChanged(e) {
        var target = e.target;
        textAlpha = target.value;
        drawScreen();
    }
    function shadowXChanged(e) {
        var target = e.target;
        shadowX= target.value;
        drawScreen();
    }
    function shadowYChanged(e) {
        var target = e.target;
        shadowY = target.value;
        drawScreen();
    }
    function shadowblurChanged(e) {
        var target = e.target;
        shadowBlur = target.value;
        drawScreen();
    }
    function shadowcolorChanged(e) {
        var target = e.target;
        shadowColor = target.value;
        console.log(shadowColor)
        drawScreen();
    }
    function canvasWidthChanged(e) {
        var target = e.target;
        canvasWidth = target.value;
        drawScreen();
    }

}

