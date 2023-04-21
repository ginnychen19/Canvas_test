//代碼提示
/** @type {HTMLCanvasElement} */
/** @type {CanvasRenderingContext2D} */

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
    drawScreen();


    function drawScreen() {
        //方形
        context.fillStyle = 'red';  //畫圖 
        context.fillRect(10, 10, 80, 80); //(從左算x的起始，從上算Y的起始，長度，寬度)
        context.strokeStyle = "#000000";  //畫線
        context.strokeRect(0, 0, 100, 100);
        context.lineWidth = 12;
        context.clearRect(30, 30, 40, 40) //清空填充

        //畫線
        context.strokeStyle = "black";
        context.lineWidth = 10;
        context.lineCap = "square"; //設定返回末端線帽的樣式
        context.lineJoin = "round";

        context.beginPath();//開始Path繪製
        context.moveTo(150, 20);
        context.lineTo(250, 20); //這兩行要一起看，從moveTo初始點 => lineTo下個點
        context.lineTo(200, 100);
        context.lineTo(180, 60);
        context.arcTo(180, 160, 250, 160, 70); //但這個有些瀏覽器不支援 //70是指半徑 ，前兩個可想成轉角的點，後兩點則是結束的點

        context.stroke(); //結束前決定 -> 畫線
        context.closePath(); //結束Path繪製


        //方形 組合
        // context.fillStyle = '#006030';
        // context.fillRect(300, 50, 200, 200); //(從左算x的起始，從上算Y的起始，長度，寬度)

        // context.fillStyle = 'red';  //
        // context.fillRect(280, 40, 40, 40);
        // context.globalCompositeOperation = "source-over";

        // context.fillStyle = 'silver';
        // context.fillRect(350, 40, 40, 40);
        // context.globalCompositeOperation = "destination-out"; //跟下一個圖案交互(這圖案在下面)，保留這個

        // context.fillStyle = 'red';
        // context.fillRect(350, 30, 50, 50);

        // context.globalAlpha = .5; //數值是0.0~1.0，要再畫出圖形前設定好
        // context.globalCompositeOperation = "source-atop";
        // context.fillRect(280, 90, 40, 40); 

        
        
        
        // //方形 形狀調整
        // context.fillStyle = 'gold';
        // context.setTransform(1, 0.5,0, 1, 0, 0);
        // //a(m11) 水平縮放。值1不縮放。
        // //b(m12) 垂直傾斜。
        // //c(m21) 橫向傾斜。
        // //d(m22) 垂直縮放。值1不縮放。
        // //e(dx) 水平平移（移動）。
        // //f(dy) 垂直平移（移動）。
        // context.fillRect(20, 150, 50, 50);


        // var angleInradians = 45 * Math.PI/180;
        // context.rotate(Math.PI / 180 * 400);
        
        // context.fillStyle = 'gold';
        // context.fillRect(150, 150, 50, 50);

        //建藏
        var gr = context.createLinearGradient(0, 0, 100, 0); //小心，這裡了漸層顏色不會跟著跑
        gr.addColorStop(0, 'rgb(225,0,0)');
        gr.addColorStop(.5, 'rgb(0,225,0)');
        gr.addColorStop(1, 'rgb(225,0,0)');

        context.fillStyle = gr;
        context.fillRect(40,220,150,150);
        context.fillRect(40,370,50,60);
        context.fillRect(40,390,150,20);

        var ab = context.createRadialGradient(300,400,350,350,400,350); //小心，這裡了漸層顏色不會跟著跑
        ab.addColorStop(0, 'rgb(225,0,0)');
        ab.addColorStop(.5, 'rgb(0,225,0)');
        ab.addColorStop(1, 'rgb(225,0,0)');

        context.fillStyle = ab;
        context.arc(300,400,100, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
        context.fill();
    }
}

