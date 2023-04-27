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
        var canvasBlocked = document.getElementById("canvasBlocked");
        var contextBlocked = canvasBlocked.getContext("2d");
        var canvasBG = document.getElementById("canvasBG");
        var contextBG = canvasBG.getContext("2d");
        var theCanvas = document.getElementById("canvasOne");
        var context = theCanvas.getContext("2d");
    }

    //素材準備
    var myGirl_walk = new Image();
    myGirl_walk.addEventListener("load", picLoaded, false);
    myGirl_walk.src = "../img/Walk_ani.png";
    var animationframe = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var frameIndex = 0;
    //背景底圖
    var bg01 = new Image();
    bg01.addEventListener("load", picLoaded, false);
    bg01.src = "./kenney_tiny-town/Tilemap/tilemap_packed_waifu2x_art_noise1_scale.png";
    var mapIndexOffset = -1;//-1
    var mapRows = 11;
    var mapCols = 10;
    var bg01Map = [
        [1, 43, 2, 2, 2, 1, 127, 127, 1, 25],
        [1, 40, 3, 3, 3, 3, 2, 2, 1, 37],
        [2, 43, 3, 2, 3, 3, 13, 14, 15, 1],
        [3, 40, 2, 2, 3, 3, 25, 26, 27, 1],
        [2, 43, 3, 1, 1, 44, 37, 38, 39, 2],
        [1, 40, 1, 44, 1, 2, 1, 3, 1, 1],
        [40, 26, 41, 40, 41, 40, 41, 40, 41, 40],
        [43, 42, 43, 42, 42, 42, 42, 42, 42, 43],
        [3, 43, 2, 3, 44, 1, 3, 1, 3, 1],
        [44, 40, 3, 2, 2, 2, 2, 44, 3, 1]
    ]
    //障礙物底圖
    var Blocked02 = new Image();
    Blocked02.addEventListener("load", picLoaded, false);
    Blocked02.src = "./kenney_tiny-town/Tilemap/tilemap_packed_waifu2x_art_noise1_scale.png";
    var Blocked02Map = [
        [123,0,121,122,123,73,74,75,76,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,5,0,5,0,5,0],
        [0,0,0,0,17,0,17,0,17,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,5,0,5,0,0],
        [0,0,0,0,0,17,0,17,0,93],
        [0,0,0,0,0,0,0,0,0,105]
    ]


    //先確保圖片素材都已經加入近來
    function picLoaded() {
        starUP();
    }

    function drawScreen() {
        // context.clearRect(0, 0, theCanvas.width, theCanvas.height); //清空画布
        // context.fillStyle = 'rgba(255,165,0,0)'; //畫背景
        // context.fillRect(0, 0, theCanvas.width, theCanvas.height); //(600 * 600 的土地)

        var xPoision = (theCanvas.width / 2) - (myGirl_walk.width / 20);//因為有10張圖，所以先 /10、在 /2
        var yPoision = (theCanvas.height / 2) - (myGirl_walk.height / 2);
        //清除上一個畫面
        context.clearRect(xPoision, yPoision, myGirl_walk.width / 10, myGirl_walk.height);

        context.drawImage(myGirl_walk, 0 + myGirl_walk.width / 10 * frameIndex, 0, myGirl_walk.width / 10, myGirl_walk.height, xPoision, yPoision, myGirl_walk.width / 10, myGirl_walk.height);//複製原圖的方式
        // x從哪裡開始裁切(以原圖為比例) , y從哪裡開始裁切 , 從x開始裁多寬 , 從y開始裁多寬  , 貼上位置x , 貼上位置y
        frameIndex++;
        if (frameIndex == (animationframe.length - 1)) {
            frameIndex = 0;
        }
        
    }
    function drawBg() {
        for (let rowCtr = 0; rowCtr < mapRows; rowCtr++) {
            for (let ColCtr = 0; ColCtr < mapCols; ColCtr++) {
                // console.log(bg01Map[rowCtr][ColCtr]);
                let tileId = bg01Map[rowCtr][ColCtr] + mapIndexOffset;
                let sourceX = Math.floor(tileId % 12) * 32;
                let sourceY = Math.floor(tileId / 11) * 32;

                contextBG.drawImage(bg01, sourceX, sourceY, 32, 32, ColCtr * 64, rowCtr * 64, 66, 66);
            }
        }
        contextBG.fillStyle = '#50C878'; //畫背景
        contextBG.fillRect(0, 0, theCanvas.width, theCanvas.height);
    }
    function drawBlocked() {
        for (let rowCtr = 0; rowCtr < mapRows; rowCtr++) {
            for (let ColCtr = 0; ColCtr < mapCols; ColCtr++) {
                // console.log(Blocked02Map[rowCtr][ColCtr]);
                let tileId = Blocked02Map[rowCtr][ColCtr] + mapIndexOffset;
                let sourceX = Math.floor(tileId % 12) * 32;
                let sourceY = Math.floor(tileId / 11) * 32;

                contextBlocked.drawImage(Blocked02, sourceX, sourceY, 32, 32, ColCtr * 64, rowCtr * 64, 66, 66);
            }
        }
    }
    function starUP() {
        setInterval(drawScreen, 100);
        drawBlocked();      
        drawBg();
    }
}

