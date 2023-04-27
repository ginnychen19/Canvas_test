window.addEventListener('load', eventWindowLoaded, false);
		var videoElement;
		var videoDiv;
		var theCanvas = document.getElementById('canvasOne');
		var context = theCanvas.getContext('2d');
		
		function eventWindowLoaded() {
			var videoElement = document.getElementById("theVideo");

			videoElement.addEventListener('progress', updateLoadingStatus, false);
			videoElement.addEventListener('canplaythrough', playVideo, false);
			//canplaythrough：有時候瀏覽器可能會有一些缓存优化，会提前触发该事件。

			/* 放大拉桿調整 */
			var sizeElement = document.getElementById("videoSize");
			sizeElement.addEventListener('change', videoSizeChanged, false);
			var widthtoHeightRatio = videoElement.width / videoElement.height;//取得放大比例
			function videoSizeChanged(e) {
				var target = e.target;
				var videoElement = document.getElementById("theVideo");
				videoElement.width = target.value;
				videoElement.height = target.value / widthtoHeightRatio;
			}

			/*製作到canvas的內容*/
			MYvideoElement = document.createElement("video");
			videoDiv = document.createElement('div');
			document.body.appendChild(videoDiv);
			videoDiv.appendChild(MYvideoElement);
			videoDiv.setAttribute("style", "display:none;");//.setAttribute更新屬性值
			var videoType = supportedVideoFormat(MYvideoElement); //這邊是呼喚格式選取器的函式
			if (videoType == "") {
				alert("no video support");
				return;
			}

			MYvideoElement.setAttribute("src", "../myVideo." + videoType);
			MYvideoElement.width = theCanvas.width -20;
			MYvideoElement.height = theCanvas.height - 20;
			
			MYvideoElement.addEventListener("canplaythrough", videoLoaded, false);
		}


		function updateLoadingStatus() {
			var loadingStatus = document.getElementById("loadingStatus");
			var videoElement = document.getElementById("theVideo");

			// 因為會有buffered" 陣列還是空的bug，檢查是否有可用的範圍
			if (videoElement.buffered.length > 0) {
				//------------------.buffered可以取得目前加載到第幾秒，有 start 和 end屬性  .duration是總影片的時間長
				var percentLoaded = parseInt(((videoElement.buffered.end(0) / videoElement.duration) * 100));
				document.getElementById("loadingStatus").innerHTML = percentLoaded + '%';
			}
		}
		function playVideo(e) {
			var videoElement = document.getElementById("theVideo");
			// document.getElementById("loadingStatus").innerHTML = "ok";
		}

		//canvas從這裡開始
		function canvasSupport() {
			return Modernizr.canvas;
		}
		function videoLoaded(event) {
			canvasApp();
		}
		function supportedVideoFormat(video) {
			var returnExtension = "";
			if (video.canPlayType("video/webm") == "probably" || video.canPlayType("video/webm") == "maybe") {
				returnExtension = "webm";
			} else if (video.canPlayType("video/mp4") == "probably" || video.canPlayType("video/mp4") == "maybe") {
				returnExtension = "mp4";
			} else if (video.canPlayType("video/ogg") == "probably" || video.canPlayType("video/ogg") == "maybe") {
				returnExtension = "ogg";
			}

			return returnExtension;
		}

		function canvasApp() {
			if (!canvasSupport()) {
				return;
			}

			function drawScreen() {

				//Background

				context.fillStyle = '#ffffaa';
				context.fillRect(0, 0, theCanvas.width, theCanvas.height);
				//Box
				context.strokeStyle = '#000000';
				context.strokeRect(5, 5, theCanvas.width - 10, theCanvas.height - 10);
				//video
				context.drawImage(MYvideoElement, 10, 10,MYvideoElement.width,MYvideoElement.height);



			}

			
			MYvideoElement.play();

			setInterval(drawScreen, 33);

		}
