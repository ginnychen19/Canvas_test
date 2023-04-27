window.addEventListener('load', eventWindowLoaded, false);	
var loadCount = 0;
var itemsToLoad = 2;
var buttonSheet;
var audioElement;
function eventWindowLoaded() {

	//生成音訊元素
	audioElement = document.createElement("audio");
	document.body.appendChild(audioElement);
	var audioType = supportedAudioFormat(audioElement);
	if (audioType == "") {
		alert("no audio support");
		return;
	}
	audioElement.setAttribute("src", "song1." + audioType);
	audioElement.addEventListener("canplaythrough",itemLoaded,false);
	//加入控制圖片。
	buttonSheet = new Image();
	buttonSheet.onload = itemLoaded;
	buttonSheet.src = "audiocontrols.png";
	
	
	
}
//尋找支援的音訊格式
function supportedAudioFormat(audio) {
	var returnExtension = "";
	if (audio.canPlayType("audio/ogg") =="probably" || audio.canPlayType("audio/ogg") == "maybe") {
		returnExtension = "ogg";
	} else if(audio.canPlayType("audio/wav") =="probably" || audio.canPlayType("audio/wav") == "maybe") {
		returnExtension = "wav";
	} else if(audio.canPlayType("audio/mp3") == "probably" || audio.canPlayType("audio/mp3") == "maybe") {
		returnExtension = "mp3";
	}
	
	return returnExtension;
}



function canvasSupport () {
  	return Modernizr.canvas;
}

function itemLoaded(event) {	
	loadCount++;
	if (loadCount >= itemsToLoad) {
		canvasApp();
		
	}
}




function canvasApp() {
	
  if (!canvasSupport()) {
			 return;
  		}

  
  
  function  drawScreen () {

		//Background
		
		context.fillStyle = "#ffffaa";
		context.fillRect(0, 0, theCanvas.width, theCanvas.height);
		//Box
		context.strokeStyle = "#000000"; 
		context.strokeRect(5,  5, theCanvas.width-10, theCanvas.height-10);
		
		
		// Text
		context.fillStyle    = "#000000";
		context.fillText  ("Duration:" + audioElement.duration,  20 ,20);
		context.fillText  ("Current time:" + audioElement.currentTime,  250 ,20);
		context.fillText  ("Loop: " + audioElement.loop,  20 ,40);
		context.fillText  ("Autoplay: " +audioElement.autoplay,  250 ,40);
		context.fillText  ("Muted: " + audioElement.muted,  20 ,60);
		context.fillText  ("Controls: " + audioElement.controls,  250 ,60);
		context.fillText  ("Volume: " + audioElement.volume,  20 ,80);
		context.fillText  ("Paused: " + audioElement.paused,  250 ,80);
		context.fillText  ("Ended: " + audioElement.ended,  20 ,100);
		context.fillText  ("Can Play OGG: " + audioElement.canPlayType("audio/ogg"),  250 ,100);
		context.fillText  ("Can Play WAV: " + audioElement.canPlayType("audio/wav"),  20 ,120);
		context.fillText  ("Can Play MP3: " + audioElement.canPlayType("audio/mp3"),  250 ,120);
		context.fillText  ("Source: " + audioElement.currentSrc, 20 ,140);
		context.fillText  ("volumeSliderDrag: " + volumeSliderDrag, 20 ,160);
		
		//Draw Controls
		
		//play or pause
		
		if (audioElement.paused) {
			context.drawImage(buttonSheet, 0,0,bW,bH,playX,playY,bW,bH);//show play
			
		} else {
			context.drawImage(buttonSheet, 0,32,bW,bH,playX,playY,bW,bH); //show pause
			
		} 
			
		//loop
		
		if (audioElement.loop) {
			context.drawImage(buttonSheet, 114,32,bW,bH,loopX,loopY,bW,bH);//show loop
			
		} else {
			context.drawImage(buttonSheet, 82,32,bW,bH,loopX,loopY,bW,bH); //show no loop
		} 
		
		
		//play background
		context.drawImage(buttonSheet, 32,0,playBackW,bH,playBackX,playBackY,playBackW,bH);
		
		
		
		
		//vol Background
		context.drawImage(buttonSheet, 32,32,volBackW,bH,volBackX,volBackY,volBackW,bH);
		//play slider
		
		var slideIncrement = playBackW/audioElement.duration;
		var sliderX = (playBackW,bH,controlStartX+bW) + (slideIncrement*audioElement.currentTime);
		context.drawImage(buttonSheet, 238,0,sliderW,bH,sliderX,controlStartY,sliderW,bH);
		
		//Go back to start
		if (audioElement.ended && !audioElement.loop) {
			audioElement.currentTime = 0;
			audioElement.pause();
		}
		
		//Volume slider
		//Test Volume Drag
		
		if (volumeSliderDrag) {
			volumeSliderX = mouseX;
			if (volumeSliderX > volumeSliderEnd) {
				volumeSliderX = volumeSliderEnd;
			}
			if (volumeSliderX < volumeSliderStart) {
				volumeSliderX = volumeSliderStart;
			}
		} else {
			volumeSliderX = volumeSliderStart + (audioElement.volume*(volBackW -sliderW)); 
		}
		
		context.drawImage(buttonSheet, 238,0,sliderW,bH,volumeSliderX,volumeSliderY,sliderW,bH);
		audioElement.volume = (volumeSliderX-volumeSliderStart) * volumeIncrement; 
  			
	}
	
	
	function eventMouseDown(event) {
		
		//Hit Volume Slider
		if ( (mouseY >= volumeSliderY) && (mouseY <=volumeSliderY+sliderH) && (mouseX >= volumeSliderX) && (mouseX <= volumeSliderX+sliderW) ) {
			volumeSliderDrag = true;
			
		}
		
	
	}
	
	function eventMouseMove(event) {
		if ( event.layerX ||  event.layerX == 0) { 
   			mouseX = event.layerX ;
			mouseY = event.layerY;
  		} else if (event.offsetX || event.offsetX == 0) { 
    		mouseX = event.offsetX;
			mouseY = event.offsetY;
  		}
		
		
	}
	
	function eventMouseUp(event) {
		
				
		//Hit Play
		if ( (mouseY >= playY) && (mouseY <= playY+bH) && (mouseX >= playX) && (mouseX <= playX+bW) ) {
			if (audioElement.paused) {
				audioElement.play();
				
			} else {
				audioElement.pause();
			
			}
		
		}
		
		//Hit loop
		if ( (mouseY >=loopY) && (mouseY <= loopY+bH) && (mouseX >= loopX) && (mouseX <= loopX+bW) ) {
			if (audioElement.loop) {
				audioElement.loop=false;
				
			} else {
				audioElement.loop = true;
			
			}
		
		}
		
		if (volumeSliderDrag) {
			volumeSliderDrag = false;
		}
		
		
	}
	
	
	var theCanvas = document.getElementById("canvasOne");
	var context = theCanvas.getContext("2d");

	var bW 				= 32; //播放器的按鈕的寬度和高度
	var bH 				= 32;
	var playBackW		= 206; //進度條的寬度
	var volBackW		= 50; //音量條的寬度
	var sliderW			= 10; //進度條和音量條的滑塊的寬度和高度
	var sliderH			= 32;
	var controlStartX  = 25;  //播放器控制面板的左上角的起始位置
	var controlStartY  =200;
	var playX		    = controlStartX; //播放/暫停按鈕的位置
	var playY			= controlStartY;		
	var playBackX		= controlStartX+bW; //進度條的位置
	var playBackY		= controlStartY;		
	var volBackX		= controlStartX+bW+playBackW; //音量條的位置
	var volBackY		= controlStartY;		
	var loopX			= controlStartX+bW+playBackW+volBackW
	var loopY			= controlStartY; //循環播放按鈕的位置
	var mouseX; //滑鼠位置，用於控制滑塊的移動
	var mouseY;
	
	
	theCanvas.addEventListener("mouseup",eventMouseUp, false);		
	theCanvas.addEventListener("mousedown",eventMouseDown, false);
	theCanvas.addEventListener("mousemove",eventMouseMove, false);	
	
	audioElement.play();
	audioElement.loop = false;
	audioElement.volume = .5;
	var volumeSliderStart = volBackX;
	var volumeSliderEnd = volumeSliderStart + volBackW -sliderW;
	var volumeSliderX = volumeSliderStart + (audioElement.volume*(volBackW -sliderW)); 
	var volumeSliderY	= controlStartY;
	var volumeSliderDrag = false;
	var volumeIncrement = 1/(volBackW -sliderW);
	
	
	setInterval(drawScreen, 33);	
	
}