window.addEventListener("load", eventWindowloaded, false);
var Debugger = function () { };
Debugger.log = function (massage) {
    try {
        console.log(massage)
    } catch (exception) {
        return;
    }
}
var myGirl;
function eventWindowloaded() {
	myGirl = new Image();
	myGirl.src = "../img/Walk_(1).png"
	myGirl.onload = eventAssetsLoaded;
}

function eventAssetsLoaded() {
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
        //加入展示移動路徑的點
        var pointImage = new Image();
        pointImage.src = "../img/point.png"

        context.fillStyle = '#50C878'; //畫背景
        context.fillRect(0, 0, theCanvas.width, theCanvas.height); //(600 * 600)
        var sqWidth = 450;//畫方形
        var sqHeight = 450;
        context.fillStyle = '#ffffff';
        context.fillRect((theCanvas.width - sqWidth) / 2, (theCanvas.height - sqHeight) / 2, sqWidth, sqHeight); //(600 * 600)

        //畫球
        var t = player.t;
		
		var cx = 3 * (p1.x - p0.x)
		var bx = 3 * (p2.x - p1.x) - cx;
		var ax = p3.x - p0.x - cx - bx;

		var cy = 3 * (p1.y - p0.y);
		var by = 3 * (p2.y - p1.y) - cy;
		var ay = p3.y - p0.y - cy - by;
		
		var xt = ax*(t*t*t) + bx*(t*t) + cx*t + p0.x;
		var yt = ay*(t*t*t) + by*(t*t) + cy*t + p0.y;
		
		player.t += player.speed;
		
		if (player.t > 1) {
			player.t = 1;
		} 

        //draw the points
		
		context.font ="10px sans";
		
		context.fillStyle = "#FF0000";
		context.beginPath();
		context.arc(p0.x,p0.y,8,0,Math.PI*2,true);
		context.closePath();
		context.fill();			
		context.fillStyle = "#FFFFFF";
		context.fillText("0",p0.x-2,p0.y+2);
		
		context.fillStyle = "#FF0000";
		context.beginPath();
		context.arc(p1.x,p1.y,8,0,Math.PI*2,true);
		context.closePath();
		context.fill();			
		context.fillStyle = "#FFFFFF";
		context.fillText("1",p1.x-2,p1.y+2);
		
		context.fillStyle = "#FF0000";
		context.beginPath();
		context.arc(p2.x,p2.y,8,0,Math.PI*2,true);
		context.closePath();
		context.fill();			
		context.fillStyle = "#FFFFFF";
		context.fillText("2",p2.x-2, p2.y+2);
		
		context.fillStyle = "#FF0000";
		context.beginPath();
		context.arc(p3.x,p3.y,8,0,Math.PI*2,true);
		context.closePath();
		context.fill();			
		context.fillStyle = "#FFFFFF";
		context.fillText("3",p3.x-2, p3.y+2);
		
		points.push({x:xt,y:yt});
		
		for (var i= 0; i< points.length; i++) {
			context.drawImage(pointImage, points[i].x, points[i].y,10,10);
		}
		
		context.closePath();
		
        //這邊如果要讓圖在中心點，那就要讓減掉的部分各是長寬的一半
		player.x = xt - 50;
		player.y = yt - 70;
				
		context.drawImage(myGirl,player.x,player.y,100,100);

    }
    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    var p0 = {x:150, y:440};
	var p1 = {x:450, y:10};
	var p2 = {x:50, y:10};
	var p3 = {x:325, y:450};
	var player = {x:0, y:0, speed:.01, t:0};
	var points = new Array(); //為了記錄每次移動位置

    setInterval(drawScreen, 33);


}


